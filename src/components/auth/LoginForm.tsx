"use client";

import * as React from "react";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { AuthApiError } from "@supabase/supabase-js";
import DynamicInput from "@/components/common/DynamicInput";
import Image from "next/image";
import Link from "next/link";
import DynamicButton from "@/components/common/DynamicButton";
import { useRouter } from "next/navigation";
import { useTranslation } from '@/hooks/useTranslation';

export default function LoginForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = t('validation.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
    }

    if (!formData.password) {
      newErrors.password = t('validation.required');
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      // Supabase login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Get coach profile to confirm everything is set up
        const { data: coachData, error: profileError } = await supabase
          .from("coaches")
          .select("*")
          .eq("id", data.user.id)
          .single();

        if (profileError) {
          console.error("Profile fetch error:", profileError);
          // User exists in auth but no coach profile - redirect to complete setup
          setMessage("Profil incomplet. Redirection...");
          setTimeout(() => router.push("/complete-profile"), 1500);
          return;
        }

        console.log("Login successful:", {
          user: data.user.email,
          coach: coachData,
        });

        // Success! Redirect to dashboard
        router.push("/coach-dashboard");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);

      // Handle specific Supabase AuthApiError
      if (error instanceof AuthApiError) {
        switch (error.message) {
          case "Invalid login credentials":
            setMessage(t('auth.invalidCredentials'));
            break;
          case "Email not confirmed":
            setMessage(t('auth.emailNotConfirmed'));
            break;
          case "Too many requests":
            setMessage(t('auth.tooManyRequests'));
            break;
          default:
            setMessage(t('auth.loginError') + ": " + error.message);
        }
      } else if (error instanceof Error) {
        // Handle other Error types
        if (error.message.includes("Invalid login credentials")) {
          setMessage(t('auth.invalidCredentials'));
        } else if (error.message.includes("Email not confirmed")) {
          setMessage(t('auth.emailNotConfirmed'));
        } else if (error.message.includes("Too many requests")) {
          setMessage(t('auth.tooManyRequests'));
        } else {
          setMessage(t('auth.loginError') + ": " + error.message);
        }
      } else {
        setMessage(t('auth.loginError'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div>
        {/* Logo */}
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="UpGr8 Logo"
            width={220}
            height={220}
            priority
            className="inline-flex items-center justify-center"
          />
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 -mt-20">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {t('auth.loginTitle')}
            </h1>
            <p className="text-gray-600 text-sm">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Global Message Display */}
            {message && (
              <div
                className={`p-3 rounded-lg ${
                  message.includes("Erreur") ||
                  message.includes("incorrect") ||
                  message.includes("tentatives")
                    ? "bg-red-50 border border-red-200 text-red-800"
                    : message.includes("Redirection")
                    ? "bg-blue-50 border border-blue-200 text-blue-800"
                    : "bg-green-50 border border-green-200 text-green-800"
                }`}
              >
                <p className="text-sm">{message}</p>
              </div>
            )}

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('auth.email')}
              </label>
              <DynamicInput
                type="email"
                id="email"
                placeholder={t('auth.email')}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  clearError("email");
                }}
                error={errors.email}
                className="h-10 text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('auth.password')}
              </label>
              <DynamicInput
                type="password"
                id="password"
                placeholder={t('auth.password')}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  clearError("password");
                }}
                error={errors.password}
                className="h-10 text-sm"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <DynamicButton
              label={loading ? t('common.loading') : t('auth.signIn')}
              type="submit"
              variant="default"
              className="w-full h-10 text-sm font-medium"
              disabled={loading}
            />

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Vous n&apos;avez pas de compte ?{" "}
                <Link
                  href="/register"
                  className="font-medium text-red-600 hover:text-red-700 transition-colors"
                >
                  S&apos;inscrire
                </Link>
              </span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            © 2025 UpGr8
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href="/privacy"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Politique de confidentialité
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href="/terms"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Conditions d&apos;utilisation
          </Link>
        </div>
      </div>
    </div>
  );
}
