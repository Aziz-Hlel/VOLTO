import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group"
import { toast } from "sonner"
import RangeEventDate from "./RangeEventDate"
import WeeklyEventForm from "./WeeklyEventForm"
import { Textarea } from "../ui/textarea"
import ImageUpload from "./ImageUpload"
import { Link, useNavigate } from "react-router-dom"
import eventService from "@/Api/services/event.service"
import VideoUpload from "./VideoUpload"
import type { EventResponseDto } from "@/types/events/eventResponse.dto"
import type { ApiResponse } from "@/Api/apiService"
import { useQueries, useQueryClient } from "@tanstack/react-query"

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Name is required" }).min(1),
  description: z.string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character long"),
  type: z.enum(["WEEKLY", "SPECIAL"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  cronStartDate: z.string().optional(),
  cronEndDate: z.string().optional(),
  thumbnail: z.object({
    s3Key: z.string({ message: "Thumbnail is required" }).min(1),
    url: z.string().optional(),
  }),
  video: z.object({
    s3Key: z.string({ message: "Video is required" }).min(1),
    url: z.string(),
  })
});


type FormData = z.infer<typeof formSchema>;


export default function EventAddForm({ event }: { event: EventResponseDto | undefined; }) {

  const editMode = !!event
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formDefaultValue: FormData | undefined = !event ? undefined : {
    id: event.id,
    name: event.name,
    description: event.description,
    type: event.type,
    startDate: event.startDate ?? undefined,
    endDate: event.endDate ?? undefined,
    cronStartDate: event.cronStartDate ?? undefined,
    cronEndDate: event.cronEndDate ?? undefined,
    thumbnail: event.thumbnail,
    video: event.video,
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue
  })


  const eventType = form.watch("type")

  const onSubmit = async (values: FormData) => {
    try {
      if (values.type === "WEEKLY") {
        delete values.startDate
        delete values.endDate
      }
      if (values.type === "SPECIAL") {
        delete values.cronStartDate
        delete values.cronEndDate
      }
      let response: ApiResponse<EventResponseDto>

      editMode ? response = await eventService.update(event!.id, values)
        : response = await eventService.create(values)

      if (response.success) {
        if (editMode) toast.success("Event Updated successfully");
        if (!editMode) toast.success("Event Created successfully");
        queryClient.invalidateQueries({ queryKey: ['events'], exact: false })
        navigate("..")

      }

      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }


  }


  console.log("from errors : ", form.formState.errors)



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormDescription>Type the event's name</FormDescription>
              <FormControl>
                <Input
                  placeholder="Ladies Night"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>Type the event's description</FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Event's description"
                  className="max-h-60"

                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Event Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  {[
                    ["Special", "SPECIAL"],
                    ["Weekly", "WEEKLY"],
                  ].map((option, index) => (
                    <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                      <FormControl>
                        <RadioGroupItem value={option[1]} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option[0]}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>Select event's type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {eventType === "WEEKLY" ?
          <WeeklyEventForm startDateFieldName="cronStartDate" endDateFieldName="cronEndDate" />
          :
          <RangeEventDate startDateFieldName="startDate" endDateFieldName="endDate" />

        }


        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-6">

            <ImageUpload imgKeyFieldName="thumbnail.s3Key" imgUrlFieldName="thumbnail.url" entityType="EVENT" imgPurpose="THUMBNAIL" />
          </div>

          <div className="col-span-6">

            <VideoUpload videoKeyFieldName="video.s3Key" videoUrlFieldName="video.url" entityType="EVENT" videoPurpose="VIDEO" />


          </div>

        </div>

        <div className=" w-full flex justify-end gap-4">

          <Link to="/events">
            <Button type="button" variant="ghost" className=" cursor-pointer">Cancel</Button>
          </Link>

          <Button type="submit">Submit</Button>

        </div>

      </form>
    </Form>
  )
}