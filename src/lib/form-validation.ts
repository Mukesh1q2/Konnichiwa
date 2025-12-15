import React from 'react';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any, allValues?: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class FormValidator {
  static validate(data: Record<string, any>, schema: ValidationSchema): ValidationResult {
    const errors: Record<string, string> = {};

    for (const [field, rule] of Object.entries(schema)) {
      const value = data[field];

      // Required field check
      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        errors[field] = `${field} is required`;
        continue;
      }

      // Skip other validations if field is empty and not required
      if (!value && !rule.required) {
        continue;
      }

      // String validations
      if (typeof value === 'string') {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] = `${field} must be at least ${rule.minLength} characters`;
        }

        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] = `${field} must not exceed ${rule.maxLength} characters`;
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = `${field} format is invalid`;
        }
      }

      // Custom validation
      if (rule.custom) {
        const customError = rule.custom(value, data);
        if (customError) {
          errors[field] = customError;
        }
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Predefined validation schemas
  static readonly SCHEMAS = {
    LOGIN: {
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 8
      }
    },
    REGISTER: {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      },
      password: {
        required: true,
        minLength: 8,
        custom: (value: string) => {
          if (!/(?=.*[a-z])/.test(value)) return 'Password must contain at least one lowercase letter';
          if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain at least one uppercase letter';
          if (!/(?=.*\d)/.test(value)) return 'Password must contain at least one number';
          if (!/(?=.*[@$!%*?&])/.test(value)) return 'Password must contain at least one special character';
          return null;
        }
      },
      confirmPassword: {
        required: true,
        custom: (value: string, allValues: any) => {
          if (value !== allValues.password) return 'Passwords do not match';
          return null;
        }
      }
    },
    PROFILE_UPDATE: {
      firstName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      lastName: {
        required: true,
        minLength: 2,
        maxLength: 50
      },
      phone: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/
      }
    },
    EVENT_BOOKING: {
      quantity: {
        required: true,
        custom: (value: any) => {
          const num = parseInt(value);
          if (isNaN(num) || num < 1 || num > 10) return 'Quantity must be between 1 and 10';
          return null;
        }
      },
      attendeeName: {
        required: true,
        minLength: 2,
        maxLength: 100
      },
      attendeeEmail: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    }
  };
}

// Hook for form validation
export function useFormValidation(schema: ValidationSchema, initialData: Record<string, any> = {}) {
  const [data, setData] = React.useState(initialData);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validate = React.useCallback((fieldData?: Record<string, any>) => {
    const dataToValidate = fieldData || data;
    const result = FormValidator.validate(dataToValidate, schema);
    setErrors(result.errors);
    return result.isValid;
  }, [data, schema]);

  const setValue = React.useCallback((field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));

    // Validate field if it has been touched
    if (touched[field]) {
      const result = FormValidator.validate({ ...data, [field]: value }, schema);
      setErrors(result.errors);
    }
  }, [data, schema, touched]);

  const setTouchedField = React.useCallback((field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validate();
  }, [validate]);

  const reset = React.useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({});
  }, [initialData]);

  return {
    data,
    errors,
    touched,
    setValue,
    setTouchedField,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}
