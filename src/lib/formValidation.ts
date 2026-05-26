export interface ValidationResult {
  isValid: boolean;
  error?: string;
  suggestion?: string;
  severity?: 'error' | 'warning';
}

export const validateFullName = (name: string): ValidationResult => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'required' };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'fullNameMinLength',
      suggestion: 'nameMinLengthHelp'
    };
  }

  if (trimmed.length > 100) {
    return {
      isValid: false,
      error: 'fullNameMaxLength',
      suggestion: 'nameTooLongHelp'
    };
  }

  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 2) {
    return {
      isValid: false,
      error: 'fullNameTwoWords',
      suggestion: 'fullNameTwoWordsHelp'
    };
  }

  const hasInvalidChars = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/.test(trimmed);
  if (hasInvalidChars) {
    return {
      isValid: false,
      error: 'fullNameInvalidChars',
      suggestion: 'nameInvalidCharsHelp'
    };
  }

  return { isValid: true };
};

export const validateEmailWithSuggestions = (email: string): ValidationResult => {
  const trimmed = email.trim().toLowerCase();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'required' };
  }

  if (trimmed.length > 254) {
    return {
      isValid: false,
      error: 'emailMaxLength',
      suggestion: 'emailTooLongHelp'
    };
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'invalidEmail',
      suggestion: 'emailFormatHelp'
    };
  }

  const commonTypos: Record<string, string> = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'gmil.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'yaho.com': 'yahoo.com',
    'hotmial.com': 'hotmail.com',
    'hotmai.com': 'hotmail.com',
    'outlok.com': 'outlook.com',
    'outloo.com': 'outlook.com'
  };

  const domain = trimmed.split('@')[1];
  if (domain && commonTypos[domain]) {
    return {
      isValid: false,
      error: 'emailTypo',
      suggestion: commonTypos[domain],
      severity: 'warning'
    };
  }

  return { isValid: true };
};

export const validateCompanyName = (name: string): ValidationResult => {
  const trimmed = name.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'required' };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'companyNameMinLength',
      suggestion: 'companyMinLengthHelp'
    };
  }

  if (trimmed.length > 100) {
    return {
      isValid: false,
      error: 'companyNameMaxLength',
      suggestion: 'companyTooLongHelp'
    };
  }

  return { isValid: true };
};

export const validateProblems = (text: string): ValidationResult => {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { isValid: false, error: 'required' };
  }

  if (trimmed.length < 10) {
    return {
      isValid: false,
      error: 'problemsMinLength',
      suggestion: 'problemsMinLengthHelp'
    };
  }

  if (trimmed.length > 1000) {
    return {
      isValid: false,
      error: 'problemsMaxLength',
      suggestion: 'problemsTooLongHelp'
    };
  }

  const words = trimmed.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 5) {
    return {
      isValid: false,
      error: 'problemsTooShort',
      suggestion: 'problemsMoreDetailHelp',
      severity: 'warning'
    };
  }

  return { isValid: true };
};

export const validateAdditionalInfo = (text: string): ValidationResult => {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { isValid: true };
  }

  if (trimmed.length > 500) {
    return {
      isValid: false,
      error: 'additionalInfoMaxLength',
      suggestion: 'additionalInfoTooLongHelp'
    };
  }

  return { isValid: true };
};

export const getFieldStrength = (value: string, minLength: number, maxLength: number): number => {
  const length = value.trim().length;
  const words = value.trim().split(/\s+/).filter(w => w.length > 0).length;

  if (length === 0) return 0;
  if (length < minLength) return Math.min(30, (length / minLength) * 30);

  const lengthScore = Math.min(50, (length / maxLength) * 50);
  const wordScore = Math.min(50, (words / 10) * 50);

  return Math.min(100, lengthScore + wordScore);
};
