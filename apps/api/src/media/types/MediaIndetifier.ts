import type { EntityType, MediaPurpose } from '@prisma/client';

export interface MediaIdentifier {
  entityId: string;
  entityType: EntityType;
  mediaPurpose: MediaPurpose;
}
