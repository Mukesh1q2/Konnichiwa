import { Validator } from '@/lib/validation';

describe('Validator', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      const result = Validator.validateEmail('user@example.com');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject invalid email addresses', () => {
      const result = Validator.validateEmail('invalid-email');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Please enter a valid email address');
    });

    it('should require email', () => {
      const result = Validator.validateEmail('');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email is required');
    });
  });

  describe('validateName', () => {
    it('should validate correct names', () => {
      const result = Validator.validateName('John Doe');
      expect(result.isValid).toBe(true);
    });

    it('should reject short names', () => {
      const result = Validator.validateName('A');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters long');
    });

    it('should reject names with special characters', () => {
      const result = Validator.validateName('John@Doe');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name can only contain letters, spaces, hyphens, and apostrophes');
    });
  });
});
