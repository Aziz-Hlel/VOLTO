

const FOOD = "FOOD";
const ALL = "ALL";
const LADIES_NIGHT = "LADIES_NIGHT";
const SPECIAL_EVENTS = "SPECIAL_EVENTS";
const VIBES = "VIBES";


export const GALLERY_TAGS = {
    FOOD,
    ALL,
    LADIES_NIGHT,
    SPECIAL_EVENTS,
    VIBES
} as const;


export type IGalleryTag = keyof typeof GALLERY_TAGS;


export const ordredTags: IGalleryTag[] = [ALL, SPECIAL_EVENTS, VIBES, FOOD, LADIES_NIGHT]