/**
 * Security utilities for input validation and data protection
 */

// Rate limiting store (simple client-side implementation)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Enhanced input sanitization for security
 */
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input
    .trim()
    // Remove HTML tags and potential XSS vectors
    .replace(/<[^>]*>/g, '')
    .replace(/[<>\"'&]/g, '')
    // Remove potential script injections
    .replace(/javascript:|data:|vbscript:|about:|chrome:|file:/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove eval and expression patterns that could trigger validation errors
    .replace(/eval\s*\(/gi, '')
    .replace(/expression\s*\(/gi, '')
    // Remove SQL injection attempts
    .replace(/(['";]|--|\/\*|\*\/|union|select|drop|delete|insert|update)/gi, '')
    // Limit length
    .substring(0, maxLength);
};

/**
 * Email validation with additional security checks
 */
export const validateEmail = (email: string): boolean => {
  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email)) {
    return false;
  }
  
  // Additional security checks
  if (email.length > 254) {
    return false;
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /script/gi,
    /javascript/gi,
    /vbscript/gi,
    /<[^>]*>/g
  ];
  
  return !suspiciousPatterns.some(pattern => pattern.test(email));
};

/**
 * Simple client-side rate limiting
 */
export const checkRateLimit = (identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const key = identifier;
  
  // Clean expired entries
  for (const [k, v] of rateLimitStore.entries()) {
    if (now > v.resetTime) {
      rateLimitStore.delete(k);
    }
  }
  
  const current = rateLimitStore.get(key);
  
  if (!current) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (now > current.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

/**
 * Secure random token generation
 */
export const generateSecureToken = (length: number = 32): string => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Content validation for text fields
 */
export const validateContent = (content: string, minLength: number = 0, maxLength: number = 1000): boolean => {
  if (typeof content !== 'string') {
    return false;
  }
  
  if (content.length < minLength || content.length > maxLength) {
    return false;
  }
  
  // Check for malicious patterns
  const maliciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
    /javascript:/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi
  ];
  
  return !maliciousPatterns.some(pattern => pattern.test(content));
};