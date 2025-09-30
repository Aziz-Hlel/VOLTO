import { useMemo, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { EntityType } from "@/types/enums/EntityType";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";
import getCroppedImg from "@/components/events/cropImg.func";
import prepareImageForUpload from "@/components/events/prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "@/components/events/getSignedUrlUpload";

type IuseImageUpload = {
  imgUrlFieldName: string;
  imgKeyFieldName: string;
  entityType: EntityType;
  imgPurpose: MediaPurpose;
};

const useImageUpload = ({
  imgUrlFieldName,
  imgKeyFieldName,
  entityType,
  imgPurpose,
}: IuseImageUpload) => {
  const { setValue, getValues } = useFormContext();

  const currentImgUrl = getValues(imgUrlFieldName);
  const currentImgKey = getValues(imgKeyFieldName);

  const initImg = useMemo(() => currentImgUrl, []);

  const setImageUrl = (img?: string) => setValue(imgUrlFieldName, img);
  const setImageKey = (imgKey?: string) => setValue(imgKeyFieldName, imgKey);

  const [file, setFile] = useState<File | null>(null);
  const onFileChange = (value: File | null) => setFile(value);

  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [progress, setProgress] = useState(0);

  const currentDisplayed: "fileUpload" | "copper" | "loading" | "imgDisplayed" = useMemo(() => {
    if (progress > 0 && progress < 100) return "loading";
    if (file) return "copper";
    if (currentImgUrl) return "imgDisplayed";
    return "fileUpload";
  }, [file, currentImgUrl, progress]);

  const onZoomChange = (zoom: number) => setZoom(zoom);
  const onCropChange = (point: Point) => setCrop(point);
  const onCropComplete = (_: Point, croppedAreaPixels: Area) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const handleCancel = () => setFile(null);

  const rollBackToInitImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("initImgKey : ", currentImgKey, " initImgUrl : ", currentImgUrl);
    e.preventDefault();
    setFile(null);
    setImageUrl(initImg);
    setImageKey(currentImgKey);
  };

  console.log("currentDisplayed : ", currentDisplayed);

  const Crop_OptimizeImage = async () => {
    if (!croppedAreaPixels || !file) {
      return;
    }

    try {
      setProgress(5);

      const croppedImage = await getCroppedImg(
        URL.createObjectURL(file),
        file.name,
        croppedAreaPixels,
      );
      if (!croppedImage) return;

      const optimizedImg = await prepareImageForUpload(croppedImage);
      const fileName = file.name.split(".")[0];

      setProgress(10);
      setFile(null);

      console.log("ouslililili");
      const s3Key = await uploadImageToS3_SIMULATOR({
        uploadedImg: optimizedImg.blob,
        name: fileName,
        entityType: entityType,
        purpose: imgPurpose,
        setProgress: (progress: any) => {
          setProgress(progress);
        },
      });

      setImageUrl(URL.createObjectURL(croppedImage));
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
    img: currentImgUrl,
    crop,
    zoom,
    currentDisplayed,
    onCropChange,
    onZoomChange,
    onCropComplete,
    onFileChange,
    handleCancel,
    Crop_OptimizeImage,
    rollBackToInitImage,
  };
};

export default useImageUpload;
