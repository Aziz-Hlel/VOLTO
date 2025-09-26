import { CloudUpload } from 'lucide-react'
import { FileInput, FileUploader } from '@/components/ui/file-upload'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import Cropper from 'react-easy-crop';
import { Button } from '../ui/button'
import type { MediaPurpose } from '@/types/enums/MediaPurpose'
import type { EntityType } from '@/types/enums/EntityType'
import CircularProgressBar from './CircularProgressBar '
import type { DropzoneOptions } from 'react-dropzone'
import useImageUpload from './hooks/use-Image-Upload';


const ImageUpload = ({ imgKeyFieldName, imgUrlFieldName, imgPurpose, entityType }: { imgKeyFieldName: string, imgUrlFieldName: string, imgPurpose: MediaPurpose, entityType: EntityType }) => {

    const maxSizeInMB = 4

    const maxSizeInBytes = maxSizeInMB * 1024 * 1024


    const dropZoneConfig: DropzoneOptions = {
        maxFiles: 1,
        maxSize: maxSizeInBytes,
        accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif"],
        },
        multiple: false,
    };


    const { getFieldState } = useFormContext();

    const fieldErrorMessage = getFieldState(imgKeyFieldName).error?.message
    console.log("imgUrlFieldName : ", imgUrlFieldName)
    const {
        currentDisplayed,
        file,
        img,
        progress,
        zoom,
        crop,
        Crop_OptimizeImage,
        rollBackToInitImage,
        handleCancel,
        onZoomChange,
        onCropChange,
        onCropComplete,
        onFileChange,
    } = useImageUpload({
        imgUrlFieldName: imgUrlFieldName,
        imgKeyFieldName: imgKeyFieldName,
        entityType: entityType,
        imgPurpose: imgPurpose
    })

    return (
        <>
            <div className=' h-96 '>

                {currentDisplayed === "fileUpload" &&
                    <FormItem className=''>
                        <FormLabel>Thumbnail</FormLabel>
                        <FormDescription>Select an image to upload.</FormDescription>
                        <FormControl>
                            <FileUploader
                                value={file}
                                onValueChange={onFileChange}
                                maxImageSize={maxSizeInBytes}
                                dropzoneOptions={dropZoneConfig}
                                className="relative  bg-background rounded-lg p-2"
                            >
                                {!file && <FileInput
                                    className="outline-dashed outline-1 outline-slate-500"

                                >
                                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                                        <CloudUpload className='text-gray-500 min-h-56 size-16' />
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
                        <FormMessage />
                    </FormItem>
                }

                {currentDisplayed === "copper" &&
                    <div className='relative w-full h-full flex flex-col justify-center items-center mr-auto '>
                        <div className=' text-sm text-left w-full font-semibold mb-1'>Thumbnail</div>
                        <div className=' text-sm text-left w-full text-gray-600 font-light mb-4'>
                            Crop Image to 9:16
                        </div>

                        <div className='border border-black rounded-lg border-dashed h-full w-full p-2 '>

                            <div className=' relative w-full h-60   '>

                                <div className='bg-white'>
                                    <Cropper
                                        image={file ? URL.createObjectURL(file) : ""}
                                        crop={crop}
                                        zoom={zoom}

                                        aspect={9 / 16}
                                        onCropChange={onCropChange}
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

                                    onChange={(e) => onZoomChange(e.target.valueAsNumber)}
                                    className=" w-full"
                                />
                            </div>
                            <div className=' w-full mr-auto flex justify-end gap-4'>
                                <Button onClick={handleCancel} variant="outline" className='cursor-pointer'>Cancel</Button>
                                <Button onClick={async () => await Crop_OptimizeImage()} variant="default" className='cursor-pointer'>Confirm</Button>
                            </div>
                        </div>
                    </div>


                }

                {currentDisplayed === "loading" &&
                    <div className='relative w-full h-full rounded-lg border border-black border-dashed flex flex-col justify-center '>

                        <div className='flex justify-center mx-auto gap-2'>
                            <span className=' -translate-y-0.5'>Loading</span>
                            <CircularProgressBar progress={progress} />
                        </div>

                    </div>


                }

                {currentDisplayed === "imgDisplayed" &&
                    <div className='relative w-full h-full flex flex-col justify-start '>
                        <div className=' text-sm text-left w-full font-semibold mb-1'>Thumbnail</div>
                        <div className=' text-sm text-left w-full text-gray-600 font-light mb-4'>
                            Uploaded Image
                        </div>

                        <div className='border border-black rounded-lg border-dashed h-full w-full p-2 '>

                            <img src={img} className=' mx-auto  h-60 object-contain rounded-lg' />

                            <div className='flex justify-end gap-4 px-4 pt-4'>
                                <Button onClick={rollBackToInitImage} variant="outline" className='cursor-pointer'>Cancel</Button>
                                <FileUploader
                                    value={file}
                                    onValueChange={onFileChange}
                                    maxImageSize={maxSizeInBytes}
                                    dropzoneOptions={dropZoneConfig}
                                    className=" w-fit"
                                >
                                    <FileInput>
                                        <Button onClick={(e) => { e.preventDefault(); }} variant="default" className='cursor-pointer'>Change</Button>
                                    </FileInput>
                                </FileUploader>
                            </div>
                        </div>

                    </div>


                }

            </div>
            <div className="text-red-500">{fieldErrorMessage}</div>
        </>

    )
}

export default ImageUpload