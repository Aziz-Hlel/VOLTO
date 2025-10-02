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
                  <span className="text-sm text-red-500">
                    {form.formState.errors.root?.message}
                  </span>
                </div>
              </form>
            </Form>
            <div className=" space-y-4">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">Contact Us</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <a href="tel:+97334588466">
                  <Button variant="outline" type="button" className="w-full cursor-pointer ">
                    <Phone />
                    <span className="sr-only">Call Us</span>
                  </Button>
                </a>

                <a href="https://www.instagram.com/voltobahrain" target="_blank" rel="noreferrer">
                  <Button variant="outline" type="button" className="w-full cursor-pointer ">
                    <Instagram />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </a>

                <a href="https://wa.me/+97334588466" target="_blank" rel="noreferrer">
                  <Button variant="outline" type="button" className="w-full cursor-pointer ">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.50002 12C3.50002 7.30558 7.3056 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C10.3278 20.5 8.77127 20.0182 7.45798 19.1861C7.21357 19.0313 6.91408 18.9899 6.63684 19.0726L3.75769 19.9319L4.84173 17.3953C4.96986 17.0955 4.94379 16.7521 4.77187 16.4751C3.9657 15.176 3.50002 13.6439 3.50002 12ZM12 1.5C6.20103 1.5 1.50002 6.20101 1.50002 12C1.50002 13.8381 1.97316 15.5683 2.80465 17.0727L1.08047 21.107C0.928048 21.4637 0.99561 21.8763 1.25382 22.1657C1.51203 22.4552 1.91432 22.5692 2.28599 22.4582L6.78541 21.1155C8.32245 21.9965 10.1037 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5ZM14.2925 14.1824L12.9783 15.1081C12.3628 14.7575 11.6823 14.2681 10.9997 13.5855C10.2901 12.8759 9.76402 12.1433 9.37612 11.4713L10.2113 10.7624C10.5697 10.4582 10.6678 9.94533 10.447 9.53028L9.38284 7.53028C9.23954 7.26097 8.98116 7.0718 8.68115 7.01654C8.38113 6.96129 8.07231 7.046 7.84247 7.24659L7.52696 7.52195C6.76823 8.18414 6.3195 9.2723 6.69141 10.3741C7.07698 11.5163 7.89983 13.314 9.58552 14.9997C11.3991 16.8133 13.2413 17.5275 14.3186 17.8049C15.1866 18.0283 16.008 17.7288 16.5868 17.2572L17.1783 16.7752C17.4313 16.5691 17.5678 16.2524 17.544 15.9269C17.5201 15.6014 17.3389 15.308 17.0585 15.1409L15.3802 14.1409C15.0412 13.939 14.6152 13.9552 14.2925 14.1824Z"
                          fill="#000000"
                        />{" "}
                      </g>
                    </svg>
                    <span className="sr-only">Whatsapp</span>
                  </Button>
                </a>
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
    </div>
  );
}
