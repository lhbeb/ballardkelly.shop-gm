"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { CreditCard, Save, ShieldOff, Eye, EyeOff, AlertCircle, RefreshCw, CheckCircle2, XCircle, KeyRound, Link2, Unplug, ExternalLink, ChevronDown } from 'lucide-react';

interface StripeConnectStatus {
    isAvailable: boolean;
    isConnected: boolean;
    accountId?: string;
    accountEmail?: string;
    accountName?: string;
    mode?: 'live' | 'test';
    connectedAt?: string;
    chargesEnabled?: boolean;
    detailsSubmitted?: boolean;
}

export default function PaymentSettingsPage() {
    const [adminRole, setAdminRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [publishableKey, setPublishableKey] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [mode, setMode] = useState('live');
    const [showSecret, setShowSecret] = useState(false);
    const [isConfigured, setIsConfigured] = useState(false);
    const [stripeConnect, setStripeConnect] = useState<StripeConnectStatus>({
        isAvailable: false,
        isConnected: false,
    });
    const [isConnectingStripe, setIsConnectingStripe] = useState(false);
    const [isDisconnectingStripe, setIsDisconnectingStripe] = useState(false);
    const [showManualStripeKeys, setShowManualStripeKeys] = useState(true);
    
    // PayPal Direct redirect state
    const [paypalEmail, setPaypalEmail] = useState('');
    const [isPaypalConfigured, setIsPaypalConfigured] = useState(false);
    const [isPaypalSaving, setIsPaypalSaving] = useState(false);

    // PayPal Orders API state
    const [paypalApiMerchantEmail, setPaypalApiMerchantEmail] = useState('');
    const [paypalApiClientId, setPaypalApiClientId] = useState('');
    const [paypalApiClientSecret, setPaypalApiClientSecret] = useState('');
    const [paypalApiMode, setPaypalApiMode] = useState<'sandbox' | 'live'>('sandbox');
    const [showPaypalApiSecret, setShowPaypalApiSecret] = useState(false);
    const [isPaypalApiConfigured, setIsPaypalApiConfigured] = useState(false);
    const [isPaypalApiSaving, setIsPaypalApiSaving] = useState(false);
    
    // Feedback
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Initial load
    useEffect(() => {
        const getRole = () => {
            const cookies = document.cookie.split(';');
            const roleCookie = cookies.find(c => c.trim().startsWith('admin_role='));
            const emailCookie = cookies.find(c => c.trim().startsWith('admin_email='));
            const email = emailCookie?.split('=')[1]?.trim().toLowerCase();
            if (email === 'elmahboubimehdi@gmail.com' || email === 'matrix01mehdi@gmail.com') {
                return 'SUPER_ADMIN';
            }
            const rawRole = roleCookie?.split('=')[1]?.trim();
            if (rawRole) {
                const norm = rawRole.toUpperCase().replace(/-/g, '_');
                if (norm === 'SUPER_ADMIN') return 'SUPER_ADMIN';
                return norm;
            }
            const token = localStorage.getItem('admin_token');
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                    if (['elmahboubimehdi@gmail.com', 'matrix01mehdi@gmail.com'].includes(payload.email?.toLowerCase())) {
                        return 'SUPER_ADMIN';
                    }
                    if (payload.role) {
                        const norm = payload.role.toUpperCase().replace(/-/g, '_');
                        return norm === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : norm;
                    }
                } catch {}
            }
            return null;
        };
        setAdminRole(getRole() || '');

        const params = new URLSearchParams(window.location.search);
        const stripeResult = params.get('stripe_connect');
        if (stripeResult === 'connected') {
            setStatusMessage({ type: 'success', text: 'Stripe account connected. New Stripe checkouts will use this account.' });
        } else if (stripeResult === 'cancelled') {
            setStatusMessage({ type: 'error', text: 'Stripe connection was cancelled. No payment settings were changed.' });
        } else if (stripeResult === 'error') {
            const reason = params.get('reason');
            const text = reason === 'invalid_state'
                ? 'Stripe authorization expired or could not be verified. Start the connection again.'
                : 'Stripe could not complete the account connection. Check the Connect configuration and try again.';
            setStatusMessage({ type: 'error', text });
        }
        if (stripeResult) {
            window.history.replaceState({}, '', window.location.pathname);
        }

        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('/api/admin/payment-settings', {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                }
            });
            
            if (res.ok) {
                setAdminRole((currentRole) => currentRole || 'ADMIN');
                const data = await res.json();
                
                // Stripe data
                if (data.stripe?.isConfigured) {
                    setIsConfigured(true);
                    setPublishableKey(data.stripe.publishableKey || '');
                    setSecretKey(data.stripe.secretKey || '');
                    setMode(data.stripe.mode || 'live');
                }

                if (data.stripeConnect) {
                    setStripeConnect(data.stripeConnect);
                    setShowManualStripeKeys(!data.stripeConnect.isConnected);
                }

                // PayPal data
                if (data.paypal?.isConfigured) {
                    setIsPaypalConfigured(true);
                    setPaypalEmail(data.paypal.payeeEmail || '');
                }

                if (data.paypalApi?.isConfigured) {
                    setIsPaypalApiConfigured(true);
                    setPaypalApiMerchantEmail(data.paypalApi.merchantEmail || '');
                    setPaypalApiClientId(data.paypalApi.clientId || '');
                    setPaypalApiClientSecret(data.paypalApi.clientSecret || '');
                    setPaypalApiMode(data.paypalApi.mode === 'live' ? 'live' : 'sandbox');
                }
            } else if (res.status === 401) {
                setAdminRole('');
                console.log("Unauthorized to fetch settings");
            }
        } catch (error) {
            console.error('Failed to fetch payment settings:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConnectStripe = async () => {
        setIsConnectingStripe(true);
        setStatusMessage(null);

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/payment-settings/stripe-connect/start', {
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });
            const data = await response.json();

            if (!response.ok || !data.url) {
                setStatusMessage({ type: 'error', text: data.error || 'Could not start Stripe authorization.' });
                setIsConnectingStripe(false);
                return;
            }

            window.location.assign(data.url);
        } catch {
            setStatusMessage({ type: 'error', text: 'Could not reach Stripe authorization. Please try again.' });
            setIsConnectingStripe(false);
        }
    };

    const handleDisconnectStripe = async () => {
        if (!window.confirm('Disconnect this Stripe account from BallardKellyScott checkout?')) return;

        setIsDisconnectingStripe(true);
        setStatusMessage(null);

        try {
            const token = localStorage.getItem('admin_token');
            const response = await fetch('/api/admin/payment-settings/stripe-connect/disconnect', {
                method: 'POST',
                headers: {
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });
            const data = await response.json();

            if (!response.ok) {
                setStatusMessage({ type: 'error', text: data.error || 'Could not disconnect Stripe.' });
                return;
            }

            setStatusMessage({ type: 'success', text: 'Stripe account disconnected from BallardKellyScott checkout.' });
            await fetchSettings();
        } catch {
            setStatusMessage({ type: 'error', text: 'Could not disconnect Stripe. Please try again.' });
        } finally {
            setIsDisconnectingStripe(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setStatusMessage(null);

        // Validation
        if (!publishableKey.startsWith('pk_')) {
            setStatusMessage({ type: 'error', text: 'Publishable Key must start with pk_' });
            setIsSaving(false);
            return;
        }
        
        if (secretKey.includes('*')) {
            setStatusMessage({ type: 'error', text: 'Please enter the full secret key replacing the masked value' });
            setIsSaving(false);
            return;
        }

        if (!secretKey.startsWith('sk_') && !secretKey.startsWith('rk_')) {
            setStatusMessage({ type: 'error', text: 'Secret Key must start with sk_ or rk_' });
            setIsSaving(false);
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('/api/admin/payment-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    provider: 'stripe',
                    publishableKey,
                    secretKey,
                    mode
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMessage({ type: 'success', text: 'Payment settings saved successfully.' });
                // Re-fetch to get masked version back
                fetchSettings();
            } else {
                setStatusMessage({ type: 'error', text: data.error || 'Failed to save settings' });
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSavePaypal = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaypalSaving(true);
        setStatusMessage(null);

        if (!paypalEmail.includes('@')) {
            setStatusMessage({ type: 'error', text: 'Please enter a valid email address' });
            setIsPaypalSaving(false);
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('/api/admin/payment-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    provider: 'paypal-direct',
                    payeeEmail: paypalEmail,
                })
            });

            const data = await res.json();

            if (res.ok) {
                setStatusMessage({ type: 'success', text: 'PayPal settings saved successfully.' });
                fetchSettings();
            } else {
                setStatusMessage({ type: 'error', text: data.error || 'Failed to save settings' });
            }
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'An unexpected error occurred.' });
        } finally {
            setIsPaypalSaving(false);
        }
    };

    const handleSavePaypalApi = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPaypalApiSaving(true);
        setStatusMessage(null);

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paypalApiMerchantEmail.trim())) {
            setStatusMessage({ type: 'error', text: 'Please enter a valid PayPal merchant email.' });
            setIsPaypalApiSaving(false);
            return;
        }

        if (!paypalApiClientId.trim()) {
            setStatusMessage({ type: 'error', text: 'PayPal Client ID is required.' });
            setIsPaypalApiSaving(false);
            return;
        }

        if (!isPaypalApiConfigured && !paypalApiClientSecret.trim()) {
            setStatusMessage({ type: 'error', text: 'PayPal Client Secret is required.' });
            setIsPaypalApiSaving(false);
            return;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const res = await fetch('/api/admin/payment-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({
                    provider: 'paypal-api',
                    merchantEmail: paypalApiMerchantEmail,
                    clientId: paypalApiClientId,
                    clientSecret: paypalApiClientSecret,
                    mode: paypalApiMode,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatusMessage({ type: 'success', text: data.message || 'PayPal API settings saved.' });
                await fetchSettings();
            } else {
                setStatusMessage({ type: 'error', text: data.error || 'Failed to save PayPal API settings.' });
            }
        } catch {
            setStatusMessage({ type: 'error', text: 'Could not verify PayPal credentials. Please try again.' });
        } finally {
            setIsPaypalApiSaving(false);
        }
    };

    const isAuthorized =
        adminRole === 'SUPER_ADMIN' ||
        adminRole === 'SUPER-ADMIN' ||
        adminRole === 'REGULAR_ADMIN' ||
        adminRole === 'ADMIN';

    return (
        <AdminLayout
            title="Payment Settings"
            subtitle="Manage Stripe, PayPal Redirect, and PayPal Orders API settings."
        >
            {isLoading ? (
                <div className="flex items-center justify-center py-24">
                    <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
                </div>
            ) : !isAuthorized ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                        <ShieldOff className="h-10 w-10 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-[#262626] mb-2">Admin Only</h2>
                    <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                        Payment settings are restricted to <strong>Admin</strong> accounts.
                        Please contact an Administrator if you need access.
                    </p>
                </div>
            ) : (
                <div className="max-w-6xl space-y-6">
                    {statusMessage && (
                        <div className={`p-4 rounded-xl flex items-start gap-3 ${
                            statusMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
                        }`}>
                            {statusMessage.type === 'success' ? (
                                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5 text-green-600" />
                            ) : (
                                <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-red-600" />
                            )}
                            <div className="text-sm font-medium">{statusMessage.text}</div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

                        {/* Stripe Configuration Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                                    <CreditCard className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#262626] text-base">Stripe Integration</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <p className="text-sm text-gray-500">
                                            {stripeConnect.isConnected
                                                ? 'Connected with Stripe'
                                                : isConfigured
                                                    ? 'Manual keys active'
                                                    : 'Not configured'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className={`rounded-lg border p-5 ${
                                stripeConnect.isConnected
                                    ? stripeConnect.chargesEnabled === false
                                        ? 'border-amber-200 bg-amber-50'
                                        : 'border-emerald-200 bg-emerald-50'
                                    : 'border-gray-200 bg-gray-50'
                            }`}>
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <Link2 className={`h-5 w-5 ${stripeConnect.isConnected ? 'text-emerald-700' : 'text-gray-500'}`} />
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                {stripeConnect.isConnected ? 'Stripe account linked' : 'Connect a Stripe account'}
                                            </h4>
                                        </div>

                                        {stripeConnect.isConnected ? (
                                            <div className="mt-3 space-y-1.5 text-sm text-gray-600">
                                                <p className="truncate font-medium text-gray-900">
                                                    {stripeConnect.accountName || stripeConnect.accountEmail || stripeConnect.accountId}
                                                </p>
                                                {stripeConnect.accountName && stripeConnect.accountEmail && (
                                                    <p className="truncate">{stripeConnect.accountEmail}</p>
                                                )}
                                                <p className="font-mono text-xs text-gray-500">{stripeConnect.accountId}</p>
                                                <div className="flex flex-wrap items-center gap-2 pt-1">
                                                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                                        stripeConnect.mode === 'live'
                                                            ? 'bg-emerald-100 text-emerald-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                        {stripeConnect.mode === 'live' ? 'Live mode' : 'Test mode'}
                                                    </span>
                                                    {stripeConnect.chargesEnabled === false && (
                                                        <span className="rounded-md bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                                                            Stripe setup required
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                                                Authorize an existing Stripe account. BallardKellyScott will use it for new embedded Stripe Checkout sessions.
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-shrink-0 flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={handleConnectStripe}
                                            disabled={isConnectingStripe || !stripeConnect.isAvailable}
                                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#635BFF] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#5147e5] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isConnectingStripe ? (
                                                <RefreshCw className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <ExternalLink className="h-4 w-4" />
                                            )}
                                            {stripeConnect.isConnected ? 'Reconnect' : 'Connect with Stripe'}
                                        </button>
                                        {stripeConnect.isConnected && (
                                            <button
                                                type="button"
                                                onClick={handleDisconnectStripe}
                                                disabled={isDisconnectingStripe}
                                                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                {isDisconnectingStripe ? (
                                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Unplug className="h-4 w-4" />
                                                )}
                                                Disconnect
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {!stripeConnect.isAvailable && (
                                    <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-amber-700">
                                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                                        Add the Stripe Connect client ID and platform secret to enable account authorization.
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowManualStripeKeys((current) => !current)}
                                className="flex w-full items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
                                aria-expanded={showManualStripeKeys}
                            >
                                <span className="flex items-center gap-2">
                                    <KeyRound className="h-4 w-4 text-gray-500" />
                                    Manual API key setup
                                </span>
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showManualStripeKeys ? 'rotate-180' : ''}`} />
                            </button>

                            {showManualStripeKeys && (
                            <form onSubmit={handleSave} className="space-y-5 border-t border-gray-100 pt-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Environment Mode</label>
                                <select
                                    value={mode}
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full sm:w-1/2 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12382f] focus:border-transparent text-sm"
                                >
                                    <option value="test">Test Mode</option>
                                    <option value="live">Live Mode</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1.5 ml-1">Controls which Stripe environment runs.</p>
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Publishable Key</label>
                                <input
                                    type="text"
                                    value={publishableKey}
                                    onChange={(e) => setPublishableKey(e.target.value)}
                                    placeholder="pk_..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12382f] focus:border-transparent text-sm font-mono"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1.5 ml-1">Publicly exposed key used for frontend integrations.</p>
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Secret Key</label>
                                <div className="relative">
                                    <input
                                        type={showSecret ? "text" : "password"}
                                        value={secretKey}
                                        onChange={(e) => setSecretKey(e.target.value)}
                                        placeholder="sk_..."
                                        className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12382f] focus:border-transparent text-sm font-mono"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowSecret(!showSecret)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md focus:outline-none"
                                    >
                                        {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                <p className="text-xs text-amber-600 mt-1.5 ml-1 flex items-center gap-1">
                                    <AlertCircle className="h-3.5 w-3.5" /> 
                                    Keep this secret. This is never exposed to the browser.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#12382f] text-white rounded-xl hover:bg-[#276955] transition-colors text-sm font-medium shadow-lg shadow-[#12382f]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save Settings
                                        </>
                                    )}
                                </button>
                            </div>
                            </form>
                            )}
                        </div>
                        </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .92-.706h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.774-4.553z" fill="#003087"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#262626] text-base">PayPal Redirect Checkout</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${isPaypalConfigured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <p className="text-sm text-gray-500">{isPaypalConfigured ? 'Active — Receiving Payments' : 'Not Configured'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSavePaypal} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your PayPal Email <span className="text-gray-400 font-normal">(receives all buyer payments)</span></label>
                                <input
                                    type="email"
                                    value={paypalEmail}
                                    onChange={(e) => setPaypalEmail(e.target.value)}
                                    placeholder="e.g. me@paypal.com"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12382f] focus:border-transparent text-sm"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1.5 ml-1">Enter the PayPal email that should receive buyer payments through the PayPal Standard redirect flow.</p>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isPaypalSaving}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#003087] text-white rounded-xl hover:bg-[#001f5f] transition-colors text-sm font-medium shadow-lg shadow-blue-900/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPaypalSaving ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Save PayPal Redirect Email
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden xl:col-span-2">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#003087] flex items-center justify-center flex-shrink-0">
                                    <KeyRound className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#262626] text-base">PayPal Orders API Checkout</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-2 h-2 rounded-full ${isPaypalApiConfigured ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        <p className="text-sm text-gray-500">
                                            {isPaypalApiConfigured ? `Active in ${paypalApiMode === 'live' ? 'Live' : 'Sandbox'} mode` : 'Not Configured'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSavePaypalApi} className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                                <div className="inline-flex p-1 bg-gray-100 rounded-xl" role="group" aria-label="PayPal environment">
                                    {(['sandbox', 'live'] as const).map((environment) => (
                                        <button
                                            key={environment}
                                            type="button"
                                            onClick={() => setPaypalApiMode(environment)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                paypalApiMode === environment
                                                    ? 'bg-white text-[#003087] shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            {environment === 'sandbox' ? 'Sandbox' : 'Live'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Merchant Email</label>
                                    <input
                                        type="email"
                                        value={paypalApiMerchantEmail}
                                        onChange={(e) => setPaypalApiMerchantEmail(e.target.value)}
                                        placeholder="merchant@example.com"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent text-sm"
                                        autoComplete="email"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1.5 ml-1">Used to identify the PayPal business account receiving payments.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                                    <input
                                        type="text"
                                        value={paypalApiClientId}
                                        onChange={(e) => setPaypalApiClientId(e.target.value)}
                                        placeholder="PayPal app Client ID"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent text-sm font-mono"
                                        autoComplete="off"
                                        required
                                    />
                                </div>

                                <div className="lg:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                                    <div className="relative">
                                        <input
                                            type={showPaypalApiSecret ? 'text' : 'password'}
                                            value={paypalApiClientSecret}
                                            onChange={(e) => setPaypalApiClientSecret(e.target.value)}
                                            placeholder="PayPal app Client Secret"
                                            className="w-full px-4 py-2.5 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent text-sm font-mono"
                                            autoComplete="new-password"
                                            required={!isPaypalApiConfigured}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPaypalApiSecret(!showPaypalApiSecret)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-md focus:outline-none"
                                            aria-label={showPaypalApiSecret ? 'Hide Client Secret' : 'Show Client Secret'}
                                        >
                                            {showPaypalApiSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-amber-600 mt-1.5 ml-1 flex items-center gap-1">
                                        <AlertCircle className="h-3.5 w-3.5" />
                                        Use the Client Secret from your PayPal Developer app, never your PayPal account password.
                                    </p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isPaypalApiSaving}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#003087] text-white rounded-xl hover:bg-[#001f5f] transition-colors text-sm font-medium shadow-lg shadow-blue-900/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPaypalApiSaving ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Verify &amp; Save API Credentials
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    </div>

                </div>
            )}
        </AdminLayout>
    );
}
