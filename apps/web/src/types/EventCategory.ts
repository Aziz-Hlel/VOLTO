const WEEKLY = "Weekly Events";
const SPECIAL = "Special Events";

const EventCategory = {
  WEEKLY,
  SPECIAL,
} as const;

export default EventCategory;

export type IEventCategory = keyof typeof EventCategory;
