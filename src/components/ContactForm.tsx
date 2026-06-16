'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, CheckCircle, AlertCircle, Info, Check, X } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { sanitizeInput, validateEmail, validateContent, checkRateLimit } from '@/lib/security';
import { trackFormStart, trackFormSubmit } from '@/lib/analytics';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'react-toastify';
import {
  validateFullName,
  validateEmailWithSuggestions,
  validateCompanyName,
  validateProblems,
  validateAdditionalInfo,
  getFieldStrength,
  type ValidationResult
} from '@/lib/formValidation';

// Form data interface matching our database schema
interface FormData {
  fullName: string;
  email: string;
  companyName: string;
  service: string;
  problems: string;
  additionalInfo?: string;
}

const ContactForm: React.FC = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const formStartedRef = React.useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setError,
    clearErrors
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      service: '',
      problems: '',
      additionalInfo: ''
    }
  });

  const [validationStates, setValidationStates] = useState<Record<string, ValidationResult>>({});
  const [showValidationSummary, setShowValidationSummary] = useState(false);

  const watchedFields = watch(['fullName', 'email', 'companyName', 'service', 'problems', 'additionalInfo']);
  const [fullName, email, companyName, service, problems, additionalInfo] = watchedFields;

  const requiredFieldsCount = 5;
  const filledFieldsCount = [fullName, email, companyName, service, problems].filter(
    field => field && field.trim().length > 0
  ).length;
  const progressPercentage = (filledFieldsCount / requiredFieldsCount) * 100;

  useEffect(() => {
    if (fullName) {
      const result = validateFullName(fullName);
      setValidationStates(prev => ({ ...prev, fullName: result }));
    }
  }, [fullName]);

  useEffect(() => {
    if (email) {
      const result = validateEmailWithSuggestions(email);
      setValidationStates(prev => ({ ...prev, email: result }));
    }
  }, [email]);

  useEffect(() => {
    if (companyName) {
      const result = validateCompanyName(companyName);
      setValidationStates(prev => ({ ...prev, companyName: result }));
    }
  }, [companyName]);

  useEffect(() => {
    if (problems) {
      const result = validateProblems(problems);
      setValidationStates(prev => ({ ...prev, problems: result }));
    }
  }, [problems]);

  useEffect(() => {
    if (additionalInfo) {
      const result = validateAdditionalInfo(additionalInfo);
      setValidationStates(prev => ({ ...prev, additionalInfo: result }));
    }
  }, [additionalInfo]);

  const getValidationIcon = (fieldName: string) => {
    const state = validationStates[fieldName];
    const value = watch(fieldName as keyof FormData);

    if (!value || value.length === 0) return null;

    if (state?.isValid) {
      return <Check size={18} className="text-green-400" />;
    }
    if (state && !state.isValid && state.severity === 'warning') {
      return <AlertCircle size={18} className="text-yellow-400" />;
    }
    if (state && !state.isValid) {
      return <X size={18} className="text-red-400" />;
    }
    return null;
  };

  const getCharacterCount = (value: string, maxLength: number) => {
    const remaining = maxLength - value.length;
    const percentage = (value.length / maxLength) * 100;

    let colorClass = 'text-gray-400';
    if (percentage > 90) colorClass = 'text-red-400';
    else if (percentage > 75) colorClass = 'text-yellow-400';
    else if (percentage > 50) colorClass = 'text-blue-400';

    return (
      <span className={`text-xs ${colorClass}`}>
        {remaining} {t('contact.charactersRemaining')}
      </span>
    );
  };

  const services = [
    { key: 'AI Agents', labelKey: 'contact.service.aiAgents' },
    { key: 'Productos Digitales', labelKey: 'contact.service.productosDigitales' },
    { key: 'Content & Media', labelKey: 'contact.service.contentMedia' },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const validationErrors = [];

      if (!validationStates.fullName?.isValid) {
        validationErrors.push(t('contact.fullName'));
      }
      if (!validationStates.email?.isValid) {
        validationErrors.push(t('contact.email'));
      }
      if (!validationStates.companyName?.isValid) {
        validationErrors.push(t('contact.company'));
      }
      if (!data.service) {
        validationErrors.push(t('contact.service'));
      }
      if (!validationStates.problems?.isValid) {
        validationErrors.push(t('contact.problems'));
      }

      if (validationErrors.length > 0) {
        setShowValidationSummary(true);
        return;
      }

      if (!checkRateLimit('contact_form', 3, 300000)) {
        return;
      }

      const sanitizedData = {
        full_name: sanitizeInput(data.fullName, 100),
        email: sanitizeInput(data.email, 254),
        company_name: sanitizeInput(data.companyName, 100),
        service: sanitizeInput(data.service, 100),
        problems: sanitizeInput(data.problems, 1000),
        additional_info: data.additionalInfo ? sanitizeInput(data.additionalInfo, 500) : undefined,
      };

      if (!validateEmail(sanitizedData.email)) {
        return;
      }

      if (!validateContent(sanitizedData.problems, 10, 1000)) {
        return;
      }

      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          full_name: sanitizedData.full_name,
          email: sanitizedData.email,
          company_name: sanitizedData.company_name,
          service: sanitizedData.service,
          problems: sanitizedData.problems,
          additional_info: sanitizedData.additional_info ?? null,
        }]);

      if (dbError) {
        console.error('[DB]', dbError.code ?? 'insert_error');
        throw new Error('database_error');
      }

      trackFormSubmit();
      reset();
      setValidationStates({});
      setShowValidationSummary(false);
      router.push('/thank-you');
    } catch (err) {
      const isDbError = err instanceof Error &&
        err.message === 'database_error';
      console.error('[Form]', isDbError
        ? 'db_error'
        : 'unexpected_error');
      toast.error(t('contact.error'));
    }
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: '#0B0D14' }}>
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-8 pb-16 max-w-2xl">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 transition-all duration-200 mb-6"
            aria-label={t('contact.back')}
            style={{
              color: 'rgba(255,255,255,0.7)',
              padding: '8px 16px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '8px',
              background: 'transparent',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">{t('contact.back')}</span>
          </button>

          <div
            className="backdrop-blur-lg rounded-2xl p-8 shadow-xl border"
            style={{
              backgroundColor: 'rgba(26, 37, 64, 0.85)',
              borderColor: '#2D4460'
            }}
          >
            <h1
              className="text-3xl font-bold text-center mb-8"
              style={{
                color: '#E4EDF4'
              }}
            >
              {t('contact.title')}
            </h1>

            <AnimatePresence>
              {showValidationSummary && Object.values(validationStates).some(v => !v.isValid) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-red-400 font-semibold mb-2">
                        {t('contact.validationErrors')}
                      </h3>
                      <ul className="space-y-1 text-sm text-red-300">
                        {Object.entries(validationStates).map(([field, state]) => {
                          if (!state.isValid && state.error) {
                            return (
                              <li key={field} className="flex items-start gap-2">
                                <span className="text-red-400">•</span>
                                <span>{t(`contact.${state.error}`)}</span>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div className="relative">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.fullName')} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="fullName"
                    {...register('fullName', {
                      required: t('contact.required'),
                      minLength: {
                        value: 2,
                        message: t('contact.fullNameMinLength')
                      },
                      maxLength: {
                        value: 100,
                        message: t('contact.fullNameMaxLength')
                      }
                    })}
                    className={`w-full px-4 py-3 pr-12 liquid-glass-form-input rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      validationStates.fullName?.isValid
                        ? 'border-green-500/50 focus:ring-green-500'
                        : errors.fullName || (validationStates.fullName && !validationStates.fullName.isValid)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.025em',
                      color: '#FFFFFF'
                    }}
                    autoComplete="name"
                    placeholder={t('contact.placeholderFullName')}
                    onFocus={() => {
                      if (!formStartedRef.current) {
                        formStartedRef.current = true;
                        trackFormStart();
                      }
                    }}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "error-fullName" : undefined}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getValidationIcon('fullName')}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {(errors.fullName || (validationStates.fullName && !validationStates.fullName.isValid)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                      >
                        <p className="text-red-300 text-sm" role="alert" aria-live="polite">
                          {errors.fullName?.message || (validationStates.fullName?.error && t(`contact.${validationStates.fullName.error}`))}
                        </p>
                        {validationStates.fullName?.suggestion && (
                          <p className="text-gray-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{t(`contact.${validationStates.fullName.suggestion}`)}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {fullName && getCharacterCount(fullName, 100)}
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.email')} *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: t('contact.required'),
                      maxLength: {
                        value: 254,
                        message: t('contact.emailMaxLength')
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: t('contact.invalidEmail')
                      }
                    })}
                    className={`w-full px-4 py-3 pr-12 liquid-glass-form-input rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      validationStates.email?.isValid
                        ? 'border-green-500/50 focus:ring-green-500'
                        : errors.email || (validationStates.email && !validationStates.email.isValid)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.025em',
                      color: '#FFFFFF'
                    }}
                    autoComplete="email"
                    placeholder={t('contact.placeholderEmail')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "error-email" : undefined}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getValidationIcon('email')}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {(errors.email || (validationStates.email && !validationStates.email.isValid)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                      >
                        <p className="text-red-300 text-sm" role="alert" aria-live="polite">
                          {errors.email?.message || (validationStates.email?.error && t(`contact.${validationStates.email.error}`))}
                        </p>
                        {validationStates.email?.error === 'emailTypo' && validationStates.email?.suggestion && (
                          <p className="text-yellow-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>
                              {t('contact.emailTypo')} <strong>{validationStates.email.suggestion}</strong>?
                            </span>
                          </p>
                        )}
                        {validationStates.email?.suggestion && validationStates.email?.error !== 'emailTypo' && (
                          <p className="text-gray-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{t(`contact.${validationStates.email.suggestion}`)}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {email && getCharacterCount(email, 254)}
                </div>
              </div>

              {/* Company Name */}
              <div className="relative">
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.company')} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="companyName"
                    {...register('companyName', {
                      required: t('contact.required'),
                      minLength: {
                        value: 2,
                        message: t('contact.companyNameMinLength')
                      },
                      maxLength: {
                        value: 100,
                        message: t('contact.companyNameMaxLength')
                      }
                    })}
                    className={`w-full px-4 py-3 pr-12 liquid-glass-form-input rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 ${
                      validationStates.companyName?.isValid
                        ? 'border-green-500/50 focus:ring-green-500'
                        : errors.companyName || (validationStates.companyName && !validationStates.companyName.isValid)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.025em',
                      color: '#FFFFFF'
                    }}
                    autoComplete="organization"
                    placeholder={t('contact.placeholderCompany')}
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? "error-companyName" : undefined}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {getValidationIcon('companyName')}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {(errors.companyName || (validationStates.companyName && !validationStates.companyName.isValid)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                      >
                        <p className="text-red-300 text-sm" role="alert" aria-live="polite">
                          {errors.companyName?.message || (validationStates.companyName?.error && t(`contact.${validationStates.companyName.error}`))}
                        </p>
                        {validationStates.companyName?.suggestion && (
                          <p className="text-gray-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{t(`contact.${validationStates.companyName.suggestion}`)}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {companyName && getCharacterCount(companyName, 100)}
                </div>
              </div>

              {/* Selected Service */}
              <div className="relative">
                <label 
                  htmlFor="service" 
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.service')} *
                </label>
                <div className="relative">
                  <select
                    id="service"
                    {...register('service', {
                      required: t('contact.selectService')
                    })}
                    className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 liquid-glass-form-input text-white appearance-none cursor-pointer hover:shadow-lg ${
                      errors.service ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.5',
                      letterSpacing: '0.025em',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "error-service" : undefined}
                  >
                    <option value="">{t('contact.selectService')}</option>
                    {services.map((service) => (
                      <option
                        key={service.key}
                        value={service.key}
                        style={{
                          backgroundColor: 'rgba(26, 26, 26, 0.95)',
                          color: '#FFFFFF'
                        }}
                      >
                        {t(service.labelKey)}
                      </option>
                    ))}
                  </select>
                </div>
                <AnimatePresence>
                  {errors.service && (
                    <motion.p
                      id="error-service"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-300 text-sm mt-1"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.service.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Specific Problems */}
              <div className="relative">
                <label
                  htmlFor="problems"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.problems')} *
                </label>
                <div className="relative">
                  <textarea
                    id="problems"
                    rows={4}
                    {...register('problems', {
                      required: t('contact.required'),
                      minLength: {
                        value: 10,
                        message: t('contact.problemsMinLength')
                      },
                      maxLength: {
                        value: 1000,
                        message: t('contact.problemsMaxLength')
                      }
                    })}
                    className={`w-full px-4 py-3 pr-12 liquid-glass-form-input rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                      validationStates.problems?.isValid
                        ? 'border-green-500/50 focus:ring-green-500'
                        : errors.problems || (validationStates.problems && !validationStates.problems.isValid)
                        ? validationStates.problems?.severity === 'warning'
                          ? 'border-yellow-500/50 focus:ring-yellow-500'
                          : 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.625',
                      letterSpacing: '0.025em',
                      color: '#FFFFFF',
                      minHeight: '120px'
                    }}
                    placeholder={t('contact.placeholderProblems')}
                    aria-invalid={!!errors.problems}
                    aria-describedby={errors.problems ? "error-problems" : undefined}
                  />
                  <div className="absolute right-3 top-3">
                    {getValidationIcon('problems')}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {(errors.problems || (validationStates.problems && !validationStates.problems.isValid)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                      >
                        <p
                          className={`text-sm ${
                            validationStates.problems?.severity === 'warning' ? 'text-yellow-300' : 'text-red-300'
                          }`}
                          role="alert"
                          aria-live="polite"
                        >
                          {errors.problems?.message || (validationStates.problems?.error && t(`contact.${validationStates.problems.error}`))}
                        </p>
                        {validationStates.problems?.suggestion && (
                          <p className="text-gray-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{t(`contact.${validationStates.problems.suggestion}`)}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {problems && getCharacterCount(problems, 1000)}
                </div>
              </div>

              {/* Additional Information */}
              <div className="relative">
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium mb-2"
                  style={{
                    color: '#E5E5E5',
                    letterSpacing: '0.025em',
                    lineHeight: '1.5'
                  }}
                >
                  {t('contact.additionalInfo')}
                </label>
                <div className="relative">
                  <textarea
                    id="additionalInfo"
                    rows={3}
                    {...register('additionalInfo', {
                      maxLength: {
                        value: 500,
                        message: t('contact.additionalInfoMaxLength')
                      }
                    })}
                    className={`w-full px-4 py-3 pr-12 liquid-glass-form-input rounded-lg focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                      validationStates.additionalInfo?.isValid && additionalInfo
                        ? 'border-green-500/50 focus:ring-green-500'
                        : errors.additionalInfo || (validationStates.additionalInfo && !validationStates.additionalInfo.isValid)
                        ? 'border-red-500 focus:ring-red-500'
                        : 'focus:ring-[#ADC9E0]'
                    }`}
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.625',
                      letterSpacing: '0.025em',
                      color: '#FFFFFF',
                      minHeight: '90px'
                    }}
                    placeholder={t('contact.placeholderAdditionalInfo')}
                    aria-invalid={!!errors.additionalInfo}
                    aria-describedby={errors.additionalInfo ? "error-additionalInfo" : undefined}
                  />
                  {additionalInfo && (
                    <div className="absolute right-3 top-3">
                      {getValidationIcon('additionalInfo')}
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center mt-1">
                  <AnimatePresence>
                    {(errors.additionalInfo || (validationStates.additionalInfo && !validationStates.additionalInfo.isValid)) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                      >
                        <p className="text-red-300 text-sm" role="alert" aria-live="polite">
                          {errors.additionalInfo?.message || (validationStates.additionalInfo?.error && t(`contact.${validationStates.additionalInfo.error}`))}
                        </p>
                        {validationStates.additionalInfo?.suggestion && (
                          <p className="text-gray-400 text-xs mt-1 flex items-start gap-1">
                            <Info size={12} className="mt-0.5 flex-shrink-0" />
                            <span>{t(`contact.${validationStates.additionalInfo.suggestion}`)}</span>
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {additionalInfo && getCharacterCount(additionalInfo, 500)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    {t('contact.progressLabel')}
                  </span>
                  <span className="text-sm font-medium text-[#ADC9E0]">
                    {filledFieldsCount}/{requiredFieldsCount}
                  </span>
                </div>
                <div 
                  className="w-full bg-gray-700 rounded-full h-2 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={t('contact.progressLabel')}
                >
                  <motion.div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #ADC9E0 0%, #444B8E 100%)',
                      width: `${progressPercentage}%`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                {progressPercentage === 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center mt-2 text-green-400"
                     role="status"
                     aria-live="polite"
                  >
                    <CheckCircle size={16} className="mr-1" />
                    <span className="text-sm">{t('contact.formComplete')}</span>
                  </motion.div>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white font-semibold py-4 px-6 rounded-lg 
                          transition-all duration-300 
                          focus:ring-2 focus:ring-[#444B8E] focus:ring-offset-2 focus:ring-offset-[#0B0D14]
                          flex items-center justify-center gap-2
                          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.02]'}`}
                style={{
                  background: isSubmitting
                    ? 'rgba(173, 201, 224, 0.5)'
                    : `linear-gradient(135deg, #ADC9E0 0%, #444B8E 100%)`,
                  fontSize: '1rem',
                  letterSpacing: '0.025em',
                  lineHeight: '1.5',
                  minHeight: '56px'
                }}
                whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
                whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                aria-label={isSubmitting ? t('contact.sending') : t('contact.submit')}
              >
                <span>{isSubmitting ? t('contact.sending') : t('contact.submit')}</span>
                {!isSubmitting && <Send size={20} />}
                {isSubmitting && (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    <span className="sr-only" aria-live="polite">
                      {t('contact.sendingAccessible')}
                    </span>
                  </>
                )}
              </motion.button>

              {/* Form completion encouragement */}
              {progressPercentage > 0 && progressPercentage < 100 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-gray-400 mt-4"
                  role="status"
                  aria-live="polite"
                >
                  {t('contact.completeFields')} {requiredFieldsCount - filledFieldsCount} {requiredFieldsCount - filledFieldsCount !== 1 ? t('contact.fieldsRemaining') : t('contact.fieldRemaining')}
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;