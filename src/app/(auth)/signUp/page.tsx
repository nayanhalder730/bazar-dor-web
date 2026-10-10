
"use client";

import { authClient } from "../../lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import { toast } from "react-toastify";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function Basic() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const formData = new FormData(e.currentTarget);

    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const name = data.name?.trim() ?? "";
    const email = data.email?.trim() ?? "";
    const password = data.password ?? "";
    const confirmPassword = data.confirmPassword ?? "";

        if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    try {
      setLoading(true);

      const { data: signUpData, error } =
  await authClient.signUp.email({
    name,
    email,
    password,
    callbackURL: "/",
  });

if (error) {
  toast.error(error.message);
  return;
}

if (signUpData) {
  toast.success("Signup successful!");
  window.location.href = "/";
}
    } catch (error) {
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6f3] px-4 py-10">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          অ্যাকাউন্ট তৈরি করুন
        </h2>
        <p className="text-sm text-gray-500 md:text-base">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <Form className="w-full" onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <FieldGroup className="gap-4">
              <TextField
                isRequired
                name="name"
                className="flex flex-col gap-1"
                validate={(value) =>
                  value.trim().length < 3
                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label className="text-sm font-semibold text-gray-800">
                  নাম
                </Label>
                <Input
                  type="text"
                  placeholder="যেমন: রহিম উদ্দিন"
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                className="flex flex-col gap-1"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  ইমেইল
                </Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="password"
                type="password"
                minLength={8}
                className="flex flex-col gap-1"
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "অন্তত একটি ইংরেজি বড় হাতের অক্ষর দিন";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "অন্তত একটি সংখ্যা দিন";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-gray-800">
                  পাসওয়ার্ড
                </Label>
                <Input
                  type="password"
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <Description className="text-xs text-gray-500">
                  কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা দিন।
                </Description>
                <FieldError />
              </TextField>

              <TextField
                isRequired
                name="confirmPassword"
                type="password"
                className="flex flex-col gap-1"
              >
                <Label className="text-sm font-semibold text-gray-800">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>
                <Input
                  type="password"
                  placeholder="আবার লিখুন"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:bg-white"
                />
                <FieldError />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions className="mt-5">
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full rounded-lg bg-[#008744] py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#007038]"
              >
                <FloppyDisk />
                {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>
            </Fieldset.Actions>
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
            className="w-full rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            onPress={() =>
              authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
            }
          >
            Google দিয়ে চালিয়ে যান
          </Button>

          <Button
            type="button"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 text-xs font-semibold text-gray-700 hover:bg-gray-100"
            onPress={() =>
              authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
              })
            }
          >
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <div className="text-center text-xs text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signIn"
            className="font-medium text-[#008744] hover:underline"
          >
            সাইন ইন করুন
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