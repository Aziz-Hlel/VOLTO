import { CloudUpload } from "lucide-react";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";
import type { EntityType } from "@/types/enums/EntityType";
import CircularProgressBar from "./CircularProgressBar ";
import type { DropzoneOptions } from "react-dropzone";
import useVideoUpload from "./hooks/use-Video-Upload";

const VideoUpload = ({
  videoKeyFieldName,
  videoUrlFieldName,
  videoPurpose,
  entityType,
}: {
  videoKeyFieldName: string;
  videoUrlFieldName: string;
  videoPurpose: MediaPurpose;
  entityType: EntityType;
}) => {
  const maxSizeInMB = 5;
  const videoMaxDuration = 45;

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const dropZoneConfig: DropzoneOptions = {
    maxFiles: 1,
    maxSize: maxSizeInBytes,
    accept: {
      "video/*": [".mp4", ".mov", ".avi"],
    },
    multiple: false,
  };

  const { getFieldState, getValues } = useFormContext();

  const fieldErrorMessage = getFieldState(videoKeyFieldName).error?.message;
  console.log("fieldErrorMessage : ", fieldErrorMessage);
  console.log("videoKeyFieldName : ", getValues(videoKeyFieldName));

  const {
    currentDisplayed,
    file,
    video,
    progress,
    optimizeVideo,
    rollBackToInitImage,
    onFileChange,
  } = useVideoUpload({
    videoUrlFieldName,
    videoKeyFieldName,
    entityType,
    videoPurpose,
    maxDuration: videoMaxDuration,
  });

  return (
    <>
      <div className=" h-96 ">
        {currentDisplayed === "fileUpload" && (
          <FormItem className="">
            <FormLabel>Video</FormLabel>
            <FormDescription>Select a video to upload.</FormDescription>
            <FormControl>
              <FileUploader
                value={file}
                onValueChange={onFileChange}
                maxImageSize={maxSizeInBytes}
                dropzoneOptions={dropZoneConfig}
                className="relative  bg-background rounded-lg p-2"
              >
                {!file && (
                  <FileInput className="outline-dashed outline-1 outline-slate-500">
                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                      <CloudUpload className="text-gray-500 min-h-56 size-16" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">MP4, MOV, AVI</p>
                    </div>
                  </FileInput>
                )}
              </FileUploader>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}

        {currentDisplayed === "preUpload" && (
          <div className="relative w-full h-full flex flex-col justify-start ">
            <div className=" text-sm text-left w-full font-semibold mb-1">Video</div>
            <div className=" text-sm text-left w-full text-gray-600 font-light mb-4">
              Confirm Uploaded Video
            </div>

            <div className="border border-black rounded-lg border-dashed h-full w-full p-2 ">
              {/* <img src={img} className=' mx-auto  h-60 object-contain rounded-lg' /> */}
              <video
                src={URL.createObjectURL(file as Blob)}
                className=" mx-auto  h-60 w-full object-contain rounded-lg"
                controls
              />

              <div className="flex justify-end gap-2 px-4 pt-4">
                <Button onClick={rollBackToInitImage} variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
                <FileUploader
                  value={file}
                  onValueChange={onFileChange}
                  maxImageSize={maxSizeInBytes}
                  dropzoneOptions={dropZoneConfig}
                  className=" w-fit"
                ></FileUploader>
                <Button onClick={optimizeVideo} variant="default" className=" cursor-pointer">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentDisplayed === "loading" && (
          <div className="relative w-full h-full rounded-lg border border-black border-dashed flex flex-col justify-center ">
            <div className="flex justify-center mx-auto gap-2">
              <span className=" -translate-y-0.5">Loading</span>
              <CircularProgressBar progress={progress} />
            </div>
          </div>
        )}

        {currentDisplayed === "imgDisplayed" && (
          <div className="relative w-full h-full flex flex-col justify-start ">
            <div className=" text-sm text-left w-full font-semibold mb-1">Video</div>
            <div className=" text-sm text-left w-full text-gray-600 font-light mb-4">
              Uploaded Video
            </div>

            <div className="border border-black rounded-lg border-dashed h-full w-full p-2 ">
              <video src={video} controls className="  w-full  h-60 object-contain rounded-lg" />

              <div className="flex justify-end gap-4 px-4 pt-4">
                <Button onClick={rollBackToInitImage} variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
                <FileUploader
                  value={file}
                  onValueChange={onFileChange}
                  maxImageSize={maxSizeInBytes}
                  dropzoneOptions={dropZoneConfig}
                  className=" w-fit"
                >
                  <FileInput>
                    <Button
                      onClick={(e) => e.preventDefault()}
                      variant="default"
                      className="cursor-pointer"
                    >
                      Change
                    </Button>
                  </FileInput>
                </FileUploader>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-red-500">{fieldErrorMessage}</div>
    </>
  );
};

export default VideoUpload;
