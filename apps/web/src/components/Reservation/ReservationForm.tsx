import { useState, useEffect, useRef } from "react";
import { GiCrown } from "react-icons/gi";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { PhoneInput } from "../ui/phone-input";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import axiosInstance from "@/api/axiosInstance";

const reservationSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number must be at least 8 digits"),
  nbrGuests: z.object({
    men: z.number().default(0),
    women: z.number().default(0),
  }),
  isVip: z.boolean().default(false),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date",
  }),
});

type IForm = z.infer<typeof reservationSchema>;

const ReservationForm = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      firstName: "",
      email: "",
      phoneNumber: "",
      nbrGuests: { men: 0, women: 0 },
      isVip: false,
      date: new Date().toISOString(),
    },
  });

  const { setValue, watch } = form;
  const isVip = watch("isVip");

  const menGuests = watch("nbrGuests").men;
  const womenGuests = watch("nbrGuests").women;
  const totalGuests = menGuests + womenGuests;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { mutateAsync } = useMutation({
    mutationKey: ["create-reservation"],
    mutationFn: async (data: IForm) => await axiosInstance.post("/reservation", data),
    onSuccess: () => {
      toast("Reservation created successfully!", {
        description:
          "We’ve received your reservation request. A member of Volto team will be in touch with you shortly to confirm the details..",
      });
      form.reset();
    },
    onError: (error) => {
      console.error("Error creating reservation:", error);
      toast.error("Failed to create reservation. Please try again.");
    },
  });

  const onSubmit = async (data: IForm) => {
    await mutateAsync(data);
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-black via-gray-900 to-yellow-600">
      {/* Points lumineux décoratifs */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Formulaire avec margin top */}
      <div className="relative z-10 w-full sm:max-w-md bg-black/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 text-white mt-24">
        <div className="text-center pb-4">
          <div className="text-center pb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-3 text-yellow-400 drop-shadow-md">
              Reservation
            </h1>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              Fill in the form below to reserve your spot and enjoy an unforgettable experience.
            </p>
          </div>
        </div>

        {/* ✅ Espacement augmenté ici */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Nom, email, téléphone */}
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="First Name"
                        {...field}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700  focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 outline-none transition-all"
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
                        placeholder="Last Name"
                        {...field}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700  focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 outline-none transition-all"
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
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus-visible:border-yellow-500 focus-visible:ring-2 focus-visible:ring-yellow-500 outline-none transition-all"
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
            </div>

            {/* Date + Guests */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <div className="flex-1 w-full">
                <input
                  type="date"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                  onChange={(e) => setValue("date", e.target.value)}
                />

                {/* <Calendar22 />*/}
              </div>

              {/* Guests Drop-Up */}
              <div className="flex-1 flex justify-center sm:justify-end w-full">
                <div ref={dropdownRef} className="relative flex flex-col w-full">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 border border-yellow-500 text-yellow-400 hover:bg-gray-700 hover:border-yellow-400 hover:text-yellow-300 transition-all duration-300 shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <span>{totalGuests > 0 ? `${totalGuests} Guests` : "Select Guests"}</span>
                    </div>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-full mb-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-3 z-50"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-white text-sm">Men</label>
                          <select
                            value={menGuests}
                            onChange={(e) => setValue("nbrGuests.men", Number(e.target.value))}
                            className="w-16 text-sm px-2 py-1 rounded-lg bg-gray-800 border border-gray-700 text-white text-center"
                          >
                            {Array.from({ length: 11 }).map((_, i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex justify-between items-center">
                          <label className="text-white text-sm">Women</label>
                          <select
                            value={womenGuests}
                            onChange={(e) => setValue("nbrGuests.women", Number(e.target.value))}
                            className="w-16 text-sm px-2 py-1 rounded-lg bg-gray-800 border border-gray-700 text-white text-center"
                          >
                            {Array.from({ length: 11 }).map((_, i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* VIP Section sans animation */}
            <div
              onClick={() => setValue("isVip", !isVip)}
              className={`w-full flex items-center justify-between gap-3 p-4 rounded-lg cursor-pointer border transition-all duration-300
              ${
                isVip
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black border-yellow-400 shadow-lg shadow-yellow-400/40"
                  : "bg-gray-800 text-white border-gray-700 hover:bg-gray-700 hover:border-yellow-400"
              }`}
            >
              <div className="flex flex-col text-left">
                <span className="text-base font-semibold">
                  {isVip ? "VIP Reservation Activated" : "Become VIP"}
                </span>
                <span className={`text-sm ${isVip ? "text-black/80" : "text-gray-400"}`}>
                  Access exclusive tables & premium service
                </span>
              </div>

              <GiCrown
                className={`w-6 h-6 ${isVip ? "text-white drop-shadow-[0_0_5px_gold]" : "text-yellow-400"}`}
              />
            </div>

            {/* Dress Code */}
            <div className="text-center text-gray-300 text-sm bg-gray-800/60 border border-gray-700 rounded-xl py-4 px-5 my-4">
              <p className="text-yellow-400 font-semibold mb-1">Dress Code : Smart casual</p>
              <p>No shorts and no open shoes</p>
              <p className="mt-1 font-medium">Age Required - 21+</p>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-gray-900 font-semibold py-2 px-5 rounded-lg shadow transition-all"
              >
                {form.formState.isSubmitting ? <Spinner /> : <span>Send ➤</span>}
              </button>
              <button
                type="reset"
                onClick={() => form.reset()}
                className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all"
              >
                Reset
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ReservationForm;
