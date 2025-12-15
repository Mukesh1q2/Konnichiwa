// Input validation utilities
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class Validator {
  // Email validation
  static validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors = [];
    
    if (!email) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    } else if (email.length > 254) {
      errors.push('Email address is too long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Phone number validation
  static validatePhone(phone: string): ValidationResult {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    const errors = [];
    
    if (!phone) {
      errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Name validation
  static validateName(name: string, fieldName: string = 'Name'): ValidationResult {
    const errors = [];
    
    if (!name || name.trim().length === 0) {
      errors.push(`${fieldName} is required`);
    } else if (name.length < 2) {
      errors.push(`${fieldName} must be at least 2 characters long`);
    } else if (name.length > 50) {
      errors.push(`${fieldName} is too long (maximum 50 characters)`);
    } else if (!/^[a-zA-Z\\s'-]+$/.test(name)) {
      errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Text content validation
  static validateText(text: string, fieldName: string = 'Text', minLength: number = 1, maxLength: number = 1000): ValidationResult {
    const errors = [];
    
    if (!text || text.trim().length === 0) {
      errors.push(`${fieldName} is required`);
    } else if (text.length < minLength) {
      errors.push(`${fieldName} must be at least ${minLength} characters long`);
    } else if (text.length > maxLength) {
      errors.push(`${fieldName} is too long (maximum ${maxLength} characters)`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // URL validation
  static validateUrl(url: string): ValidationResult {
    try {
      new URL(url);
      return { isValid: true, errors: [] };
    } catch {
      return {
        isValid: false,
        errors: ['Please enter a valid URL']
      };
    }
  }

  // Sanitize HTML/script content
  static sanitizeHTML(html: string): string {
    // Basic HTML sanitization - in production, use a library like DOMPurify
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');
  }

  // Rate limiting check simulation
  static async checkRateLimit(identifier: string, limit: number = 5, window: number = 60000): Promise<boolean> {
    // In production, implement proper rate limiting with Redis
    const key = `rate_limit:${identifier}`;
    const attempts = parseInt(localStorage.getItem(key) || '0');
    
    if (attempts >= limit) {
      return false;
    }
    
    localStorage.setItem(key, (attempts + 1).toString());
    
    // Reset after window period
    setTimeout(() => {
      localStorage.removeItem(key);
    }, window);
    
    return true;
  }
}
