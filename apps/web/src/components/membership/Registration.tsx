import axiosInstance from "@/api/axiosInstance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckSquare, FaExclamationTriangle, FaRegSquare, FaTimesCircle } from "react-icons/fa";
import { GiCrown, GiDiamondTrophy } from "react-icons/gi";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Spinner } from "../ui/spinner";

// ─── Schema ───────────────────────────────────────────────────────────────────

const registrationSchema = z.object({
  membershipType: z.enum(["REGULAR", "VIP"], { error: "Please select a membership type" }),
  fullName: z.string({ error: "Full name is required" }).max(255, "Please enter a valid name"),
  cprId: z
    .string({ error: "CPR / ID number is required" })
    .max(255, "Please enter a valid CPR / ID number")
    .optional(),
  nationality: z
    .string({ error: "Nationality is required" })
    .max(255, "Please enter a valid nationality")
    .optional(),
  dateOfBirth: z
    .string()
    .nullable()
    .refine((d) => d === null || !isNaN(Date.parse(d)), {
      message: "Please enter a valid date of birth",
    }),
  mobileNumber: z
    .string({ error: "Mobile number is required" })
    .max(255, "Please enter a valid mobile number")
    .optional(),
  email: z
    .email("Please enter a valid email address")
    .max(255, "Please enter a valid email address"),
  emergencyContactName: z
    .string({ error: "Emergency contact name is required" })
    .max(255, "Please enter a valid name")
    .optional(),
  emergencyContactRelationship: z
    .string({ error: "Relationship is required" })
    .max(255, "Please enter a valid relationship")
    .optional(),
  emergencyContactMobileNumber: z
    .string({ error: "Emergency mobile number is required" })
    .max(255, "Please enter a valid mobile number")
    .optional(),
  declarationAgreed: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to the member declaration" }),
  termsAgreed: z
    .boolean()
    .refine((v) => v === true, { message: "You must acknowledge the Terms & Conditions" }),
});

type IRegistrationForm = z.infer<typeof registrationSchema>;

// ─── Declaration items ────────────────────────────────────────────────────────

const declarationItems = [
  "I have read and understood the Membership Terms & Conditions.",
  "I agree to comply with all restaurant policies, dress codes, reservation requirements, and venue regulations.",
  "I understand that the membership is non-transferable and non-refundable.",
  "I acknowledge that membership credits must be utilized within the validity period and cannot be refunded, transferred, or extended.",
  "I understand that management reserves the right to suspend or terminate membership in accordance with the Membership Terms & Conditions.",
  "I consent to VOLTO contacting me regarding reservations, membership updates, promotions, and exclusive events.",
];

// ─── Reusable field label ─────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1.5">
      {children}
    </label>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-linear-to-r from-yellow-500/50 to-transparent" />
      <h2 className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px flex-1 bg-linear-to-lrom-yellow-500/50 to-transparent" />
    </div>
  );
}

// ─── Shared input classname ───────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:border-yellow-500 outline-none transition-all";

// ─── Main Component ───────────────────────────────────────────────────────────

const MembershipRegistration = () => {
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [memberExitModal, setMemberExitModal] = useState(false);

  const form = useForm<IRegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      membershipType: undefined,
      fullName: "",
      cprId: "",
      nationality: "",
      dateOfBirth: null,
      mobileNumber: "",
      email: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactMobileNumber: "",
      declarationAgreed: false,
      termsAgreed: false,
    },
  });

  const { watch, setValue } = form;
  const membershipType = watch("membershipType");
  const declarationAgreed = watch("declarationAgreed");
  const termsAgreed = watch("termsAgreed");

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["membership-registration"],
    mutationFn: async (data: IRegistrationForm) => await axiosInstance.post("/members/", data),
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = async (data: IRegistrationForm) => {
    try {
      await mutateAsync(data);
      setSuccessModal(true);
      form.reset();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 409) {
        setMemberExitModal(true);
      } else {
        setErrorModal(true);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-r from-black via-gray-900 to-yellow-600 py-24">
      {/* ── Decorative particles ── */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* ── Success Modal ── */}
      {successModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-gray-900 border border-yellow-500/40 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-yellow-900/30"
          >
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-6">
              <GiCrown className="text-yellow-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Application Received</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Thank you for applying to the VOLTO Membership Collection. Our team will review your
              application and contact you shortly.
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-400 hover:opacity-90 text-gray-900 font-bold text-sm tracking-wide transition-all cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── Member Already Exists Modal (409 Conflict) ── */}
      {memberExitModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-gray-900 border border-amber-500/40 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-amber-900/30"
          >
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6">
              <FaExclamationTriangle className="text-amber-400 text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Already Registered</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              An membership or an application for membership with this email address already exists.
              Please verify your VOLTO APP or contact our support team.
            </p>
            <button
              onClick={() => setMemberExitModal(false)}
              className="w-full py-3 rounded-xl bg-linear-to-r from-amber-500 to-amber-400 hover:opacity-90 text-gray-900 font-bold text-sm tracking-wide transition-all cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── General Error Modal ── */}
      {errorModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="bg-gray-900 border border-red-500/40 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl shadow-red-900/30"
          >
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
              <FaTimesCircle className="text-red-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Submission Failed</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Something went wrong while submitting your application. Please check your details and
              try again later.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full py-3 rounded-xl bg-linear-to-r from-red-500 to-red-400 hover:opacity-90 text-white font-bold text-sm tracking-wide transition-all cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ── Form card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-black/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 text-white"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-yellow-500 tracking-[0.3em] text-xs font-semibold uppercase mb-3">
            VOLTO Membership Collection
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-3 text-yellow-400 drop-shadow-md">
            Membership Registration
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            Complete the form below to apply for your exclusive VOLTO membership.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* ══ Membership Type ══════════════════════════════════════════════ */}
            <section>
              <SectionHeading>Membership Type</SectionHeading>
              <FormField
                control={form.control}
                name="membershipType"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Regular */}
                      <button
                        type="button"
                        id="membership-type-regular"
                        onClick={() =>
                          setValue("membershipType", "REGULAR", { shouldValidate: true })
                        }
                        className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer
                          ${
                            membershipType === "REGULAR"
                              ? "bg-linear-to-br from-yellow-500/20 to-yellow-600/10 border-yellow-500 shadow-lg shadow-yellow-500/20"
                              : "bg-gray-800/60 border-gray-700 hover:border-yellow-500/50 hover:bg-gray-800"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors
                          ${membershipType === "REGULAR" ? "bg-yellow-500/20 border border-yellow-500/50" : "bg-gray-700 border border-gray-600"}`}
                        >
                          <GiCrown
                            className={`text-lg ${membershipType === "REGULAR" ? "text-yellow-400" : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm mb-0.5 ${membershipType === "REGULAR" ? "text-yellow-400" : "text-white"}`}
                          >
                            Regular Membership
                          </p>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            BHD 600 Monthly Credit
                          </p>
                        </div>
                        {membershipType === "REGULAR" && (
                          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_2px_rgba(234,179,8,0.5)]" />
                        )}
                      </button>

                      {/* VIP */}
                      <button
                        type="button"
                        id="membership-type-vip"
                        onClick={() => setValue("membershipType", "VIP", { shouldValidate: true })}
                        className={`relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer
                          ${
                            membershipType === "VIP"
                              ? "bg-linear-to-br from-amber-500/20 to-amber-600/10 border-amber-400 shadow-lg shadow-amber-500/20"
                              : "bg-gray-800/60 border-gray-700 hover:border-amber-400/50 hover:bg-gray-800"
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors
                          ${membershipType === "VIP" ? "bg-amber-500/20 border border-amber-400/50" : "bg-gray-700 border border-gray-600"}`}
                        >
                          <GiDiamondTrophy
                            className={`text-lg ${membershipType === "VIP" ? "text-amber-300" : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <p
                            className={`font-bold text-sm mb-0.5 ${membershipType === "VIP" ? "text-amber-300" : "text-white"}`}
                          >
                            VIP Membership
                          </p>
                          <p className="text-gray-400 text-xs leading-relaxed">
                            BHD 2,000 Monthly Credit
                          </p>
                        </div>
                        {membershipType === "VIP" && (
                          <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_6px_2px_rgba(252,211,77,0.5)]" />
                        )}
                      </button>
                    </div>
                    <FormMessage className="mt-2 text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </section>

            {/* ══ Personal Information ═════════════════════════════════════════ */}
            <section>
              <SectionHeading>Personal Information</SectionHeading>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className=" col-span-2">
                        <FieldLabel>Full Name</FieldLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className=" col-span-2">
                        <FieldLabel>Email Address</FieldLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <p className="text-gray-500 text-xs mt-1 italic">
                          Use the email you registered with on the VOLTO app
                        </p>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="cprId"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>CPR / ID Number</FieldLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter CPR / ID number"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>Nationality</FieldLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your nationality"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>Date of Birth</FieldLabel>
                        <FormControl>
                          <input
                            type="date"
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(e.target.value ? e.target.value : null)
                            }
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            className={`${inputCls} scheme-dark`}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>Mobile Number</FieldLabel>
                        <FormControl>
                          <PhoneInput placeholder="Mobile number" {...field} defaultCountry="BH" />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>

            {/* ══ Emergency Contact ════════════════════════════════════════════ */}
            <section>
              <SectionHeading>Emergency Contact</SectionHeading>
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="emergencyContactName"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>Name</FieldLabel>
                        <FormControl>
                          <Input
                            placeholder="Emergency contact name"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emergencyContactRelationship"
                    render={({ field }) => (
                      <FormItem>
                        <FieldLabel>Relationship</FieldLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Spouse, Parent, Friend"
                            {...field}
                            className={inputCls}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="emergencyContactMobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FieldLabel>Mobile Number</FieldLabel>
                      <FormControl>
                        <PhoneInput
                          placeholder="Emergency mobile number"
                          {...field}
                          defaultCountry="BH"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ══ Member Declaration ═══════════════════════════════════════════ */}
            <section>
              <SectionHeading>Member Declaration</SectionHeading>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-5 mb-4">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  I hereby apply for membership in VOLTO Restaurant and confirm that:
                </p>
                <ul className="space-y-3 mb-5">
                  {declarationItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                    >
                      <span className="text-yellow-500 shrink-0 mt-0.5 font-bold text-xs">
                        {i + 1}.
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <FormField
                  control={form.control}
                  name="declarationAgreed"
                  render={() => (
                    <FormItem>
                      <button
                        type="button"
                        id="declaration-agreed"
                        onClick={() =>
                          setValue("declarationAgreed", !declarationAgreed, {
                            shouldValidate: true,
                          })
                        }
                        className="flex items-center gap-3 group"
                      >
                        {declarationAgreed ? (
                          <FaCheckSquare className="text-yellow-400 text-xl shrink-0" />
                        ) : (
                          <FaRegSquare className="text-gray-500 text-xl shrink-0 group-hover:text-gray-300 transition-colors" />
                        )}
                        <span
                          className={`text-sm font-medium ${declarationAgreed ? "text-yellow-400" : "text-gray-400"}`}
                        >
                          I agree to all of the above declarations
                        </span>
                      </button>
                      <FormMessage className="text-red-400 text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ══ T&C Acknowledgement ══════════════════════════════════════════ */}
            <section>
              <SectionHeading>Terms &amp; Conditions Acknowledgement</SectionHeading>
              <div className="bg-gray-900/60 border border-gray-700 rounded-2xl p-5">
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  I confirm that I have received, read, and accepted the complete VOLTO Membership
                  Terms &amp; Conditions.
                </p>
                <FormField
                  control={form.control}
                  name="termsAgreed"
                  render={() => (
                    <FormItem>
                      <button
                        type="button"
                        id="terms-agreed"
                        onClick={() =>
                          setValue("termsAgreed", !termsAgreed, { shouldValidate: true })
                        }
                        className="flex items-center gap-3 group"
                      >
                        {termsAgreed ? (
                          <FaCheckSquare className="text-yellow-400 text-xl shrink-0" />
                        ) : (
                          <FaRegSquare className="text-gray-500 text-xl shrink-0 group-hover:text-gray-300 transition-colors" />
                        )}
                        <span
                          className={`text-sm font-medium ${termsAgreed ? "text-yellow-400" : "text-gray-400"}`}
                        >
                          I acknowledge and accept the VOLTO Membership Terms &amp; Conditions
                        </span>
                      </button>
                      <FormMessage className="text-red-400 text-xs mt-2" />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            {/* ══ Actions ══════════════════════════════════════════════════════ */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                id="submit-registration"
                disabled={isPending}
                className="flex-1 py-3.5 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 disabled:opacity-60 text-gray-900 font-bold text-sm tracking-wide shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:scale-[1.02]"
              >
                {isPending ? <Spinner /> : "Submit Application ➤"}
              </button>
              <button
                type="reset"
                id="reset-registration"
                onClick={() => form.reset()}
                className="flex-1 sm:flex-none sm:px-8 py-3.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm tracking-wide transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </Form>
      </motion.div>
    </div>
  );
};

export default MembershipRegistration;
