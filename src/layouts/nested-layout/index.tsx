import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  CircleDashed,
  CircleDotDashed,
  GripVertical,
  Inbox,
  MoreHorizontal,
  Plus,
} from "lucide-react";

interface NestedLayoutProps {
  children: React.ReactNode;
}

export default function NestedLayout({ children }: NestedLayoutProps) {
  return (
    <div className="flex h-full flex-1">
      <SideBar />
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SideBar() {
  return (
    <div className="w-[26rem] space-y-8 border-r pl-2 pr-4 pt-10">
      {["Inbox", "Today", "Tomorrow"].map((title, i) => {
        return (
          <div className="group flex items-center px-4">
            <GripVertical
              size={17}
              className="mr-2 cursor-grab text-slate-500 opacity-0 transition-all group-hover:opacity-100"
            />
            <div className="flex w-full items-center border-b p-2" key={i}>
              <div className="flex cursor-pointer items-center">
                {i === 0 ? (
                  <Inbox size={17} className="mr-2 text-slate-500" />
                ) : (
                  <CircleDashed size={17} className="mr-2 text-slate-500" />
                )}
                <p className="text-sm">{title}</p>
              </div>

              <div className="ml-auto flex items-center">
                {i !== 0 ? (
                  <>
                    <TodoDialog />
                    <Button variant={"ghost"} size={"sm"}>
                      <MoreHorizontal size={14} className="text-slate-600" />
                    </Button>
                  </>
                ) : (
                  <TodoDialog />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TodoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Plus size={14} className="text-slate-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Todo</DialogTitle>
          <DialogDescription>
            Create a new todo from here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Your title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="@username" />
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
