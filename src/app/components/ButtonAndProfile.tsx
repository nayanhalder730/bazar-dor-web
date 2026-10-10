
"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  authClient,
  useSession,
  type AppSession,
} from "../lib/auth-client";
import { toast } from "react-toastify";

const ButtonAndProfile = () => {
  const { data: rawSession, isPending } = useSession();
  const session = rawSession as AppSession | null;

  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
  if (loggingOut) return;

  try {
    setLoggingOut(true);

    const { error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("লগআউট সফল হয়েছে!");

          router.replace("/");
          router.refresh();
        },
      },
    });

    if (error) {
      console.error("Logout error:", error.message);
      toast.error(error.message || "লগআউট করা যায়নি!");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("লগআউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
  } finally {
    setLoggingOut(false);
  }
};

  if (isPending) {
    return (
      <div className="h-10 w-36 animate-pulse rounded-xl bg-gray-100" />
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {session?.user ? (
        <>
          <Link href="/profile">
            <Button className="h-10 rounded-xl border border-emerald-200 bg-emerald-50 px-4 font-semibold text-emerald-800">
              <span className="mr-1.5">👤</span>
              Profile
            </Button>
          </Link>

          <Button
            onPress={handleLogOut}
            isDisabled={loggingOut}
            className="h-10 rounded-xl border border-red-200 bg-white px-4 font-semibold text-red-600"
          >
            {loggingOut ? "Logging out..." : "↪ Log Out"}
          </Button>
        </>
      ) : (
        <>
          <Link href="/signIn">
            <Button className="h-10 rounded-xl bg-gray-100 px-4 font-semibold text-gray-700">
              Sign In
            </Button>
          </Link>

          <Link href="/signUp">
            <Button className="h-10 rounded-xl bg-emerald-700 px-5 font-semibold text-white">
              Sign Up →
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ButtonAndProfile;
