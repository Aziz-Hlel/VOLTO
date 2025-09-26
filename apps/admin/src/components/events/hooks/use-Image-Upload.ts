import { useMemo, useState } from "react";
import type { Area, Point } from "react-easy-crop";
import { useFormContext } from "react-hook-form";
import getCroppedImg from "../cropImg.func";
import prepareImageForUpload from "../prepareImageForUpload";
import { uploadImageToS3_SIMULATOR } from "../getSignedUrlUpload";
import { toast } from "sonner";
import type { EntityType } from "@/types/enums/EntityType";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";



type IuseImageUpload = {
    imgUrlFieldName: string;
    imgKeyFieldName: string;
    entityType: EntityType;
    imgPurpose: MediaPurpose;

}

const useImageUpload = ({ imgUrlFieldName, imgKeyFieldName, entityType, imgPurpose }: IuseImageUpload) => {


    const { watch, setValue, getValues } = useFormContext();


    const initImgUrl = getValues(imgUrlFieldName) as string | undefined;
    const initImgKey = getValues(imgKeyFieldName) as string | undefined;

    const initImg = useMemo(() => initImgUrl, [])
    console.log("initImg : ", initImg)
    console.log("zabbourom niti url img value : ", initImgUrl)
    const setImageUrl = (img?: string) => setValue(imgUrlFieldName, img);
    const setImageKey = (imgKey?: string) => setValue(imgKeyFieldName, imgKey);

    const [file, setFile] = useState<File | null>(null);
    const onFileChange = (value: File | null) => setFile(value);

    const [zoom, setZoom] = useState(1);
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)


    const [progress, setProgress] = useState(0);

    const currentDisplayed: "fileUpload" | "copper" | "loading" | "imgDisplayed" = useMemo(() => {
        if (progress > 0 && progress < 100) return "loading"
        if (file) return "copper"
        if (initImgUrl) return "imgDisplayed"
        return "fileUpload"
    }, [file, initImgUrl, progress])

    const onZoomChange = (zoom: number) => setZoom(zoom);
    const onCropChange = (point: Point) => setCrop(point);
    const onCropComplete = (_: Point, croppedAreaPixels: Area) => setCroppedAreaPixels(croppedAreaPixels)

    const handleCancel = () => setFile(null);



    const rollBackToInitImage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("initImgKey : ", initImgKey, " initImgUrl : ", initImgUrl)
        e.preventDefault();
        setFile(null);
        setImageUrl(initImg);
        setImageKey(initImgKey);
    }


    console.log("currentDisplayed : ", currentDisplayed)


    const Crop_OptimizeImage = async () => {
        if (!croppedAreaPixels || !file) {
            return
        }

        try {

            setProgress(5)

            const croppedImage = await getCroppedImg(
                URL.createObjectURL(file),
                file.name,
                croppedAreaPixels,
            )
            if (!croppedImage) return

            const optimizedImg = await prepareImageForUpload(croppedImage);
            const fileName = file.name.split(".")[0];

            setProgress(10)
            setFile(null)

            console.log('ouslililili')
            const s3Key = await uploadImageToS3_SIMULATOR({
                uploadedImg: optimizedImg.blob,
                name: fileName,
                entityType: entityType,
                purpose: imgPurpose,
                setProgress: (progress: any) => { setProgress(progress) }
            });

            setImageUrl(URL.createObjectURL(croppedImage))
            setImageKey(s3Key)

        } catch (e) {
            console.error(e)
            toast("Something Went Wrong", {
                description: "Unable to upload image, if the issue persists please contact support",
                action: {
                    label: "Ok",
                    onClick: () => "",
                },
            })
        }
    }



    return {
        file,
        progress,
        img: initImgUrl,
        crop,
        zoom,
        currentDisplayed,
        onCropChange,
        onZoomChange,
        onCropComplete,
        onFileChange,
        handleCancel,
        Crop_OptimizeImage,
        rollBackToInitImage
    }
}


export default useImageUpload;