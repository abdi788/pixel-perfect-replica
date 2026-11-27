import { z } from 'zod';
export const communityRoles = ['job_seeker', 'mentor', 'employer', 'partner'] as const;
export const signupSchema = z.object({ displayName: z.string().trim().min(2).max(100), email: z.email(), password: z.string().min(8), role: z.enum(communityRoles) });
export const profileSchema = z.object({ display_name: z.string().trim().min(2).max(100), bio: z.string().trim().max(1500) });
export const roleLabels: Record<string, string> = { administrator: 'Administrator', job_seeker: 'Job seeker', mentor: 'Mentor', employer: 'Employer', partner: 'Partner organization' };
