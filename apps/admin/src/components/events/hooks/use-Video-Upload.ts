import { useMemo, useState } from "react";
import { useFormContext, type FieldValues, type UseFormClearErrors } from "react-hook-form";
import { uploadImageToS3_SIMULATOR as uploadMedia } from "../getSignedUrlUpload";
import { toast } from "sonner";
import type { EntityType } from "@/types/enums/EntityType";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";

type IUseImageUpload = {
  videoUrlFieldName: string;
  videoKeyFieldName: string;
  rootFieldName: string;
  entityType: EntityType;
  videoPurpose: MediaPurpose;
  maxDuration: number;
  clearErrors: UseFormClearErrors<FieldValues>;
};

const useVideoUpload = ({
  videoUrlFieldName,
  videoKeyFieldName,
  rootFieldName,
  entityType,
  videoPurpose,
  maxDuration,
  clearErrors,
}: IUseImageUpload) => {
  const { watch, setValue } = useFormContext();

  const video = watch(videoUrlFieldName) as string | undefined;

  const initImg = useMemo(() => video, []);
  const setImageUrl = (img?: string) => setValue(videoUrlFieldName, img);
  const setImageKey = (imgKey?: string) => setValue(videoKeyFieldName, imgKey);

  const [file, setFile] = useState<File | null>(null);

  function validateVideo(file: File | null): Promise<boolean> {
    if (!file) return Promise.resolve(true);

    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");

      video.preload = "metadata";
      video.src = url;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);

        const duration = video.duration;
        const width = video.videoWidth;
        const height = video.videoHeight;

        // 1. Duration
        if (duration > maxDuration) {
          toast.error(`Video must be less than ${maxDuration} seconds`);
          return resolve(false);
        }

        // // 2. Aspect ratio check (9:16 with tolerance)
        // const aspectRatio = width / height;
        // const targetRatio = 9 / 16;
        // const tolerance = 0.02; // ~2%

        // if (Math.abs(aspectRatio - targetRatio) > tolerance) {
        //   toast.error("Video must be in 9:16 aspect ratio");
        //   return resolve(false);
        // }

        // 3. Max resolution
        if (width > 2000 || height > 2000) {
          toast.error("Max resolution is 2000x2000 pixels");
          return resolve(false);
        }

        resolve(true);
      };

      video.onerror = () => {
        URL.revokeObjectURL(url);
        toast.error("Invalid video file");
        resolve(false);
      };
    });
  }

  const onFileChange = async (value: File | null) => {
    const isValid = await validateVideo(value);
    if (isValid) {
      setFile(value);
      clearErrors([videoKeyFieldName, videoUrlFieldName, rootFieldName]);
    }
  };

  const [progress, setProgress] = useState(0);

  const currentDisplayed: "fileUpload" | "preUpload" | "loading" | "imgDisplayed" = useMemo(() => {
    if (progress > 0 && progress < 100) return "loading";
    if (file) return "preUpload";
    if (video) return "imgDisplayed";
    return "fileUpload";
  }, [file, video, progress]);

  const handleCancel = () => setFile(null);

  const rollBackToInitImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFile(null);
    setImageUrl(initImg);
  };

  const optimizeVideo = async () => {
    if (!file) {
      return;
    }

    try {
      setProgress(5);

      const fileName = file.name.split(".")[0];

      setProgress(10);

      const s3Key = await uploadMedia({
        uploadedImg: file,
        name: fileName,
        entityType: entityType,
        purpose: videoPurpose,
        setProgress: (progress: any) => setProgress(progress),
      });

      setImageUrl(URL.createObjectURL(file));
      setFile(null);
      setImageKey(s3Key);
    } catch (e) {
      console.error(e);
      toast("Something Went Wrong", {
        description: "Unable to upload image, if the issue persists please contact support",
        action: {
          label: "Ok",
          onClick: () => "",
        },
      });
    }
  };

  return {
    file,
    progress,
    video,
    currentDisplayed,
    onFileChange,
    handleCancel,
    optimizeVideo,
    rollBackToInitImage,
  };
};

export default useVideoUpload;
