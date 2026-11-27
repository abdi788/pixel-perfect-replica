import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { profileSchema } from './member-schema';
export const getMember = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const [profile, roles] = await Promise.all([context.supabase.from('profiles').select('display_name,bio').eq('id', context.userId).single(), context.supabase.from('user_roles').select('role').eq('user_id', context.userId)]);
  if (profile.error || roles.error) throw new Error('Your account could not be loaded. Please try again.');
  return { profile: profile.data, roles: roles.data.map(r => r.role) };
});
export const updateProfile = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).inputValidator(input => profileSchema.parse(input)).handler(async ({ data, context }) => {
  const result = await context.supabase.from('profiles').update(data).eq('id', context.userId).select('display_name,bio').single();
  if (result.error) throw new Error('Your profile could not be saved.');
  return result.data;
});
