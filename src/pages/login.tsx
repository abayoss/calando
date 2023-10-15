/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import LoadingComponent from "@/components/loading-component";

const LoginPage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen w-full items-center justify-center text-center">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-md bg-white px-6 py-12 shadow-md ring-1 ring-slate-200">
        <Image
          src="/calando.svg"
          height={120}
          width={120}
          alt="logo"
          className="block"
        />

        <div className="mx-auto mt-10 flex flex-col justify-center space-y-6 sm:w-[350px]">
          <h2 className="text-center text-2xl font-semibold text-gray-900">
            Sign in to your account
          </h2>

          <Button
            variant="outline"
            type="button"
            disabled={false}
            onClick={() => void signIn("google")}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/48px-Google_%22G%22_Logo.svg.png"
              className="mr-2 h-4 w-4"
              alt="Google logo"
            />
            <span className="ml-2 text-gray-500">Continue with Google</span>
          </Button>

          <p className="px-8 text-center text-sm font-light text-gray-500">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
