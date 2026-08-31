import { formatInTimeZone } from "date-fns-tz";
import { parseISO } from "date-fns";

export const BAHRAIN_TIMEZONE = "Asia/Bahrain";

/**
 * Formats a UTC ISO string to Bahrain timezone
 * @param utcIsoString - ISO 8601 UTC string from backend
 * @param formatString - date-fns format pattern
 * @returns Formatted string in Bahrain time
 */
export function formatInBahrainTime(
  date: string | Date,
  formatString = "PPpp", // e.g., "Nov 24, 2024 at 6:00 PM"
): string {
  return formatInTimeZone(
    typeof date === "string" ? parseISO(date) : date,
    BAHRAIN_TIMEZONE,
    formatString,
  );
}
