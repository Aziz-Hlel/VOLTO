import { GALLERY_TAGS, type IGalleryTag } from "@/types/GalleryTag";
import { useState } from "react";
import voltoImageGallery from "@/data/gallery";
import DomeGallery from "./DomeGallery";

const Gallery = () => {
  const [selectedTag, setTag] = useState<IGalleryTag>(GALLERY_TAGS.ALL);

  const galleryImages = voltoImageGallery
    .filter((image) => image.tags.includes(selectedTag))
    .map((image) => image.imageUrl);

  return (
    <>
      <div className="w-full  flex flex-col bg-black/85 ">
        {/* <GalleryHeroSection /> */}

        <div className="h-full w-full flex flex-col">
          <div className=" w-full  min-h-96 h-screen">
            <DomeGallery
              images={galleryImages}
              grayscale={false}
              fit={1}
              segments={20}
              minRadius={1000}
              GalleryChips={{ selectedTag, setTag }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
