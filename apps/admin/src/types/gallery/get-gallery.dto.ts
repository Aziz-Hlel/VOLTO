import type { GalleryTags } from "./GalleryTags";

export type GetGalleryDto = {

    page: number;

    limit: number;

    tag: GalleryTags;
}
