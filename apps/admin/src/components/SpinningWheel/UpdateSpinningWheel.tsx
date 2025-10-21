import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Martini } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
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
import z from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SpinningWheelResponseDto } from "@/types/spinnigWheel/SpinningWheel.response";
import SingleEventDate from "./SingleEventDate";
import { Gift } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpinningWheelService } from "@/Api/services/SpinningWheel.service";
import type { UpdateSpinnigWheelDto } from "@/types/spinnigWheel/UpdateSpinnigWheel.dto";
import { toast } from "sonner";

interface UpdateSpinningWheelProps {
  initialSpinningWheel: SpinningWheelResponseDto;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const UpdateSpinningWheelSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  rewardList: z.array(z.object({ id: z.string(), name: z.string().max(20) })),
});

type UpdateSpinnigWheelRequestDto = z.infer<typeof UpdateSpinningWheelSchema>;

const UpdateSpinningWheel = ({ initialSpinningWheel, open, setOpen }: UpdateSpinningWheelProps) => {
  const { mutateAsync } = useMutation({
    mutationFn: (updatedSpiningWheel: UpdateSpinnigWheelDto) =>
      SpinningWheelService.update(updatedSpiningWheel),
  });

  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(UpdateSpinningWheelSchema),
    defaultValues: {
      id: initialSpinningWheel.id,
      name: initialSpinningWheel.name,
      startDate: initialSpinningWheel.startDate,
      endDate: initialSpinningWheel.endDate,
      rewardList: initialSpinningWheel.rewardList,
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "rewardList",
  });

  const onSubmit = async (data: UpdateSpinnigWheelRequestDto) => {
    try {
      const response = await mutateAsync(data);
      if (response.success) {
        setOpen(false);
        toast.success("Spinning Wheel updated successfully");
        await queryClient.refetchQueries({ queryKey: ["spinning-wheel"], exact: false });
      }
    } catch (error) {
      toast.error(error?.error ?? "Error updating Spinig Wheel");
    }

  };


  const loading = false;
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className=" max-w-6xl min-w-2xl   w-[100rem]  h-10/12 ">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8 overflow-y-hidden "
            >
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>

              <div className=" flex flex-col px-4   h-10/12 overflow-y-scroll space-y-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormDescription className=" ">This field is Optional.</FormDescription>
                      <FormControl>
                        <Input placeholder="shadcn" type="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <SingleEventDate startDateFieldName="startDate" endDateFieldName="endDate" />

                {/* rewardList array field */}
                <div>
                  <FormLabel className="flex items-start">
                    <Gift className="" /> <span className=" text-xl ">Rewards</span>{" "}
                  </FormLabel>
                  <FormDescription>Add one or more rewards for this wheel.</FormDescription>

                  <div className="space-y-4 mt-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-end gap-3 border p-3 rounded-md">
                        {/* Reward name */}
                        <FormField
                          control={form.control}
                          name={`rewardList.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Reward N°{index + 1} </FormLabel>
                              <FormControl>
                                <Input placeholder="Reward name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className=" col-span-4 row-span-1">
                <DialogClose asChild>
                  <Button className="" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={loading} type="submit" className="enabled:cursor-pointer">
                  {loading ? <Spinner /> : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateSpinningWheel;
