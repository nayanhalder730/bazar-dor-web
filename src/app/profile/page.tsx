
"use client";

import { useEffect, useState } from "react";
import { Button, Input, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  authClient,
  useSession,
  type AppSession,
} from "../lib/auth-client";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: rawSession, isPending } = useSession();
  const session = rawSession as AppSession | null;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setName(session?.user?.name ?? "");
  }, [session?.user?.name]);

  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newName = name.trim();

    if (!newName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (newName === session?.user?.name) {
      toast.info("নামে কোনো পরিবর্তন করা হয়নি");
      return;
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("নাম আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setSaving(true);

      const { error } = await authClient.signOut({});

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সাইন আউট সফল হয়েছে!");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <p className="p-10 text-center text-gray-600">
        লোড হচ্ছে...
      </p>
    );
  }

  if (!session?.user) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-gray-700">
          প্রোফাইল দেখতে সাইন ইন করুন।
        </p>
        <Button
          className="bg-[#008744] text-white"
          onPress={() => router.push("/signIn")}
        >
          সাইন ইন
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6f3] px-4 py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-bold text-gray-900 md:text-3xl">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 md:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gray-100 bg-gray-100">
              <Image
                src={
                  session.user.image ||
                  "https://avatar.iran.liara.run/public"
                }
                alt={session.user.name || "User Avatar"}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {session.user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-sm text-gray-500">
                {session.user.email}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            isDisabled={saving}
            onPress={handleLogout}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            সাইন আউট
          </Button>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-gray-900">
            তথ্য
          </h3>

          <form
            onSubmit={handleUpdate}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm font-semibold text-gray-800">
                নাম
              </Label>

              <Input
                aria-label="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/40 px-3 py-2.5 text-sm"
              />
            </div>

            <Button
              type="submit"
              isDisabled={saving || !name.trim()}
              className="w-full rounded-xl bg-[#008744] py-3 text-sm font-medium text-white hover:bg-[#007038]"
            >
              {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
