import { Gender } from "@/types/enums/Gender";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Link } from "react-router-dom";
import ImageUpload from "../events/ImageUpload";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "../ui/button";
import type { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import accountService from "@/Api/services/account.service";
import { toast } from "sonner";
import { useState } from "react";
import ChangePassword from "./ChangePassword";

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phoneNumber: z.string().optional(),
  gender: z.enum(Object.values(Gender)),
  avatar: z
    .object({
      s3Key: z.string().min(1),
      url: z.string(),
    })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

const EditAccount = ({ me }: { me: User }) => {
  const formDefaultValue: FormData | undefined = {
    firstName: me.firstName,
    lastName: me.lastName,
    email: me.email,
    phoneNumber: me.phoneNumber ?? undefined,
    gender: me.gender,
    avatar: me.avatar ?? undefined,
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue,
  });

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: accountService.update,
    onSuccess: async () => {
      toast.success("Profile updated successfully.");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      await queryClient.refetchQueries({ queryKey: ["auth"] });
    },
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await mutateAsync(data);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  const [openChangePassword, setOpenChangePassword] = useState(false);
  console.log("openchangepass", openChangePassword);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-8">
          Edit Profile
        </h2>
        {openChangePassword && <ChangePassword closeDrawer={() => setOpenChangePassword(false)} />}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormDescription>Type the staff first name</FormDescription>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormDescription>Type the staff last name</FormDescription>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormDescription>Staff email</FormDescription>
                  <FormControl>
                    <Input placeholder="john.doe@volto.com" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone & Gender */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      {/* <Input placeholder="+973 12345678" {...field} /> */}
                      <PhoneInput placeholder="Placeholder" {...field} defaultCountry="BH" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4 mt-2"
                      >
                        {Object.entries(Gender).map(([label, value]) => (
                          <FormItem key={value} className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-medium">{label}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            {/* Avatar */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">Avatar</div>
              <ImageUpload
                imgKeyFieldName="avatar.s3Key"
                imgUrlFieldName="avatar.url"
                entityType="USER"
                imgPurpose="AVATAR"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
              <Link to="..">
                <Button
                  variant="ghost"
                  className="w-full cursor-pointer sm:w-auto border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                variant="link"
                className="w-fit cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenChangePassword(true);
                }}
              >
                Change Password
              </Button>
              <Button
                type="submit"
                className="w-full cursor-pointer sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md"
              >
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditAccount;
