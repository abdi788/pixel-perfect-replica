import { describe, expect, it } from 'vitest';
import { communityRoles, signupSchema, profileSchema } from '@/lib/member-schema';
describe('SkillSphere member rules', () => {
 it('does not allow administrator access at public registration', () => { expect(signupSchema.safeParse({ displayName: 'New Member', email: 'member@example.com', password: 'valid-password-123', role: 'administrator' }).success).toBe(false); });
 it('allows the four community account types', () => { expect([...communityRoles]).toEqual(['job_seeker', 'mentor', 'employer', 'partner']); for (const role of communityRoles) expect(signupSchema.safeParse({ displayName: 'New Member', email: 'member@example.com', password: 'valid-password-123', role }).success).toBe(true); });
 it('rejects invalid profile data', () => { expect(profileSchema.safeParse({ display_name: '', bio: '' }).success).toBe(false); });
});
