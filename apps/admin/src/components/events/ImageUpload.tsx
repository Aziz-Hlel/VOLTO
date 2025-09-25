import { CloudUpload } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import { FileInput, FileUploader } from '@/components/ui/file-upload'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import Cropper, { type Area, type Point } from 'react-easy-crop';
import { Button } from '../ui/button'
import getCroppedImg from './cropImg.func'
import prepareImageForUpload from './prepareImageForUpload'
import { toast } from "sonner";
import { uploadImageToS3_SIMULATOR } from './getSignedUrlUpload'
import type { MediaPurpose } from '@/types/enums/MediaPurpose'
import type { EntityType } from '@/types/enums/EntityType'


const ImageUpload = ({ imgFieldName, imgPurpose, entityType }: { imgFieldName: string, imgPurpose: MediaPurpose, entityType: EntityType }) => {

    const _1MB = 1024 * 1024
    const maxSize = 4 * _1MB

    const dropZoneConfig = {
        maxFiles: 1,
        maxSize: maxSize,
        // accept: "image/*",
        multiple: false,
    };


    const { watch, setValue } = useFormContext();
    const img = watch(imgFieldName) as string | undefined;
    const setImage = (img: string) => setValue(imgFieldName, img);

    const [file, setFile] = React.useState<File | null>(null);
    const [uploadedImg, setUploadedImg] = useState<string | undefined>(img);

    const currentDisplayed: "fileUpload" | "copper" | "imgDisplayed" = useMemo(() => {
        if (file) return "copper"
        if (img) return "imgDisplayed"
        return "fileUpload"
    }, [file, img])


    const [zoom, setZoom] = useState(1);

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [progress, setProgress] = useState(0);

    const onCropComplete = (_: Point, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const handleCancel = () => {
        setFile(null);
    }


    const showCroppedImage = async () => {
        if (!croppedAreaPixels || !file) {
            return
        }

        try {
            // handleDelete(0) // logic to delete previous image from s3 n all
            // setProgress(5)
            const croppedImage = await getCroppedImg(
                URL.createObjectURL(file),
                file.name,
                croppedAreaPixels,
            )
            if (!croppedImage) return
            setImage(URL.createObjectURL(croppedImage))
            console.log('t5l 2 croppedImage type :', typeof croppedImage);
            console.log("file name ::", croppedImage.name);

            const optimizedImg = await prepareImageForUpload(croppedImage);
            // setProgress(10)
            console.log('t5l 3 ');
            // console.log(optimizedImg.blob.name);
            setFile(null)
            uploadImageToS3_SIMULATOR({
                uploadedImg: optimizedImg.blob,
                name: "optimizedImg.blob.name",
                entityType: entityType,
                purpose: imgPurpose,
                setProgress: (progress: any) => { setProgress(progress) }
            });
            console.log('donee', { croppedImage })
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

    return (
        <>
            <div className=' h-96'>

                {currentDisplayed === "fileUpload" &&
                    <FormItem className=''>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormControl>
                            <FileUploader
                                value={file}
                                onValueChange={setFile}
                                maxImageSize={maxSize}
                                dropzoneOptions={dropZoneConfig}
                                className="relative  bg-background rounded-lg p-2"
                            >
                                {!file && <FileInput
                                    className="outline-dashed outline-1 outline-slate-500"

                                >
                                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                                        <CloudUpload className='text-gray-500 min-h-44' />
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span>
                                            &nbsp; or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            SVG, PNG, JPG or GIF
                                        </p>
                                    </div>
                                </FileInput>}

                                {/* {file &&
                                <FileUploaderItem index={0} >
                                    <Paperclip className="h-4 w-4 stroke-current" />
                                    <span>{file.name}</span>
                                </FileUploaderItem>
                            } */}
                            </FileUploader>

                        </FormControl>
                        <FormDescription>Select an image to upload.</FormDescription>
                        <FormMessage />
                    </FormItem>
                }

                {currentDisplayed === "copper" &&
                    <div className='relative w-full h-full flex flex-col justify-center items-center mr-auto p-2 border border-black rounded-lg border-dashed'>
                        <div>crop image</div>
                        <div className=' relative w-full h-full'>

                            <div className='    bg-white m-4  '>
                                <Cropper
                                    image={file ? URL.createObjectURL(file) : ""}
                                    crop={crop}
                                    zoom={zoom}

                                    aspect={9 / 16}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    classes={{
                                        containerClassName: "fixed  w-full h-full ",
                                    }}

                                />
                            </div>
                        </div>

                        <div className=" w-full mr-auto">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"

                                onChange={(e) => {
                                    setZoom(Number(e.target.value))
                                }}
                                className=" w-full"
                            />
                        </div>
                        <div className=' w-full mr-auto flex justify-end gap-4'>
                            <Button onClick={handleCancel} variant="outline">Cancel</Button>
                            <Button onClick={showCroppedImage} variant="default">Confirm</Button>
                        </div>
                    </div>


                }

                {currentDisplayed === "imgDisplayed" &&
                    <div className='relative w-full h-full rounded-lg border border-black border-dashed mx-auto flex flex-col '>

                            <div className=' mx-auto'>Image :</div>
                            <img src={img} className=' mx-auto  h-80 object-contain' />

                        <div className='  flex justify-end gap-4 p-4'>
                            <Button onClick={handleCancel} variant="outline">Cancel</Button>
                            <Button onClick={showCroppedImage} variant="default">Confirm</Button>
                        </div>
                    </div>


                }

            </div>

        </>

    )
}

export default ImageUpload