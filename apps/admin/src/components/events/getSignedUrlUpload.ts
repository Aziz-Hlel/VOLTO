import mediaService from "@/Api/services/media.service";
import type { EntityType } from "@/types/enums/EntityType";
import type { MediaPurpose } from "@/types/enums/MediaPurpose";
import type { IMimeType } from "@/types/media/IMimeType";

import axios from "axios";




export const getSignedUrlUpload = async ({ fileName, mimeType, fileType, entityType, fileSize, purpose }: { fileName: string, mimeType: string, fileType: IMimeType, entityType: EntityType, fileSize: number, purpose: MediaPurpose }) => {

    const response = await mediaService.presignedUrl({
        mimeType: mimeType,
        fileSize,
        fileType: fileType as IMimeType,
        originalName: fileName,
        entityType,
        mediaPurpose: purpose
    })

    if (!response.success) {
        console.log(response.error)
        throw new Error();
    }

    return response.data;
}



export const uploadImageToS3_SIMULATOR = async ({ uploadedImg, name, purpose, entityType, setProgress }: { uploadedImg: Blob, name: string, entityType: EntityType, purpose: MediaPurpose, setProgress: Function }) => {

    const { type: mimeType, size } = uploadedImg

    const [_, subtype] = mimeType.split('/');
    // console.log(type);    // "image"
    console.log(subtype); // "webp"

    const { url, s3Key } = await getSignedUrlUpload({
        fileName: name,
        mimeType,
        fileType: subtype as IMimeType,
        entityType,
        fileSize: size,
        purpose
    });

    console.log("aws url for the upload : ", url);


    // const response = await Http.put(url, uploadedImg);

    try {
        await axios.put(url, uploadedImg, {
            headers: {
                'Content-Type': uploadedImg.type,
            },
            onUploadProgress: (event) => {
                const percent = Math.round((event.loaded * 100) / (event.total || 1));
                setProgress(percent);
            },
        });

        setProgress(100);
        setTimeout(() => setProgress(null), 500); // Reset after complete
    } catch (err) {
        console.error("Upload failed", err);
        setProgress(null);
    } finally {
        // setUploading(false);
    }

    // console.log("response", response?.data);

    return s3Key

}
