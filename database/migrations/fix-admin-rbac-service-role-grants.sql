-- Fix admin dashboard login failures caused by missing API-role grants.
-- The admin login route uses the Supabase service role through PostgREST to
-- read/write these RBAC tables. If service_role has no table privileges,
-- /api/admin/login returns "Authentication failed" even with valid credentials.

GRANT SELECT, INSERT, UPDATE ON public.admin_roles TO service_role;
GRANT SELECT ON public.admin_permissions TO service_role;
GRANT SELECT, INSERT ON public.admin_audit_log TO service_role;

GRANT EXECUTE ON FUNCTION public.log_admin_action(
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text
) TO service_role;

GRANT EXECUTE ON FUNCTION public.check_admin_permission(text, text) TO service_role;

