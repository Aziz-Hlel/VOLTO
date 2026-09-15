import { membershipApplicationService } from "@/Api/services/membership.service";
import { Button } from "@/components/ui/button";
import { membershipStatus, membershipType } from "@/types/enums/enums";
import type { MemberResponse, MembershipApplication } from "@/types/member/Membership";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  Crown,
  Eye,
  Hash,
  History,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Shield,
  Star,
  User,
  UserCheck,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApproveMembershipCard from "./approve-membership-card";

// ── Helpers ───────────────────────────────────────────────────────────────────

const fmt = (dateStr: string | null | undefined) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const fmtDateTime = (dateStr: string | null | undefined) => {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ── Status & type configs ─────────────────────────────────────────────────────

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  [membershipStatus.APPROVED]: {
    label: "Approved",
    color:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  },
  [membershipStatus.PENDING]: {
    label: "Pending",
    color:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  },
  [membershipStatus.REJECTED]: {
    label: "Rejected",
    color:
      "bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
  },
  [membershipStatus.SUSPENDED]: {
    label: "Suspended",
    color:
      "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
  },
  [membershipStatus.EXPIRED]: {
    label: "Expired",
    color:
      "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-500/10 dark:text-gray-400 dark:border-gray-500/20",
  },
};

const getStatusCfg = (s: string | null) =>
  (s && STATUS_CONFIG[s]) ?? {
    label: s ?? "—",
    color: "bg-gray-100 text-gray-600 border-gray-200",
  };

// ── Shared components ─────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: string | null }) => {
  const cfg = getStatusCfg(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold ${cfg.color}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {cfg.label}
    </span>
  );
};

const TypeBadge = ({ type }: { type: string }) => {
  const isVip = type === membershipType.VIP;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-bold ${
        isVip
          ? "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
          : "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20"
      }`}
    >
      {isVip ? <Crown className="h-3 w-3" /> : <Star className="h-3 w-3" />}
      {isVip ? "VIP" : "Regular"}
    </span>
  );
};

// ── Field row ────────────────────────────────────────────────────────────────

const Field = ({
  label,
  value,
  icon: Icon,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  mono?: boolean;
}) => (
  <div className="flex items-start justify-between gap-6 py-3 border-b border-border last:border-0">
    <div className="flex items-center gap-2 shrink-0 min-w-[160px]">
      {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
    <div
      className={`text-right text-sm font-medium text-foreground break-all ${mono ? "font-mono text-xs" : ""}`}
    >
      {value ?? <span className="text-muted-foreground/50">—</span>}
    </div>
  </div>
);

// ── Section wrapper ───────────────────────────────────────────────────────────

const Section = ({
  title,
  icon: Icon,
  children,
  action,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card shadow-sm">
    <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-sm font-semibold text-card-foreground">{title}</h2>
      </div>
      {action}
    </div>
    <div className="px-5 py-1">{children}</div>
  </div>
);

// ── Active Membership section ─────────────────────────────────────────────────

const ActiveMembershipSection = ({ m }: { m: MemberResponse }) => (
  <Section title="Membership Record" icon={BadgeCheck}>
    <div className="flex items-start justify-between gap-6 py-3 border-b border-border">
      <div className="flex items-center gap-2 shrink-0 min-w-[160px]">
        <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Status</span>
      </div>
      <StatusBadge status={m.status} />
    </div>

    <Field label="Membership Number" value={m.membershipNumber ?? null} icon={Hash} mono />
    <Field label="Membership ID" value={m.membershipId ?? null} icon={Hash} mono />
    <Field label="Card Serial #" value={m.membershipCardSerialNumber} icon={CreditCard} />
    <Field label="Issued Number" value={m.membershipNumberIssued} icon={Hash} />
    <Field label="Duration" value={m.duration} icon={Clock} />
    <Field
      label="Balance"
      value={m.balance != null ? `BHD ${m.balance.toFixed(3)}` : null}
      icon={CreditCard}
    />
    <Field label="Received By" value={m.applicationReceivedBy} icon={UserCircle} />
    <Field label="Approved By" value={m.approvalBy} icon={UserCheck} />
    <Field label="Date Approved" value={fmtDateTime(m.startDate)} icon={CalendarDays} />
    <Field label="Expiry Date" value={fmt(m.expiryDate)} icon={CalendarDays} />
    <Field label="Remarks" value={m.remarks} icon={Shield} />
  </Section>
);

// ── Pending Banner ────────────────────────────────────────────────────────────

// ── Pending Banner ────────────────────────────────────────────────────────────

const PendingBanner = ({ onAccept }: { onAccept?: () => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-500/20 dark:bg-amber-500/5">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-500/10">
        <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Pending Review</p>
        <p className="text-xs text-amber-700/70 dark:text-amber-400/70 mt-0.5">
          No membership record has been issued yet. Accept the application to create one.
        </p>
      </div>
    </div>
    <Button
      size="sm"
      onClick={onAccept}
      className="shrink-0 gap-2 bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors"
    >
      <BadgeCheck className="h-4 w-4" />
      Accept Membership
    </Button>
  </div>
);

// ── Transaction Placeholder ───────────────────────────────────────────────────

const TransactionPlaceholder = () => (
  <Section
    title="Transaction History"
    icon={History}
    action={
      <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground border border-border rounded px-2 py-0.5">
        Coming soon
      </span>
    }
  >
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
        <CreditCard className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">No transactions to display</p>
      <p className="text-xs text-muted-foreground/60 max-w-xs">
        Payment history will appear here once the API is connected.
      </p>
    </div>
  </Section>
);

// ── Main Content ──────────────────────────────────────────────────────────────

const MembershipOverviewContent = ({
  application,
  onEdit,
  onApprove,
}: {
  application: MembershipApplication;
  onEdit: () => void;
  onApprove: () => void;
}) => {
  const isVip = application.membershipType === membershipType.VIP;

  return (
    <div className="space-y-4">
      {/* ── Identity header ── */}
      <div
        className={`relative overflow-hidden rounded-xl border px-6 py-5 ${
          isVip
            ? "border-amber-200 bg-gradient-to-r from-amber-50 to-background dark:border-amber-500/25 dark:from-amber-950/40 dark:to-background"
            : "border-violet-200 bg-gradient-to-r from-violet-50 to-background dark:border-violet-500/25 dark:from-violet-950/40 dark:to-background"
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* avatar + name */}
          <div className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-bold text-xl ${
                isVip
                  ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                  : "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
              }`}
            >
              {application.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-lg font-bold text-foreground">{application.fullName}</h1>
                <TypeBadge type={application.membershipType} />
                {application.seen && (
                  <span className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
                    <Eye className="h-2.5 w-2.5" />
                    Seen
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{application.email}</p>
            </div>
          </div>
          {/* action button */}
          <Button
            variant="outline"
            size="sm"
            className="self-start sm:self-auto gap-2"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit Details
          </Button>
        </div>
      </div>

      {/* ── Pending banner ── */}
      {application.membership === null && <PendingBanner onAccept={onApprove} />}

      {/* ── Application details ── */}
      <Section title="Application Details" icon={User}>
        <Field label="Full Name" value={application.fullName} icon={User} />
        <Field label="Email" value={application.email} icon={Mail} />
        <Field label="Mobile Number" value={application.mobileNumber} icon={Phone} />
        <Field label="Date of Birth" value={fmt(application.dateOfBirth)} icon={CalendarDays} />
        <Field label="CPR / ID" value={application.cprId} icon={Shield} mono />
        <Field label="Nationality" value={application.nationality} icon={MapPin} />
        <div className="flex items-start justify-between gap-6 py-3 border-b border-border last:border-0">
          <div className="flex items-center gap-2 shrink-0 min-w-[160px]">
            <Star className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Membership Type</span>
          </div>
          <TypeBadge type={application.membershipType} />
        </div>
        <Field label="Applied On" value={fmtDateTime(application.createdAt)} icon={CalendarDays} />
        <Field label="Last Updated" value={fmtDateTime(application.updatedAt)} icon={Clock} />
      </Section>

      {/* ── Emergency Contact ── */}
      <Section title="Emergency Contact" icon={Phone}>
        <Field label="Contact Name" value={application.emergencyContactName} icon={UserCircle} />
        <Field label="Relationship" value={application.emergencyContactRelationship} icon={User} />
        <Field
          label="Contact Mobile"
          value={application.emergencyContactMobileNumber}
          icon={Phone}
        />
      </Section>

      {/* ── Membership record (if exists) ── */}
      {application.membership && <ActiveMembershipSection m={application.membership} />}

      {/* ── Transaction history ── */}
      <TransactionPlaceholder />
    </div>
  );
};

// ── Page Shell ────────────────────────────────────────────────────────────────

const MembershipOverview = () => {
  const { membershipApplicationId } = useParams();
  const navigate = useNavigate();
  const [showApprove, setShowApprove] = useState(false);

  const {
    data: membershipResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberships", membershipApplicationId],
    queryFn: () => membershipApplicationService.get(membershipApplicationId!),
    retry: false,
  });

  const application = membershipResponse?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading membership details…</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-32 text-center px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <div>
          <p className="text-base font-bold text-foreground">Could not load membership</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {error
              ? "Something went wrong while fetching this record."
              : "No membership found with this ID."}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => navigate("/membership")}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Memberships
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 space-y-5">
      {/* breadcrumb bar */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={() => navigate("/membership")}
        >
          <ArrowLeft className="h-4 w-4" />
          Memberships
        </Button>
        <span className="text-border select-none">/</span>
        <span className="text-sm text-foreground font-medium truncate">{application.fullName}</span>
      </div>

      {showApprove && (
        <ApproveMembershipCard
          application={application}
          handleCancel={() => setShowApprove(false)}
        />
      )}

      <MembershipOverviewContent
        application={application}
        onApprove={() => setShowApprove(true)}
        onEdit={() => {
          /* no logic yet */
        }}
      />
    </div>
  );
};

export default MembershipOverview;
