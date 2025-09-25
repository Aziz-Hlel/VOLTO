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

const formSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1),
  description: z.string({ message: "Description is required" })
    .min(1, "Description must be at least 1 character long"),
  eventType: z.enum(["WEEKLY", "SPECIAL"]).default("SPECIAL").optional(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  cronStartDate: z.string().optional(),
  cronEndDate: z.string().optional(),
  thumbnail: z.object({
    s3Key: z.string(),
    url: z.string(),
  }),
  video: z.object({
    s3Key: z.string(),
    url: z.string(),
  })
});


type FormData = z.infer<typeof formSchema>;

// ! none of the Dates suport edit yet
export default function EventAddForm() {


  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "aa",
      description: "bb",
      eventType: "SPECIAL",
      startDate: new Date(),
      endDate: new Date(),
    },

  })

  const eventType = form.watch("eventType")

  function onSubmit(values: FormData) {
    try {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>Type the event's description</FormDescription>
              <FormControl>
                <Input
                  placeholder="Ladies Night"

                  type=""
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
              <FormLabel>Event Name</FormLabel>
              <FormDescription>Type the event's name</FormDescription>
              <FormControl>
                <Textarea
                  placeholder="Event's description"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
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

            <ImageUpload imgFieldName="thumbnail" entityType="EVENT" imgPurpose="THUMBNAIL" />
          </div>

          <div className="col-span-6">

            <ImageUpload imgFieldName="video" entityType="EVENT" imgPurpose="VIDEO" />


          </div>

        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}