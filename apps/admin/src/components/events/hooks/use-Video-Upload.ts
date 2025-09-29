import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { uploadImageToS3_SIMULATOR as uploadImage } from "../getSignedUrlUpload";
import { toast } from "sonner";
import type { EntityType } from "@/types/enums/EntityType";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";

type IuseImageUpload = {
  videoUrlFieldName: string;
  videoKeyFieldName: string;
  entityType: EntityType;
  videoPurpose: MediaPurpose;
  maxDuration: number;
};

const useVideoUpload = ({
  videoUrlFieldName,
  videoKeyFieldName: imgKeyFieldName,
  entityType,
  videoPurpose,
  maxDuration,
}: IuseImageUpload) => {
  const { watch, setValue } = useFormContext();

  const video = watch(videoUrlFieldName) as string | undefined;

  const initImg = useMemo(() => video, []);
  const setImageUrl = (img?: string) => setValue(videoUrlFieldName, img);
  const setImageKey = (imgKey?: string) => setValue(imgKeyFieldName, imgKey);

  const [file, setFile] = useState<File | null>(null);

  function validateVideoDuration(file: File | null): Promise<boolean> {
    if (!file) return Promise.resolve(true);

    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");

      video.preload = "metadata";
      video.src = url;

      video.onloadedmetadata = () => {
        URL.revokeObjectURL(url);
        const duration = video.duration;
        if (duration > maxDuration) {
          toast.error(`Video must be less than ${maxDuration} seconds`);
          resolve(false);
        }

        resolve(true);
      };

      video.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
      };
    });
  }

  const onFileChange = async (value: File | null) =>
    (await validateVideoDuration(value)) && setFile(value);

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

      const s3Key = await uploadImage({
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
