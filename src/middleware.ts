import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// JWT secret - must match the one in login route
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    console.log('🔒 [MIDDLEWARE] Admin request to:', pathname);

    // Only load and evaluate auth bypass settings for protected admin routes.
    const { shouldBypassAuth } = await import('@/lib/supabase/auth');
    const bypassAuth = shouldBypassAuth();

    // Bypass authentication in development if enabled
    // CRITICAL: Only allow bypass in development, never in production
    if (bypassAuth && process.env.NODE_ENV === 'development') {
      console.warn('⚠️⚠️⚠️ [MIDDLEWARE] AUTH BYPASS ENABLED - DEVELOPMENT ONLY ⚠️⚠️⚠️');
      console.log('🔓 [MIDDLEWARE] Bypassing authentication for:', pathname);
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      return response;
    }

    // If bypass is attempted in production, log critical warning and continue with auth
    if (bypassAuth && process.env.NODE_ENV === 'production') {
      console.error('🚨 [MIDDLEWARE] AUTH BYPASS BLOCKED IN PRODUCTION! Proceeding with normal auth...');
    }

    const token = request.cookies.get('admin_token')?.value;

    console.log('🔒 [MIDDLEWARE] All cookies:', request.cookies.getAll().map(c => c.name).join(', '));
    console.log('🔒 [MIDDLEWARE] Checking token:', token ? 'exists and starts with ' + token.substring(0, 10) : 'missing');

    if (!token) {
      // No token, redirect to login
      console.log('🚫 [MIDDLEWARE] No token found, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify the JWT token using jose (Edge-compatible)
      console.log('🔒 [MIDDLEWARE] Verifying JWT token...');

      const { payload } = await jwtVerify(token, getSecretKey());

      const decoded = payload as {
        id: string;
        email: string;
        role: string;
        isActive: boolean;
      };

      console.log('✅ [MIDDLEWARE] Token verified for:', decoded.email);

      // Check if admin is active
      if (!decoded.isActive) {
        console.log('🚫 [MIDDLEWARE] Admin account is deactivated');
        const url = new URL('/admin/login', request.url);
        url.searchParams.set('error', 'Account deactivated');
        const response = NextResponse.redirect(url);
        response.cookies.delete('admin_token');
        response.cookies.delete('admin_role');
        response.cookies.delete('admin_email');
        return response;
      }

      const isSuper = ['elmahboubimehdi@gmail.com', 'matrix01mehdi@gmail.com'].includes(decoded.email?.toLowerCase()) || decoded.role === 'SUPER_ADMIN';
      const effectiveRole = isSuper ? 'SUPER_ADMIN' : decoded.role;

      // Authenticated admin, allow access
      const response = NextResponse.next();
      response.headers.set('x-pathname', pathname);
      response.headers.set('x-admin-email', decoded.email);
      response.headers.set('x-admin-role', effectiveRole);

      // Auto-heal admin_role and admin_email cookies on client if needed
      if (isSuper && request.cookies.get('admin_role')?.value !== 'SUPER_ADMIN') {
        response.cookies.set('admin_role', 'SUPER_ADMIN', {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false,
        });
      }
      if (!request.cookies.get('admin_email')?.value && decoded.email) {
        response.cookies.set('admin_email', decoded.email, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          httpOnly: false,
        });
      }

      return response;
    } catch (error) {
      console.error('❌ [MIDDLEWARE] Error verifying token:', error);

      // Invalid or expired token, redirect to login
      const url = new URL('/admin/login', request.url);
      url.searchParams.set('error', 'Session expired or invalid');
      const response = NextResponse.redirect(url);
      response.cookies.delete('admin_token');
      response.cookies.delete('admin_role');
      response.cookies.delete('admin_email');
      return response;
    }
  }

  // Keep public product, price, shipping, and schema copy aligned with the US
  // Merchant Center setup until separate international policies are verified.
  const market = 'us';

  const response = NextResponse.next();
  response.headers.set('x-pathname', pathname);
  response.headers.set('x-user-market', market);
  
  response.cookies.set('user_market', market, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false, // allow client-side access if needed
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public files with an extension (images, fonts, manifests, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};
