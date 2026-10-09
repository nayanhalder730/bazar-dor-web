"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "../lib/auth-client";

const ButtonAndProfile = () => {
const { data: session, isPending } = useSession();
const [loggingOut, setLoggingOut] = useState(false);
const router = useRouter();

const handleLogOut = async () => {
if (loggingOut) return;

try {
  setLoggingOut(true);

  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        router.replace("/");
        router.refresh();
      },
    },
  });
} catch (error) {
  console.error("Logout error:", error);
} finally {
  setLoggingOut(false);
}

};

if (isPending) {
return ( <div className="h-10 w-36 animate-pulse rounded-xl bg-gray-100" />
);
}

return ( <div className="flex items-center gap-2 sm:gap-3">
{session?.user ? (
<> <Link href="/profile"> <Button className="h-10 rounded-xl border border-emerald-200 bg-emerald-50 px-4 font-semibold text-emerald-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-100"> <span className="mr-1.5">👤</span>
Profile </Button> </Link>

      <Button
        onPress={handleLogOut}
        isDisabled={loggingOut}
        className="h-10 rounded-xl border border-red-200 bg-white px-4 font-semibold text-red-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-red-50"
      >
        {loggingOut ? "Logging out..." : "↪ Log Out"}
      </Button>
    </>
  ) : (
    <>
      <Link href="/signIn">
        <Button
          className="h-10 rounded-xl bg-gray-100 px-4 font-semibold text-gray-700 transition-all hover:bg-gray-200"
        >
          Sign In
        </Button>
      </Link>

      <Link href="/signUp">
        <Button className="h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-green-700 px-5 font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:from-emerald-700 hover:to-green-800">
          Sign Up <span className="ml-1">→</span>
        </Button>
      </Link>
    </>
  )}
</div>

);
};

export default ButtonAndProfile;
