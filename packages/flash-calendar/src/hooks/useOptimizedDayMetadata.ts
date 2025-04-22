import mitt from "mitt";
import { useEffect, useState } from "react";

import { getStateFields } from "@/hooks/useCalendar";
import type {
  CalendarSpecialDate,
  CalendarStayDateRange,
  CalendarDateRange,
  CalendarDayMetadata,
} from "@/hooks/useCalendar";

interface OnSetActiveDateRangesPayload {
  instanceId?: string;
  todayId: string;
  ranges: CalendarDateRange[];
  disabledRanges: CalendarDateRange[];
  specialDateRanges: CalendarSpecialDate[];
  stayDateRange: CalendarStayDateRange[];
  highSeasonRange: CalendarDateRange[];
}

/**
 * An event emitter for the active date ranges. This notifies the calendar items
 * when their state changes, allowing just the affected items to re-render.
 *
 * While this is an implementation detail focused on improving performance, it's
 * exported in case you need to build your own calendar. Check the source code
 * for a reference implementation.
 */
export const activeDateRangesEmitter = mitt<{
  onSetActiveDateRanges: OnSetActiveDateRangesPayload;
}>();

/**
 * The default calendar instance ID. This is used when no instance ID is provided.
 */
const DEFAULT_CALENDAR_INSTANCE_ID = "flash-calendar-default-instance";

/**
 * Returns an optimized metadata for a particular day. This hook listens to the
 * `activeDateRanges` emitter, enabling only the affected calendar items to
 * re-render.
 *
 * While this is an implementation detail focused on improving performance, it's
 * exported in case you need to build your own calendar. Check the source code
 * for a reference implementation.
 */
export const useOptimizedDayMetadata = (
  baseMetadata: CalendarDayMetadata,
  calendarInstanceId?: string
) => {
  const [metadata, setMetadata] = useState(baseMetadata);

  const safeCalendarInstanceId =
    calendarInstanceId ?? DEFAULT_CALENDAR_INSTANCE_ID;

  // Ensure the metadata is updated when the base changes.
  useEffect(() => {
    setMetadata(baseMetadata);
  }, [baseMetadata]);

  useEffect(() => {
    const handler = (payload: OnSetActiveDateRangesPayload) => {
      const {
        todayId,
        ranges,
        disabledRanges,
        specialDateRanges,
        stayDateRange,
        highSeasonRange,
        instanceId = DEFAULT_CALENDAR_INSTANCE_ID,
      } = payload;
      if (instanceId !== safeCalendarInstanceId) {
        // This event is not for this instance, ignore it.
        return;
      }

      // We're only interested in the active date ranges, no need to worry about
      // disabled states. These are already covered by the base metadata.
      const fields = getStateFields({
        id: metadata.id,
        todayId,
        calendarActiveDateRanges: ranges,
        calendarDisabledDateIds: disabledRanges,
        calendarSpecialDateRange: specialDateRanges,
        calendarStayDateRange: stayDateRange,
        calendarHighSeasonsDateRange: highSeasonRange,
      });

      const propertiesSame = Object.entries(fields).every(([key, value]) => {
        if (typeof value === "object") {
          return (
            JSON.stringify(value) === JSON.stringify((metadata as any)[key])
          );
        } else {
          return value === (metadata as any)[key];
        }
      });

      if (!propertiesSame) {
        setMetadata((prev) => ({
          ...prev,
          ...fields,
        }));
      }
    };

    activeDateRangesEmitter.on("onSetActiveDateRanges", handler);

    return () => {
      activeDateRangesEmitter.off("onSetActiveDateRanges", handler);
    };
  }, [baseMetadata, safeCalendarInstanceId, metadata]);

  return metadata;
};
