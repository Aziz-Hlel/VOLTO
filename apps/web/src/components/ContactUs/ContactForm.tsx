import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Spinner } from "../ui/spinner";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { toast } from "sonner";
import { PhoneInput } from "../ui/phone-input";

const contactSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  phoneNumber: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type formData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const form = useForm<formData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { mutateAsync } = useMutation({
    mutationKey: ["contact-us"],
    mutationFn: async (data: formData) => axiosInstance.post("/contact", data),
    onSuccess: () => {
      form.reset();
      toast.success("Message sent successfully!", { description: "We will get back to you soon." });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again later.");
    },
  });
  const onSubmit = async (data: formData) => {
    await mutateAsync(data);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-black via-gray-900 to-yellow-600">
      {/* Animated points */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full opacity-40`}
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float-${i % 3} ${2 + Math.random() * 4}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Form container */}
      <div className="relative z-10 w-full sm:max-w-md bg-black/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 text-white mt-10">
        <div className="text-center pb-4">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Contact Us</h1>
          <p className="text-gray-300 text-sm">
            We’d love to hear from you! Fill in the form below.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-1 focus-visible:ring-yellow-500 outline-none transition-all"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-1 focus-visible:ring-yellow-500 outline-none transition-all"
                      {...field}
                    />
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
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-1 focus-visible:ring-yellow-500 outline-none transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput placeholder="Phone Number" {...field} defaultCountry="BH" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Subject"
                      className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-1 focus-visible:ring-yellow-500 outline-none transition-all"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      className="w-full min-h-28 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-1 focus-visible:ring-yellow-500 outline-none "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-3">
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow transition-all"
              >
                {isSubmitting ? <Spinner /> : <span>Send ➤</span>}
              </button>
              <button
                type="reset"
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all"
                onClick={() => form.reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </Form>
      </div>

      {/* Custom animations for points */}
    </div>
  );
};

export default ContactForm;
