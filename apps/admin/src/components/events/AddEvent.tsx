import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import RangeEventDate from "./RangeEventDate";
import WeeklyEventForm from "./WeeklyEventForm";
import { Textarea } from "../ui/textarea";
import ImageUpload from "./ImageUpload";
import { Link, useNavigate } from "react-router-dom";
import eventService from "@/Api/services/event.service";
import VideoUpload from "./VideoUpload";
import type { EventResponseDto } from "@/types/events/eventResponse.dto";
import type { ApiResponse } from "@/Api/apiService";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Video, Image as ImageIcon } from "lucide-react";

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["WEEKLY", "SPECIAL"]),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  cronStartDate: z.string().optional(),
  cronEndDate: z.string().optional(),
  thumbnail: z.object(
    {
      s3Key: z.string({ error: "Thumbnail is required" }).min(1, "Thumbnail is required"),
      url: z.string().optional(),
    },
    { error: "Thumbnail is required" },
  ),
  video: z.object(
    {
      s3Key: z.string({ error: "Video is required" }).min(1, "Video is required"),
      url: z.string(),
    },
    { error: "Video is required" },
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function EventAddForm({ event }: { event: EventResponseDto | undefined }) {
  const editMode = !!event;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const formDefaultValue: FormData | undefined = event
    ? {
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
    : undefined;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValue,
  });

  const eventType = form.watch("type");

  const onSubmit = async (values: FormData) => {
    try {
      if (values.type === "WEEKLY") {
        delete values.startDate;
        delete values.endDate;
      } else {
        delete values.cronStartDate;
        delete values.cronEndDate;
      }

      const response: ApiResponse<EventResponseDto> = editMode
        ? await eventService.update(event!.id, values)
        : await eventService.create(values);

      if (response.success) {
        toast.success(editMode ? "Event updated successfully" : "Event created successfully");
        queryClient.invalidateQueries({ queryKey: ["events"] });
        navigate("..");
      }
    } catch (error: any) {
      toast.error(error?.error ?? "Failed to submit the form. Please try again.");
    }
  };
  // console.log(form.formState.errors);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-gray-100">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent mb-8">
          {editMode ? "Edit Event" : "Create New Event"}
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Event Name</FormLabel>
                  <FormDescription>Enter the name of your event.</FormDescription>
                  <FormControl>
                    <Input
                      placeholder="e.g., Ladies Night"
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Description</FormLabel>
                  <FormDescription>Describe the event briefly.</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder="Event's description"
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Event Type</FormLabel>
                  <FormDescription>Select whether it’s special or weekly.</FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4 mt-2"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="SPECIAL" />
                        </FormControl>
                        <FormLabel className="font-medium">Special</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="WEEKLY" />
                        </FormControl>
                        <FormLabel className="font-medium">Weekly</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dates */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 ">
              <div className="flex items-baseline justify-start gap-2 mb-2 text-blue-600 font-semibold">
                <CalendarDays className="w-5 h-5" />
                <span>Event Schedule</span>
                <span className="text-xs text-gray-600">
                  Please enter all times in Bahrain timezone - GMT+3
                </span>
              </div>
              {eventType === "WEEKLY" ? (
                <WeeklyEventForm
                  startDateFieldName="cronStartDate"
                  endDateFieldName="cronEndDate"
                />
              ) : (
                <RangeEventDate startDateFieldName="startDate" endDateFieldName="endDate" />
              )}
            </div>

            {/* Media Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
                  <ImageIcon className="w-5 h-5" /> Thumbnail
                </div>
                <ImageUpload
                  imgKeyFieldName="thumbnail.s3Key"
                  imgUrlFieldName="thumbnail.url"
                  entityType="EVENT"
                  imgPurpose="THUMBNAIL"
                />
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-semibold">
                  <Video className="w-5 h-5" /> Video
                </div>
                <VideoUpload
                  videoKeyFieldName="video.s3Key"
                  videoUrlFieldName="video.url"
                  entityType="EVENT"
                  videoPurpose="VIDEO"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
              <Link to="/events">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full sm:w-auto border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md"
              >
                {editMode ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
