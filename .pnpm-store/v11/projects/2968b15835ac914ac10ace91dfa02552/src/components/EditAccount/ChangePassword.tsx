import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import z from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import accountService from "@/Api/services/account.service";
import { toast } from "sonner";
import { DialogTitle } from "../ui/dialog";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

const ChangePassword = ({ closeDrawer }: { closeDrawer: () => void }) => {
  type ProfileFormData = z.infer<typeof changePasswordSchema>;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { mutateAsync } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: accountService.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully");
      closeDrawer();
    },
    onError: (error: any) => {
      toast.error(`Error changing password: ${error.message || "Unknown error"}`);
    },
  });
  const onSubmit = async (data: ProfileFormData) => {
    await mutateAsync({
      password: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <Drawer open={true} onOpenChange={() => closeDrawer()}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DialogTitle className="text-3xl">Change Password</DialogTitle>
      <DrawerContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
            <div className=" w-full flex items-center justify-center">
              <div className="space-y-4 w-fit">
                <h3 className="text-3xl font-medium text-center">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">Current Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter current password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">New Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-center">Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Confirm new password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DrawerFooter className=" items-center">
              <Button className="w-fit hover:cursor-pointer">Submit</Button>
              <DrawerClose>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    closeDrawer();
                  }}
                >
                  Return
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default ChangePassword;
