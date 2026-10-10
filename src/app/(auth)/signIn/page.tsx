"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "../../lib/auth-client";

function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Google/GitHub login-er por toast dekhano
  useEffect(() => {
    const socialLogin = searchParams.get("socialLogin");

    if (socialLogin === "success") {
      toast.success("সাইন ইন সফল হয়েছে!", { toastId: "social-login-success" });
      router.replace("/");
      router.refresh();
    } else if (socialLogin === "error") {
      toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।", {
        toastId: "social-login-error",
      });
      router.replace("/signIn", { scroll: false });
    }
  }, [searchParams, router]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || socialLoading) return;

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = async (provider: "google" | "github") => {
    if (loading || socialLoading) return;
    try {
      setSocialLoading(true);

      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/signIn?socialLogin=success",
        errorCallbackURL: "/signIn?socialLogin=error",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        setSocialLoading(false);
      }
    } catch (error) {
      console.error("Social sign in error:", error);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6f3] px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          সাইন ইন
        </h2>
        <p className="text-sm text-gray-500 md:text-base">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <div className="flex flex-col gap-5">
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) =>
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ? null
                    : "সঠিক ইমেইল ঠিকানা লিখুন"
                }
              >
                <Label className="text-sm font-semibold text-gray-800">
                  ইমেইল
                </Label>
                <Input
                  name="email"
                  type="email"
                  aria-label="ইমেইল"
                  placeholder="you@example.com"
                  className="mt-1 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                validate={(value) =>
                  value.length < 8
                    ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label className="text-sm font-semibold text-gray-800">
                  পাসওয়ার্ড
                </Label>
                <Input
                  name="password"
                  type="password"
                  aria-label="পাসওয়ার্ড"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="mt-1 rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <FieldError />
              </TextField>

              <Fieldset.Actions className="mt-2">
                <Button
                  type="submit"
                  isDisabled={loading || socialLoading}
                  className="w-full rounded-lg bg-[#008744] py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#007038]"
                >
                  <FloppyDisk />
                  {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
                </Button>
              </Fieldset.Actions>
            </div>
          </Fieldset>
        </Form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-xs text-gray-400">
            অথবা
          </span>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            isDisabled={loading || socialLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            onPress={() => socialSignIn("google")}
          >
            Google দিয়ে চালিয়ে যান
          </Button>

          <Button
            type="button"
            isDisabled={loading || socialLoading}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            onPress={() => socialSignIn("github")}
          >
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <div className="text-center text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signUp"
            className="font-medium text-[#008744] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f3f6f3]">
          <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}