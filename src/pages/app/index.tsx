import Head from "next/head";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

import RootLayout from "@/layouts/root-layout";

import { useSession } from "next-auth/react";
import NestedLayout from "@/layouts/nested-layout";
import TeamSwitcher from "@/components/ui/team-switcher";
import { DatePicker } from "@/components/ui/date-picker";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage: NextPageWithLayout = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Home page" />
      </Head>

      <div className="flex items-center border-b px-4 py-2">
        <DatePicker />
        <div className="ml-auto">
          <TeamSwitcher />
        </div>
      </div>
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => {
  return (
    <RootLayout>
      <NestedLayout>{page}</NestedLayout>
    </RootLayout>
  );
};

export default HomePage;
