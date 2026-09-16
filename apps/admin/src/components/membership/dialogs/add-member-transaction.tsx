import { memberTransactionService } from "@/Api/services/member-transaction.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { transactionType } from "@/types/enums/enums";
import type { MembershipApplication } from "@/types/member/Membership";
import {
  createMemberTransactionSchema,
  type CreateMemberTransaction,
} from "@/types/memberTransaction/create-member-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  Coins,
  PlusCircle,
  Wallet,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddMemberTransactionProps {
  member: MembershipApplication;
  handleCancel: () => void;
  open?: boolean;
}

const AddMemberTransaction = ({ member, handleCancel, open = true }: AddMemberTransactionProps) => {
  const queryClient = useQueryClient();
  const membershipId = member.membership?.id;
  const currentBalance = member.membership?.balance ?? 0;

  const form = useForm<CreateMemberTransaction>({
    resolver: zodResolver(createMemberTransactionSchema),
  });

  const selectedType = form.watch("type");
  const enteredAmount = form.watch("amount");

  const numericAmount = Number(enteredAmount) || 0;
  const isRedeem = selectedType === transactionType.REDEEM;
  const projectedBalance = isRedeem
    ? currentBalance - numericAmount
    : currentBalance + numericAmount;
  const isInsufficient = isRedeem && numericAmount > currentBalance;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: CreateMemberTransaction) => {
      if (!membershipId) {
        throw new Error("Active membership not found");
      }
      return memberTransactionService.create(membershipId, data);
    },
  });

  const onSubmit = async (data: CreateMemberTransaction) => {
    try {
      const response = await mutateAsync(data);
      if (response.success) {
        toast.success("Transaction recorded successfully!");
        await queryClient.refetchQueries({
          queryKey: ["member-transactions", membershipId],
          exact: false,
        });
        await queryClient.refetchQueries({
          queryKey: ["members"],
          exact: false,
        });
        handleCancel();
      }
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e = err as any;
      toast.error(
        e?.response?.data?.message ?? e?.error ?? e?.message ?? "Failed to add transaction",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleCancel()}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <PlusCircle className="h-5 w-5 text-indigo-500" />
            Add Transaction
          </DialogTitle>
          <DialogDescription>
            Record points earned or redeemed for <strong>{member.fullName}</strong>. Please note
            that once confirmed, transactions cannot be edited or deleted.
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance & Projection Banner */}
        <div className="flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
              <Wallet className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Current Balance
              </p>
              <p className="text-base font-bold tabular-nums text-foreground">
                {currentBalance.toFixed(3)}{" "}
                <span className="text-xs font-normal text-muted-foreground">PTS</span>
              </p>
            </div>
          </div>

          {numericAmount > 0 && (
            <div className="text-right">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                Projected Balance
              </p>
              <p
                className={`text-base font-bold tabular-nums ${
                  isInsufficient ? "text-destructive" : "text-foreground"
                }`}
              >
                {projectedBalance.toFixed(3)}{" "}
                <span className="text-xs font-normal text-muted-foreground">PTS</span>
              </p>
            </div>
          )}
        </div>

        {isInsufficient && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/90 p-3 text-red-900 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-200">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Redemption amount exceeds member&apos;s current balance ({currentBalance.toFixed(3)}{" "}
              PTS).
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={transactionType.EARN}>
                        <div className="flex items-center gap-2">
                          <ArrowUpCircle className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">
                            Earn (Credit PTS)
                          </span>
                        </div>
                      </SelectItem>
                      <SelectItem value={transactionType.REDEEM}>
                        <div className="flex items-center gap-2">
                          <ArrowDownCircle className="h-4 w-4 text-rose-500" />
                          <span className="font-medium text-rose-600 dark:text-rose-400">
                            Redeem (Debit PTS)
                          </span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (Points)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.001"
                        min="0.001"
                        max="2000"
                        placeholder="0.000"
                        {...field}
                        value={field.value ?? ""}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === "") {
                            field.onChange(undefined);
                            return;
                          }
                          const parts = val.split(".");
                          if (parts[1] && parts[1].length > 3) {
                            const truncated = `${parts[0]}.${parts[1].slice(0, 3)}`;
                            field.onChange(Number(truncated));
                            return;
                          }
                          field.onChange(Number(val));
                        }}
                        className="pr-12 tabular-nums"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-xs font-semibold text-muted-foreground">
                        PTS
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note / Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g. Points rewarded for event participation, Bill deduction..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || isInsufficient}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity gap-2"
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  <>
                    <Coins className="h-4 w-4" />
                    Record Transaction
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberTransaction;
