import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import { GiCrown, GiDiamondTrophy } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const membershipTerms = [
  "This card cannot be replaced if it is lost, stolen or destroyed.",
  "This card is valid on the dates mentioned on the card only.",
  "This card is not transferrable or redeemable for cash.",
  "Reproduction of this card is illegal and will face legal action.",
  "This card is the card owner responsibility if it is lost, damaged or used by another person, the card owner has no clams on the restaurant.",
  "Management reserve the right, without the refund of this card price, to refuse admission or to eject any person who fails to comply with the rules of the restaurant and the government laws.",
  "Card user assumes all risks of personal injury incidental to the venue, whether occurring prior to, during, or subsequent to the venue.",
  "The management are not responsible for any damage/loss for any personal belongings.",
  "If this card is lost inform management immediately.",
  "Owner of this card must show the original card to place orders, copy and pictures of this card on mobiles are not acceptable.",
  "If the restaurant closed or stopped operations extra days will be added to the card.",
  "Cocktail and dining tables are exclusively reserved for couples. Regular Members enjoy bar access, while VIP tables may be reserved subject to availability and applicable minimum spend requirements.",
  "Elegant Smart Casual attire is required at all times. Sportswear, shorts, caps, flip-flops, and excessively casual clothing are not permitted.",
  "Reservations are guaranteed for 15 minutes from the confirmed booking time.",
  "This card allowed admission to the card owner only — no extra gents.",
  "The member agrees to follow the rules and regulations of VOLTO Restaurant. If the member causes any issue or a problem in the restaurant with any other guests or any employee, the restaurant has the right to cancel the membership without any refund and the member has no claim on the restaurant or management.",
  "Based on the history of the member the Management have right not to renew any member membership.",
  "The member will have a credit of 600 BHD to be utilized in VOLTO Restaurant during the working hours and it's valid for 1 month only. If the membership is expired and there's still balance, this amount is not refundable and not transferable or extendable even after renewing your membership.",
];

const vipTerms = [
  "This card cannot be replaced if it is lost, stolen or destroyed.",
  "This card is valid on the dates mentioned on the card only.",
  "This card is not transferrable or redeemable for cash.",
  "Reproduction of this card is illegal and will face legal action.",
  "This card is the card owner responsibility if it is lost, damaged or used by another person, the card owner has no clams on the restaurant.",
  "Management reserve the right, without the refund of this card price, to refuse admission or to eject any person who fails to comply with the rules of the restaurant and the government laws.",
  "Card user assumes all risks of personal injury incidental to the venue, whether occurring prior to, during, or subsequent to the venue.",
  "The management are not responsible for any damage/loss for any personal belongings.",
  "If this card is lost inform management immediately.",
  "Owner of this card must show the original card to place orders, copy and pictures of this card on mobiles are not acceptable.",
  "If the restaurant closed or stopped operations extra days will be added to the card.",
  "Cocktail tables, dining tables and VIP tables may be reserved subject to availability and applicable minimum spend requirements.",
  "Elegant Smart Casual attire is required at all times. Sportswear, shorts, caps, flip-flops, and excessively casual clothing are not permitted.",
  "Reservations are guaranteed for 15 minutes from the confirmed booking time.",
  "This card allowed admission to the card owner plus 2 extra gents.",
  "Based on the history of the member the Management have right not to renew any member membership.",
  "The member will have a credit of 2,000 BHD to be utilized in VOLTO Restaurant during the working hours and it's valid for 1 month only. If the membership is expired and there's still balance, this amount is not refundable and not transferable or extendable even after renewing your membership.",
  "The member and his guests agree to follow the rules and regulations of VOLTO Restaurant. If the member or his guests cause any issue or a problem in the restaurant such as with other guests or with any employee, the restaurant has the right to cancel the membership without any refund and the member has no claim on the restaurant or management.",
];

const differenceItems = [
  "Exclusive member access and priority privileges",
  "Seamless reservations and premium hospitality",
  "Access to exceptional dining and entertainment experiences",
  "Preferred seating opportunities",
  "A membership designed for those who appreciate luxury, exclusivity, and unforgettable moments",
];

// ─── Terms Accordion ─────────────────────────────────────────────────────────

function TermsAccordion({
  terms,
  accentColor,
}: {
  terms: string[];
  accentColor: "yellow" | "amber";
}) {
  const [open, setOpen] = useState(false);
  const borderClass = accentColor === "yellow" ? "border-yellow-500/40" : "border-amber-400/40";
  const textClass = accentColor === "yellow" ? "text-yellow-400" : "text-amber-300";

  return (
    <div className={`rounded-xl border ${borderClass} overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-900/60 hover:bg-gray-800/80 transition-colors duration-200"
      >
        <span className={`font-semibold text-sm tracking-widest uppercase ${textClass}`}>
          Terms &amp; Conditions
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <FaChevronDown className={`${textClass} text-xs`} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="terms"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ol className="px-5 py-4 space-y-2 bg-black/30">
              {terms.map((t, i) => (
                <li key={i} className="flex gap-3 text-gray-400 text-sm leading-relaxed">
                  <span className={`shrink-0 font-bold ${textClass}`}>{i + 1}.</span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const Membership = () => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
    }),
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-black via-gray-950 to-black text-white overflow-hidden">
      {/* Decorative particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-400 rounded-full opacity-20"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        {/* ══ Hero Header ══════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <p className="text-yellow-500 tracking-[0.35em] text-xs sm:text-sm font-semibold uppercase mb-4">
            VOLTO MEMBERSHIP COLLECTION
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-linear-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              A World Reserved
            </span>
            <br />
            <span className="text-white">for the Exceptional</span>
          </h1>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6" />
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Welcome to the VOLTO Membership Collection — an exclusive program crafted for guests who
            appreciate refined dining, elevated nightlife, and privileged access. Designed to
            complement a sophisticated lifestyle, membership grants you access to exceptional
            experiences, priority reservations, and exclusive privileges reserved for our most
            valued guests.
          </p>
        </motion.div>

        {/* ══ Section Label ════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Membership Options</h2>
          <p className="text-gray-500 text-sm">Choose the tier that suits your lifestyle</p>
        </motion.div>

        {/* ══ Pricing Cards ════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* Standard Membership Card */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-black/90 backdrop-blur-md border border-yellow-600/30 rounded-3xl p-8 shadow-2xl shadow-yellow-900/20 flex flex-col"
          >
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-yellow-600/5 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-yellow-500 tracking-widest text-xs font-semibold uppercase mb-1">
                  Membership
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Standard</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
                <GiCrown className="text-yellow-400 text-xl" />
              </div>
            </div>

            {/* Pricing table */}
            <div className="rounded-xl border border-yellow-600/20 overflow-hidden mb-2">
              <div className="grid grid-cols-2 bg-gray-900/80 px-4 py-2.5 text-xs font-semibold tracking-widest uppercase text-gray-500">
                <span>Plan</span>
                <span className="text-right">Price</span>
              </div>
              <div className="grid grid-cols-2 items-center px-4 py-4 bg-black/50">
                <span className="text-white font-medium">Monthly</span>
                <div className="text-right">
                  <span className="text-yellow-400 text-xl font-bold">600 BHD</span>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-6 italic">
              * Price inclusive of tax and service charge
            </p>

            {/* Privileges */}
            <div className="mb-6">
              <p className="text-yellow-500 text-xs tracking-widest uppercase font-semibold mb-3">
                Membership Privileges
              </p>
              <ul className="space-y-3">
                {[
                  "Access to Volto's exclusive atmosphere and entertainment experiences",
                  "Priority reservation service",
                  "Personalized hospitality from the VOLTO team",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                  >
                    <FaCheck className="text-yellow-400 shrink-0 mt-0.5 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms */}
            <div className="mb-8">
              <TermsAccordion terms={membershipTerms} accentColor="yellow" />
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button
                onClick={() => navigate("/membership/registration")}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 font-bold text-sm tracking-wide shadow-lg shadow-yellow-500/20 transition-all duration-300 hover:shadow-yellow-400/30 hover:scale-[1.02]"
              >
                Apply for Membership
              </button>
            </div>
          </motion.div>

          {/* VIP Membership Card */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative bg-black/90 backdrop-blur-md border border-amber-400/40 rounded-3xl p-8 shadow-2xl shadow-amber-900/30 flex flex-col"
          >
            <div className="absolute inset-0 rounded-3xl  bg-linear-to-brfrom-amber-500/10 via-yellow-600/5 to-transparent pointer-events-none" />

            {/* Most exclusive badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-linear-to-r from-yellow-500 to-amber-400 text-gray-900 text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full shadow-lg shadow-yellow-500/30">
                ✦ Most Exclusive
              </span>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-6 mt-2">
              <div>
                <p className="text-amber-400 tracking-widest text-xs font-semibold uppercase mb-1">
                  VIP Membership
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">VIP</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                <GiDiamondTrophy className="text-amber-300 text-xl" />
              </div>
            </div>

            {/* Price */}
            <div className="rounded-xl border border-amber-400/20 bg-black/50 px-6 py-5 mb-2 text-center">
              <p className="text-gray-500 text-xs tracking-widest uppercase mb-2">
                Membership Price
              </p>
              <div className="flex items-end justify-center gap-2">
                <span className="text-amber-300 text-4xl font-extrabold">BHD 2,000</span>
                <span className="text-gray-400 text-sm mb-1">/ month</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs mb-6 italic">
              * Price inclusive of tax and service charge
            </p>

            {/* Privileges */}
            <div className="mb-6">
              <p className="text-amber-400 text-xs tracking-widest uppercase font-semibold mb-3">
                VIP Privileges
              </p>
              <ul className="space-y-3">
                {[
                  "Priority access to all table categories, subject to availability",
                  "Preferred seating and reservation priority",
                  "Access to VIP and premium seating experiences",
                  "VIP personalized reservation assistance",
                  "Recognition as a VIP member of VOLTO's most exclusive tier",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                  >
                    <FaCheck className="text-amber-400 shrink-0 mt-0.5 text-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Terms */}
            <div className="mb-8">
              <TermsAccordion terms={vipTerms} accentColor="amber" />
            </div>

            {/* CTA */}
            <div className="mt-auto">
              <button
                onClick={() => navigate("/membership/registration")}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-gray-900 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-amber-400/40 hover:scale-[1.02]"
              >
                Apply for VIP Membership
              </button>
            </div>
          </motion.div>
        </div>

        {/* ══ The VOLTO Difference ═════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative bg-black/80 backdrop-blur-md border border-yellow-600/20 rounded-3xl p-10 shadow-2xl text-center"
        >
          <div className="absolute inset-0 rounded-3xl  from-yellow-600/5 to-transparent pointer-events-none" />

          <p className="text-yellow-500 tracking-[0.35em] text-xs font-semibold uppercase mb-3">
            The VOLTO Difference
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Why Choose VOLTO Membership?
          </h2>

          <ul className="space-y-4 max-w-xl mx-auto mb-10 text-left">
            {differenceItems.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
              >
                <FaCheck className="text-yellow-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>

          <div className="w-24 h-px bg-linear-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-8" />

          <p className="text-yellow-500 tracking-[0.3em] text-xs font-semibold uppercase mb-2">
            VOLTO MEMBERSHIP
          </p>
          <p className="text-white text-xl sm:text-2xl font-bold italic tracking-wide">
            More Than a Membership. A Lifestyle.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;
