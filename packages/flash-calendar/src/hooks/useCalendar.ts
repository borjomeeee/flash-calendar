import { useMemo } from "react";

import type { DayState } from "@/components/CalendarItemDay";
import {
  addDays,
  endOfMonth,
  fromDateId,
  isWeekend,
  startOfMonth,
  startOfWeek,
  subDays,
  toDateId,
} from "@/helpers/dates";
import { range } from "@/helpers/numbers";

const getNumberOfEmptyCellsAtStart = (
  month: Date,
  firstDayOfWeek: "sunday" | "monday"
) => {
  const startOfMonthDay = month.getDay();

  if (firstDayOfWeek === "sunday") {
    return startOfMonthDay;
  }

  return startOfMonthDay === 0 ? 6 : startOfMonthDay - 1;
};

export interface SpecialDateParams {
  name: string;
  description: string;
}

export interface StayDateParams {
  stayId: string;
}

/** All fields that affects the day's state. */
export interface CalendarDayStateFields {
  /** Is this the start of a range? */
  isStartOfRange: DayState[];
  /**  Is this the end of a range? */
  isEndOfRange: DayState[];
  /** The state of the day */
  state: DayState[];
  /** Is the range valid (has both start and end dates set)? */
  isRangeValid: DayState[];

  additionalData: {
    specialDate?: SpecialDateParams;
    stayDate?: string;
    highSeasonDate?: boolean;
    [key: string]: any;
  };
}

/**
 * The type of each day in the calendar. Has a few pre-computed properties to
 * help increase re-rendering performance.
 */
export type CalendarDayMetadata = {
  date: Date;
  /** The day displayed in the desired format from `calendarDayFormat` */
  displayLabel: string;
  /** Does this day belong to a different month? */
  isDifferentMonth: boolean;
  /** Is this the last day of the month? */
  isEndOfMonth: boolean;
  /** Is this the last day of the week? */
  isEndOfWeek: boolean;
  /** Is this the first day of the month? */
  isStartOfMonth: boolean;
  /** Is this the first day of the week? */
  isStartOfWeek: boolean;
  /** Is this day part of the weekend? */
  isWeekend: boolean;

  /** The ID of this date is the `YYYY-MM-DD` representation */
  id: string;
} & CalendarDayStateFields;

/**
 * An active date range to highlight in the calendar.
 */
export interface CalendarDateRange {
  startId?: string;
  endId?: string;
}

export interface CalendarSpecialDate {
  dateId: string;
  name: string;
  description: string;
}

export interface CalendarStayDateRange extends CalendarDateRange {
  stayId: string;
}

export interface UseCalendarParams {
  /**
   * The calendar's month. It can be any date within the month, since it gets
   * normalized to the first day of the month.
   *
   * **Tip**: To convert to date ID, use `toDateId(date)`.
   */
  calendarMonthId: string;
  /**
   * The locale to use for the date formatting. If you're using custom
   * formatting functions, this value will be forwarded as the second argument.
   * @defaultValue "en-US"
   */
  calendarFormatLocale?: string;

  /**
   * A custom function to override the default month format ("January 2022").
   */
  getCalendarMonthFormat?: (date: Date, locale: string) => string;

  /**
   * A custom function to override the default month format ("S", "M", "T").
   */
  getCalendarWeekDayFormat?: (date: Date, locale: string) => string;
  /**
   * A custom function to override the default day format ("1", "9", "17").
   */
  getCalendarDayFormat?: (date: Date, locale: string) => string;
  /**
   * The day of the week to start the calendar with.
   * @defaultValue "sunday"
   */
  calendarFirstDayOfWeek?: "sunday" | "monday";
  /**
   * The active date ranges to highlight in the calendar.
   */
  calendarActiveDateRanges?: CalendarDateRange[];
  /**
   * The disabled date IDs. Dates in this list will be in the `disabled` state
   * unless they are part of an active range.
   */
  calendarDisabledDateIds?: CalendarDateRange[];

  /**
   * CUSTOM
   */
  calendarSpecialDateRange?: CalendarSpecialDate[];
  calendarStayDateRange?: CalendarStayDateRange[];
  calendarHighSeasonsDateRange?: CalendarDateRange[];
}

type GetStateFields = Pick<
  UseCalendarParams,
  | "calendarActiveDateRanges"
  | "calendarDisabledDateIds"
  | "calendarSpecialDateRange"
  | "calendarHighSeasonsDateRange"
  | "calendarStayDateRange"
> & {
  todayId?: string;
  id: string;
};

/**
 * Computes the state fields for a given date.
 */
export const getStateFields = ({
  todayId,
  id,
  calendarActiveDateRanges,
  calendarDisabledDateIds,
  calendarHighSeasonsDateRange,
  calendarSpecialDateRange,
  calendarStayDateRange,
}: GetStateFields): CalendarDayStateFields => {
  const activeRange = getRange(calendarActiveDateRanges || [], id);
  const stayDateRange = getRange(calendarStayDateRange || [], id);
  const highSeasonRange = getRange(calendarHighSeasonsDateRange || [], id);
  const disabledRange = getRange(calendarDisabledDateIds || [], id);

  const isActiveRange = !!activeRange;
  const isStayRange = !!stayDateRange;
  const isDisabled = !!disabledRange;
  const isHighSeasonDate = !!highSeasonRange;

  const specialDate = calendarSpecialDateRange?.find(({ dateId }) => {
    return dateId === id;
  });

  const isToday = todayId === id;
  const states: DayState[] = ["idle"];

  if (isHighSeasonDate) {
    states.push("high-season");
  }
  if (specialDate) {
    states.push("special-date");
  }
  if (isToday) {
    states.push("today");
  }
  if (isStayRange) {
    states.push("stay");
  }
  if (isDisabled) {
    states.push("disabled");
  }
  if (isActiveRange) {
    states.push("active");
  }

  return {
    isStartOfRange: [
      ["active", activeRange?.startId === id],
      ["stay", stayDateRange?.startId === id],
      ["disabled", disabledRange?.startId === id],
      ["high-season", highSeasonRange?.startId === id],
    ]
      .filter(([_, value]) => value)
      .map(([key]) => key as DayState),
    isEndOfRange: [
      ["active", activeRange?.endId === id],
      ["stay", stayDateRange?.endId === id],
      ["disabled", disabledRange?.endId === id],
      ["high-season", highSeasonRange?.endId === id],
    ]
      .filter(([_, value]) => value)
      .map(([key]) => key as DayState),

    isRangeValid: [
      [
        "active",
        activeRange?.startId &&
          activeRange?.endId &&
          id >= activeRange?.startId &&
          id <= activeRange?.endId,
      ],
      [
        "stay",
        stayDateRange?.startId &&
          stayDateRange?.endId &&
          id >= stayDateRange?.startId &&
          id <= stayDateRange?.endId,
      ],
      [
        "disabled",
        disabledRange?.startId &&
          disabledRange?.endId &&
          id >= disabledRange?.startId &&
          id <= disabledRange?.endId,
      ],
      [
        "high-season",
        highSeasonRange?.startId &&
          highSeasonRange?.endId &&
          id >= highSeasonRange?.startId &&
          id <= highSeasonRange?.endId,
      ],
    ]
      .filter(([_, value]) => value)
      .map(([key]) => key as DayState),

    state: states,

    additionalData: {
      isHighSeasonDate,
      specialDate,
      stayDate: stayDateRange?.stayId,
    },
  };
};

const getBaseCalendarMonthFormat = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
};
const getBaseCalendarWeekDayFormat = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    weekday: "narrow",
  }).format(date);
};

const getBaseCalendarDayFormat = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
  }).format(date);
};

/**
 * Builds a calendar based on the given parameters.
 */
export const buildCalendar = (params: UseCalendarParams) => {
  const {
    calendarMonthId: monthId,
    calendarFirstDayOfWeek = "sunday",
    calendarFormatLocale = "en-US",
    getCalendarMonthFormat = getBaseCalendarMonthFormat,
    getCalendarWeekDayFormat = getBaseCalendarWeekDayFormat,
    getCalendarDayFormat = getBaseCalendarDayFormat,
  } = params;

  const month = fromDateId(monthId);
  const monthStart = startOfMonth(month);
  const monthStartId = toDateId(monthStart);
  const monthEnd = endOfMonth(month);
  const monthEndId = toDateId(monthEnd);

  const emptyDaysAtStart = getNumberOfEmptyCellsAtStart(
    monthStart,
    calendarFirstDayOfWeek
  );

  const startOfWeekIndex = calendarFirstDayOfWeek === "sunday" ? 0 : 1;
  const endOfWeekIndex = calendarFirstDayOfWeek === "sunday" ? 6 : 0;

  const todayId = toDateId(new Date());

  // The first day to iterate is the first day of the month minus the empty days at the start
  let dayToIterate = subDays(monthStart, emptyDaysAtStart);

  const weeksList: CalendarDayMetadata[][] = [
    [
      ...range(1, emptyDaysAtStart).map((): CalendarDayMetadata => {
        const id = toDateId(dayToIterate);

        const dayShape: CalendarDayMetadata = {
          date: dayToIterate,
          displayLabel: getCalendarDayFormat(
            dayToIterate,
            calendarFormatLocale
          ),
          id,
          isDifferentMonth: true,
          isEndOfMonth: false,
          isEndOfWeek: dayToIterate.getDay() === endOfWeekIndex,
          isStartOfMonth: false,
          isStartOfWeek: dayToIterate.getDay() === startOfWeekIndex,
          isWeekend: isWeekend(dayToIterate),
          ...getStateFields({
            ...params,
            todayId,
            id,
          }),
        };
        dayToIterate = addDays(dayToIterate, 1);
        return dayShape;
      }),
    ],
  ];

  // By this point, we're back at the start of the month
  while (dayToIterate.getMonth() === monthStart.getMonth()) {
    const currentWeek = weeksList[weeksList.length - 1];
    if (currentWeek.length === 7) {
      weeksList.push([]);
    }
    const id = toDateId(dayToIterate);
    weeksList[weeksList.length - 1].push({
      date: dayToIterate,
      displayLabel: getCalendarDayFormat(dayToIterate, calendarFormatLocale),
      id,
      isDifferentMonth: false,
      isEndOfMonth: id === monthEndId,
      isEndOfWeek: dayToIterate.getDay() === endOfWeekIndex,
      isStartOfMonth: id === monthStartId,
      isStartOfWeek: dayToIterate.getDay() === startOfWeekIndex,
      isWeekend: isWeekend(dayToIterate),
      ...getStateFields({
        ...params,
        todayId,
        id,
      }),
    });
    dayToIterate = addDays(dayToIterate, 1);
  }

  // Once all the days of the month have been added, we need to add the empty days at the end
  const lastWeek = weeksList[weeksList.length - 1];
  const emptyDaysAtEnd = 7 - lastWeek.length;
  lastWeek.push(
    ...range(1, emptyDaysAtEnd).map(() => {
      const id = toDateId(dayToIterate);
      const dayShape: CalendarDayMetadata = {
        date: dayToIterate,
        displayLabel: getCalendarDayFormat(dayToIterate, calendarFormatLocale),
        id,
        isDifferentMonth: true,
        isEndOfMonth: false,
        isEndOfWeek: dayToIterate.getDay() === endOfWeekIndex,
        isStartOfMonth: false,
        isStartOfWeek: dayToIterate.getDay() === startOfWeekIndex,
        isWeekend: isWeekend(dayToIterate),
        ...getStateFields({
          ...params,
          todayId,
          id,
        }),
      };
      dayToIterate = addDays(dayToIterate, 1);
      return dayShape;
    })
  );

  const startOfWeekDate = startOfWeek(month, calendarFirstDayOfWeek);
  const weekDaysList = range(1, 7).map((i) =>
    getCalendarWeekDayFormat(
      addDays(startOfWeekDate, i - 1),
      calendarFormatLocale
    )
  );

  return {
    weeksList,
    calendarRowMonth: getCalendarMonthFormat(month, calendarFormatLocale),
    weekDaysList,
  };
};

/**
 * Returns a memoized calendar based on the given parameters.
 */
export const useCalendar = (params: UseCalendarParams) =>
  useMemo(() => buildCalendar(params), [params]);

function getRange<T extends CalendarDateRange>(range: T[], id: string) {
  return range.find(({ startId, endId }) => {
    if (startId && endId) {
      return id >= startId && id <= endId;
    }
    if (startId) {
      return id === startId;
    }
    if (endId) {
      return id === endId;
    }
    return false;
  });
}
