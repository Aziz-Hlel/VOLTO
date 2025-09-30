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

const formSchema = z
  .object({
    username: z.string({ message: "Name is required" }).min(1, { error: "Name is required" }),
    email: z.email(),
    role: z.enum(Object.values(Roles)),
    phoneNumber: z
      .string({ message: "Phone number is required" })
      .min(1, { error: "Phone number is required" }),
    gender: z.enum(Object.values(Gender)),
    tier: z.enum(Object.values(Tier)),
    avatar: z
      .object({
        s3Key: z
          .string({ message: "Thumbnail is required" })
          .min(1, { error: "Thumbnail is required" }),
        url: z.string(),
      })
      .optional(),

    password: z
      .string({ message: "Password is required" })
      .min(8, { error: "Password must be at least 8 characters long" })
      .optional(),
    confirmPassword: z
      .string({ message: "Repeat password is required" })
      .min(8, { error: "Password must be at least 8 characters long" })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // error will show under confirmPassword field
  });

type FormData = z.infer<typeof formSchema>;

export default function StaffAddForm({ staff }: { staff: StaffResponseDto | undefined }) {
  const editMode = !!staff;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  console.log("staff : ", staff);

  if (staff?.role === Roles.SUPER_ADMIN) {
    return;
  }
  const formDefaultValue: FormData | undefined = !staff
    ? {
        username: "azaz",
        email: "azza@gmail.com",
        role: "WAITER",
        phoneNumber: "qsdsqd",
        gender: "M",
        tier: "GOLD",
        avatar: undefined,
        password: "12345678",
        confirmPassword: "12345678",
      }
    : {
        username: staff.username,
        email: staff.email,
        role: staff.role,
        phoneNumber: staff.phoneNumber ?? "",
        gender: staff.gender,
        tier: staff.tier,
        avatar: staff.avatar ?? undefined,
        password: undefined,
        confirmPassword: undefined,
      };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue,
  });

  const onSubmit = async (values: FormData) => {
    try {
      console.log("rab om l values : ", values);
      let response: ApiResponse<StaffResponseDto>;

      const { confirmPassword, ...payload } = values;
      console.log("rab om 3orm l payload : ", payload);
      editMode
        ? (response = await staffService.update(staff!.id, payload))
        : (response = await staffService.create(payload));

      if (response.success) {
        if (editMode) toast.success("Staff Updated successfully");
        if (!editMode) toast.success("Staff Created successfully");
        queryClient.invalidateQueries({ queryKey: ["staff"], exact: false });
        navigate("..");
      }

      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  console.log("from errors : ", form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto h-full py-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Username</FormLabel>
              <FormDescription>Type the staff username</FormDescription>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Email</FormLabel>
              <FormDescription>Type the staff email</FormDescription>
              <FormControl>
                <Input placeholder="john.doe@volto.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {editMode === false && (
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
        )}

        {editMode === false && (
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
        )}

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Staff Role</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className="w-[200px] justify-between">
                      {field.value
                        ? Object.values(Roles).find((value) => value === field.value)
                        : "Select Role..."}
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

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff PhoneNumber</FormLabel>
              <FormDescription>Type the staff phoneNumber</FormDescription>
              <FormControl>
                <Input placeholder="+973 12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Gender</FormLabel>
              <FormDescription>Select staff gender</FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {Object.entries(Gender).map((option, index) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">{option[0]}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <ImageUpload
              imgKeyFieldName="avatar.s3Key"
              imgUrlFieldName="avatar.url"
              entityType="USER"
              imgPurpose="AVATAR"
            />
          </div>
        </div>

        <div className=" w-full flex justify-end gap-4">
          <Link to="..">
            <Button type="button" variant="ghost" className=" cursor-pointer">
              Cancel
            </Button>
          </Link>

          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
