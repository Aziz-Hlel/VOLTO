import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import type { ApiResponse } from "@/Api/apiService";
import { useQueryClient } from "@tanstack/react-query";
import { Gender } from "@/types/enums/Gender";
import { Tier } from "@/types/enums/Tier";
import { Roles } from "@/types/enums/Roles";
import type { StaffResponseDto } from "@/types/staff/StaffResponseDto";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import ImageUpload from "./ImageUpload";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import staffService from "@/Api/services/staff.service";
import { ChevronsUpDown } from "lucide-react";
import { PhoneInput } from "../ui/phone-input";
import { produce } from "immer";

const formSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    role: z.enum(Object.values(Roles)),
    phoneNumber: z.string().optional(),
    gender: z.enum(Object.values(Gender)),
    tier: z.enum(Object.values(Tier)),
    avatar: z
      .object({
        s3Key: z.string().min(1),
        url: z.string(),
      })
      .optional(),
    password: z.string().min(8).optional(),
    confirmPassword: z.string().min(8).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function StaffAddForm({ staff }: { staff: StaffResponseDto | undefined }) {
  const editMode = !!staff;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formDefaultValue: FormData | undefined = staff
    ? {
        firstName: staff.firstName,
        lastName: staff.lastName,
        email: staff.email,
        role: staff.role,
        phoneNumber: staff.phoneNumber ?? undefined,
        gender: staff.gender,
        tier: staff.tier,
        avatar: staff.avatar ?? undefined,
        password: undefined,
        confirmPassword: undefined,
      }
    : {
        firstName: "",
        lastName: "",
        email: "",
        role: "WAITER",
        phoneNumber: "",
        gender: "M",
        tier: "GOLD",
        avatar: undefined,
        password: "",
        confirmPassword: "",
      };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue,
  });

  const onSubmit = async (values: FormData) => {
    const payload = produce(values, (payload) => {
      payload.phoneNumber === "" && delete payload.phoneNumber;
      delete payload.confirmPassword;
    });

    try {
      const response: ApiResponse<StaffResponseDto> = editMode
        ? await staffService.update(staff!.id, payload)
        : await staffService.create(payload);

      if (response.success) {
        toast.success(editMode ? "Staff Updated successfully" : "Staff Created successfully");
        queryClient.invalidateQueries({ queryKey: ["staff"], exact: false });
        navigate("..");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Failed to submit the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent mb-8">
          {editMode ? "Edit Staff" : "Add New Staff"}
        </h2>

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
                    <Input placeholder="john.doe@volto.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Passwords */}
            {!editMode && (
              <>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter password" {...field} />
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
                        <Input type="password" placeholder="Repeat password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className="w-[200px] justify-between">
                          {field.value || "Select Role..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandGroup>
                          {Object.keys(Roles).map((roleKey) =>
                            roleKey === "SUPER_ADMIN" || roleKey === "USER" ? null : (
                              <CommandItem
                                key={roleKey}
                                value={Roles[roleKey as keyof typeof Roles]}
                                onSelect={() => field.onChange(roleKey)}
                              >
                                {roleKey}
                              </CommandItem>
                            ),
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
              <FormField
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
              />
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
                  className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md"
              >
                {editMode ? "Update Staff" : "Create Staff"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
