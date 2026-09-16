import { memberTransactionService } from "@/Api/services/member-transaction.service";
import { Button } from "@/components/ui/button";
import { membershipStatus } from "@/types/enums/enums";
import type { MembershipApplication } from "@/types/member/Membership";
import type { memeberTransactionRespose } from "@/types/memberTransaction/member-transaction-response";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CreditCard,
  History,
  Loader2,
  Plus,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import AddMemberTransaction from "../dialogs/add-member-transaction";

// ── Section wrapper ────────────────────────────────────────────────────────────

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

// ── Helpers ────────────────────────────────────────────────────────────────────

const fmtDateTime = (dateStr: string) =>
  new Date(dateStr).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// ── Single transaction row ─────────────────────────────────────────────────────

const TransactionRow = ({ tx }: { tx: memeberTransactionRespose }) => {
  const isCredit = tx.amount >= 0;
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            isCredit
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {isCredit ? (
            <ArrowUpCircle className="h-4 w-4" />
          ) : (
            <ArrowDownCircle className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground leading-tight truncate max-w-[180px]">
            {tx.note ?? "Transaction"}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <UserCircle className="h-3 w-3 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground">
              {tx.performedBy.firstName} {tx.performedBy.lastName}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{fmtDateTime(tx.createdAt)}</p>
        </div>
      </div>
      <span
        className={`shrink-0 text-sm font-bold tabular-nums ${
          isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
        }`}
      >
        {isCredit ? "+" : ""}
        {tx.amount.toFixed(3)} PTS
      </span>
    </div>
  );
};

// ── Main card ──────────────────────────────────────────────────────────────────

const MemberTransactionCard = ({
  membershipApplication,
}: {
  membershipApplication: MembershipApplication;
}) => {
  const [openAddTransaction, setOpenAddTransaction] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, isEnabled } =
    useInfiniteQuery({
      queryKey: ["members", membershipApplication.membership?.id],
      queryFn: async ({ pageParam }) => {
        const res = await memberTransactionService.list(membershipApplication.membership!.id, {
          transactionId: pageParam,
          limit: 10,
        });
        return res.data;
      },
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
      enabled: !!membershipApplication.membership?.id,
    });

  const transactions = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <Section
      title="Transaction History"
      icon={History}
      action={
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 h-7 text-xs"
          disabled={membershipApplication.membership?.status !== membershipStatus.ACTIVE}
          onClick={() => setOpenAddTransaction(true)}
        >
          <Plus className="h-3.5 w-3.5" />
          Add Transaction
        </Button>
      }
    >
      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Loading transactions…</span>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <CreditCard className="h-8 w-8 text-muted-foreground/40" />
          <p className="text-sm text-destructive">Failed to load transactions.</p>
        </div>
      )}

      {/* Not Enabled (meaning not a member yet) */}
      {!isEnabled && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Not a Member Yet</p>
          <p className="text-xs text-muted-foreground/60 max-w-xs">
            This applicant is not yet a member. Please onboard them first.
          </p>
        </div>
      )}
      {/* Empty */}
      {isEnabled && !isLoading && !isError && transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No transactions yet</p>
          <p className="text-xs text-muted-foreground/60 max-w-xs">
            Transactions will appear here once recorded for this member.
          </p>
        </div>
      )}

      {/* List */}
      {!isLoading && !isError && transactions.length > 0 && (
        <>
          <div className="py-1">
            {transactions.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center py-3">
              <Button
                size="sm"
                variant="ghost"
                className="gap-2 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Plus className="h-3.5 w-3.5" />
                )}
                {isFetchingNextPage ? "Loading…" : "Load more"}
              </Button>
            </div>
          )}

          {!hasNextPage && (
            <p className="py-3 text-center text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              All transactions loaded
            </p>
          )}
        </>
      )}

      {openAddTransaction && (
        <AddMemberTransaction
          member={membershipApplication}
          handleCancel={() => setOpenAddTransaction(false)}
        />
      )}
    </Section>
  );
};

export default MemberTransactionCard;
