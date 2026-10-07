import { describe, expect, it } from 'vitest';
import { loginSchema } from './auth';

describe('loginSchema', () => {
  it('accepts valid login credentials', () => {
    const result = loginSchema.safeParse({
      email: 'provider@example.com',
      password: 'securepassword',
    });

    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'not-an-email',
      password: 'securepassword',
    });

    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = loginSchema.safeParse({
      email: 'provider@example.com',
      password: 'short',
    });

    expect(result.success).toBe(false);
  });

  it('rejects missing credentials', () => {
    const result = loginSchema.safeParse({});

    expect(result.success).toBe(false);
  });
});
