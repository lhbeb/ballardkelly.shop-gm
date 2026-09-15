import 'server-only';

import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { shouldBypassAuth } from '@/lib/supabase/auth';

export interface AdminRequestAuth {
  authenticated: true;
  role: string;
  email: string;
}

const SUPER_ADMIN_EMAILS = new Set([
  'elmahboubimehdi@gmail.com',
  'matrix01mehdi@gmail.com',
]);

function getRequestToken(request: NextRequest): string | null {
  const cookieToken = request.cookies.get('admin_token')?.value;
  if (cookieToken) return cookieToken;

  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return null;
  return authorization.slice('Bearer '.length).trim() || null;
}

export async function getAdminAuthFromRequest(
  request: NextRequest,
): Promise<AdminRequestAuth | null> {
  if (process.env.NODE_ENV === 'development' && shouldBypassAuth()) {
    return { authenticated: true, role: 'SUPER_ADMIN', email: 'dev@localhost' };
  }

  const token = getRequestToken(request);
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    );
    const { payload } = await jwtVerify(token, secret);
    const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
    const rawRole = typeof payload.role === 'string' ? payload.role : '';
    const normalizedRole = rawRole.toUpperCase().replace(/-/g, '_');
    const role = SUPER_ADMIN_EMAILS.has(email) ? 'SUPER_ADMIN' : normalizedRole;

    if (payload.isActive !== true || !email) return null;
    if (!['SUPER_ADMIN', 'REGULAR_ADMIN', 'ADMIN'].includes(role)) return null;

    return { authenticated: true, role, email };
  } catch {
    return null;
  }
}
