import type { EntityType } from "../enums/EntityType";
import type { MediaPurpose } from "../enums/MediaPurpose";
import type { IMimeType } from "./IMimeType";

export type PreSignedUrlRequest = {
  mimeType: string;

  fileSize: number;

  fileType: IMimeType;

  originalName: string;

  entityType: EntityType;

  mediaPurpose: MediaPurpose;
};
