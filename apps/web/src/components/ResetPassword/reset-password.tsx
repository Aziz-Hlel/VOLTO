import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigate, useSearchParams } from "react-router-dom";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import resetPassowrdService from "@/api/service/reset-password";
import { Phone, Instagram } from "lucide-react";
import ResetPasswordSuccesfulLayout from "./Success";
import { useState } from "react";

const formSchema = z
  .object({
    newPassword: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" }),
    confirmPassword: z
      .string({ message: "Repeat password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(32, { message: "Password must be at most 32 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type formType = z.infer<typeof formSchema>;

type IresetPasswordResponse = { success: false } | { success: true; email: string };

export function ResetPassword() {
  const [searchParams] = useSearchParams();

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const token = searchParams.get("token");

  const [resetPasswordResponse, setResetPasswordResponse] = useState<IresetPasswordResponse>({
    success: false,
  });

  if (!token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (values: formType) => {
    const { confirmPassword, ...rest } = values;

    const payload = {
      token,
      ...rest,
    };

    const response = await resetPassowrdService.confirm(payload);

    if (response.success) {
      setResetPasswordResponse({ success: true, email: response.data.email });
    }

    if (!response.success) {
      form.setError("root", {
        message: "Invalid token",
      });
    }

    response.success;
  };

  return (
    <div className={cn(" mx-auto my-auto flex flex-col gap-6")}>
      {/* <Outlet /> */}
      {resetPasswordResponse.success && (
        <ResetPasswordSuccesfulLayout email={resetPasswordResponse.email} />
      )}
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <div className=" flex flex-col p-6 md:p-8 space-y-4">
            <Form {...form}>
              <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-muted-foreground text-balance">
                      Enter your new password to reset your password.
                    </p>
                  </div>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
            <div className=" space-y-4">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">Contact Us</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <Phone />
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <Instagram />
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/volto.with.name.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
