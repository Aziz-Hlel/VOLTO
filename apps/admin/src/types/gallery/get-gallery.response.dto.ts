import type { GalleryTags } from "./GalleryTags";

export type GalleryResponseDto = {
  tag: GalleryTags;

  id: string;

  thumbnail: {
    s3Key: string;
    url: string;
  };
};
