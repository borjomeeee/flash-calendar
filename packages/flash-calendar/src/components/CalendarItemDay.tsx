import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import type { TextProps, TextStyle, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { BaseTheme } from "@/helpers/tokens";
import type { CalendarDayMetadata } from "@/hooks/useCalendar";
import { useOptimizedDayMetadata } from "@/hooks/useOptimizedDayMetadata";
import { useTheme } from "@/hooks/useTheme";

import type { CalendarOnDayPress } from "./Calendar";

// react-native-web/overrides.ts
declare module "react-native" {
  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    flex: 1,
  },
  baseContent: {
    textAlign: "center",
  },
});

export type DayState =
  | "idle"
  | "active"
  | "today"
  | "disabled"
  | "stay"
  | "high-season"
  | "special-date";

interface DayTheme {
  container: Omit<ViewStyle, "borderRadius">;
  content: TextStyle;
}
type CalendarItemDayTheme = Partial<
  Record<
    DayState,
    (params: {
      isStartOfRange: boolean;
      isEndOfRange: boolean;
      isPressed: boolean;
      isHovered?: boolean;
      isFocused?: boolean;
    }) => DayTheme
  >
>;

const buildBaseStyles = (theme: BaseTheme): CalendarItemDayTheme => {
  const baseContent = {
    ...styles.baseContent,
    color: theme.colors.content.primary,
  };

  return {
    active: ({ isPressed, isHovered, isStartOfRange, isEndOfRange }) => {
      const baseStyles: DayTheme & { container: ViewStyle } =
        isPressed || isHovered
          ? {
              container: {
                ...styles.baseContainer,
                backgroundColor: theme.colors.background.tertiary,
              },
              content: {
                ...baseContent,
                color: theme.colors.content.primary,
              },
            }
          : {
              container: {
                ...styles.baseContainer,
                backgroundColor: theme.colors.background.inverse.primary,
              },
              content: {
                ...baseContent,
                color: theme.colors.content.inverse.primary,
              },
            };

      baseStyles.container.borderRadius = 0;
      if (isStartOfRange) {
        baseStyles.container.borderTopLeftRadius = 16;
        baseStyles.container.borderBottomLeftRadius = 16;
      }
      if (isEndOfRange) {
        baseStyles.container.borderTopRightRadius = 16;
        baseStyles.container.borderBottomRightRadius = 16;
      }
      if (!isStartOfRange && !isEndOfRange) {
        baseStyles.container.borderRadius = 0;
      }
      return baseStyles;
    },
    disabled: () => ({
      container: styles.baseContainer,
      content: {
        ...baseContent,
        color: theme.colors.content.disabled,
      },
    }),
    stay: () => ({
      container: styles.baseContainer,
      content: baseContent,
    }),
    idle: ({ isPressed, isHovered }) => {
      return isPressed || isHovered
        ? {
            container: {
              ...styles.baseContainer,
              backgroundColor: theme.colors.background.tertiary,
            },
            content: {
              ...baseContent,
              color: theme.colors.content.primary,
            },
          }
        : {
            container: styles.baseContainer,
            content: baseContent,
          };
    },
    today: ({ isPressed, isHovered }) => {
      return isPressed || isHovered
        ? {
            container: {
              ...styles.baseContainer,
              backgroundColor: theme.colors.background.tertiaryPressed,
            },
            content: baseContent,
          }
        : {
            container: {
              ...styles.baseContainer,
              borderColor: theme.colors.borders.default,
              borderStyle: "solid",
              borderWidth: 1,
            },
            content: baseContent,
          };
    },
  };
};

export interface CalendarItemDayProps {
  children: ReactNode;
  onPress: CalendarOnDayPress;
  metadata: CalendarDayMetadata;
  theme?: Partial<
    Record<
      DayState | "base",
      (
        params: CalendarDayMetadata & {
          isPressed: boolean;
          isHovered?: boolean;
          isFocused?: boolean;
        }
      ) => Partial<DayTheme>
    >
  >;
  /** The cell's height */
  height: number;
  /** Optional TextProps to spread to the <Text> component. */
  textProps?: Omit<TextProps, "children" | "onPress">;
}

/**
 * The base calendar item day component. This component is responsible for
 * rendering each day cell, along with its event handlers.
 *
 * This is not meant to be used directly. Instead, use the
 * `CalendarItemDayWithContainer`, since it also includes the spacing between
 * each day.
 */
export const CalendarItemDay = ({
  onPress,
  children,
  theme,
  height,
  metadata,
  textProps,
}: CalendarItemDayProps) => {
  const baseTheme = useTheme();
  const baseStyles = useMemo(() => {
    return buildBaseStyles(baseTheme);
  }, [baseTheme]);

  const handlePress = useCallback(() => {
    onPress(metadata.id, metadata);
  }, [metadata, onPress]);

  return (
    <Pressable
      disabled={metadata.state.includes("disabled")}
      onPress={handlePress}
      style={({
        pressed: isPressed,
        hovered: isHovered,
        focused: isFocused,
      }) => {
        const params = {
          isPressed,
          isHovered,
          isFocused,
          isEndOfRange: metadata.isEndOfRange ?? false,
          isStartOfRange: metadata.isStartOfRange ?? false,
        };
        const radiusStyles: ViewStyle = {};
        radiusStyles.borderRadius = 0;
        if (params.isStartOfRange) {
          radiusStyles.borderTopLeftRadius = 16;
          radiusStyles.borderBottomLeftRadius = 16;
        }
        if (params.isEndOfRange) {
          radiusStyles.borderTopRightRadius = 16;
          radiusStyles.borderBottomRightRadius = 16;
        }
        if (!params.isStartOfRange && !params.isEndOfRange) {
          radiusStyles.borderRadius = 0;
        }

        const baseStylesForStates = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...baseStyles?.[item]?.({ ...params, ...metadata }).container,
          };
          return acc;
        }, {});

        const statesStyles = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...theme?.[item]?.({ ...params, ...metadata }).container,
          };
          return acc;
        }, {});
        return {
          height,
          ...baseStylesForStates,
          ...radiusStyles,
          ...statesStyles,
        };
      }}
    >
      {({ pressed: isPressed, hovered: isHovered, focused: isFocused }) => {
        const params = {
          isPressed,
          isHovered,
          isFocused,
          isEndOfRange: metadata.isEndOfRange ?? false,
          isStartOfRange: metadata.isStartOfRange ?? false,
        };

        const baseStylesForStates = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...baseStyles?.[item]?.({ ...params, ...metadata }).content,
          };
          return acc;
        }, {});

        const statesStyles = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...theme?.[item]?.({ ...params, ...metadata }).content,
          };
          return acc;
        }, {});
        return (
          <Text
            {...textProps}
            style={{
              ...(textProps?.style ?? ({} as object)),
              ...baseStylesForStates,
              ...statesStyles,
            }}
          >
            {children}
          </Text>
        );
      }}
    </Pressable>
  );
};

interface CalendarItemDayContainerTheme {
  /** An empty view that acts as a spacer between each day. The spacing is
   * controlled by the `daySpacing` prop. */
  spacer?: ViewStyle;
  /** An absolute positioned filler to join the active days together in a single
   * complete range. */
  activeDayFiller?: ViewStyle;
  stayDayFiller?: ViewStyle;
  specialDateDot?: ViewStyle;
}

export interface CalendarItemDayContainerProps {
  children: ReactNode;
  isStartOfWeek: boolean;
  /**
   * If true, the active day filler/extension will be shown. The filler is used
   * as a visual effect to join the active days together in a complete range.
   */
  shouldShowActiveDayFiller?: boolean;
  theme?: CalendarItemDayContainerTheme;
  /**
   * The spacing between each day
   */
  daySpacing: number;
  /** The day's height */
  dayHeight: number;
  /** CUSTOM */
  stay?: string;
  shouldShowSpecialDateDot?: boolean;
}

export const CalendarItemDayContainer = ({
  children,
  isStartOfWeek,
  shouldShowActiveDayFiller,
  shouldShowSpecialDateDot,
  theme,
  daySpacing,
  dayHeight,
  stay,
}: CalendarItemDayContainerProps) => {
  const baseTheme = useTheme();
  const spacerStyles = useMemo<ViewStyle>(() => {
    return {
      position: "relative",
      marginLeft: isStartOfWeek ? 0 : daySpacing,
      flex: 1,
      height: dayHeight,
      ...theme?.spacer,
    };
  }, [dayHeight, daySpacing, isStartOfWeek, theme?.spacer]);

  const activeDayFiller = useMemo<ViewStyle | null>(() => {
    if (!shouldShowActiveDayFiller) {
      return null;
    }

    return {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: -(daySpacing + 1), // +1 to cover the 1px gap
      width: daySpacing + 2, // +2 to cover the 1px gap (distributes evenly on both sides)
      backgroundColor: baseTheme.colors.background.inverse.primary,
      ...(stay ? theme?.stayDayFiller : theme?.activeDayFiller),
    };
  }, [
    baseTheme.colors.background.inverse.primary,
    daySpacing,
    shouldShowActiveDayFiller,
    theme?.activeDayFiller,
    theme?.stayDayFiller,
    stay,
  ]);

  const specialDateDot = useMemo(() => {
    if (!shouldShowSpecialDateDot) {
      return null;
    }

    return {
      alignSelf: "center" as const,
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: baseTheme.colors.background.inverse.primary,
      ...theme?.specialDateDot,
    };
  }, [
    shouldShowSpecialDateDot,
    baseTheme.colors.background.inverse.primary,
    theme?.specialDateDot,
  ]);

  return (
    <View style={spacerStyles}>
      {children}
      {activeDayFiller ? <View style={activeDayFiller} /> : null}
      {specialDateDot ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View style={specialDateDot} />
        </View>
      ) : null}
    </View>
  );
};

export interface CalendarItemDayWithContainerProps
  extends Omit<CalendarItemDayProps, "height">,
    Pick<CalendarItemDayContainerProps, "daySpacing" | "dayHeight"> {
  containerTheme?: CalendarItemDayContainerTheme;
  /**
   * A unique identifier for this calendar instance. This is useful if you
   * need to render more than one calendar at once. This allows Flash Calendar
   * to scope its state to the given instance.
   *
   * No need to get fancy with `uuid` or anything like that - a simple static
   * string is enough.
   *
   * If not provided, Flash Calendar will use a default value which will hoist
   * the state in a global scope.
   */
  calendarInstanceId?: string;
}

export const CalendarItemDayWithContainer = ({
  children,
  metadata: baseMetadata,
  onPress,
  theme,
  dayHeight,
  daySpacing,
  containerTheme,
  calendarInstanceId,
}: CalendarItemDayWithContainerProps) => {
  const metadata = useOptimizedDayMetadata(baseMetadata, calendarInstanceId);

  return (
    <CalendarItemDayContainer
      dayHeight={dayHeight}
      daySpacing={daySpacing}
      isStartOfWeek={metadata.isStartOfWeek}
      shouldShowActiveDayFiller={
        metadata.isRangeValid && !metadata.isEndOfWeek
          ? !metadata.isEndOfRange
          : false
      }
      shouldShowSpecialDateDot={!!metadata.specialDate}
      stay={metadata.stayDate}
      theme={containerTheme}
    >
      <CalendarItemDay
        height={dayHeight}
        metadata={metadata}
        onPress={onPress}
        theme={theme}
      >
        {children}
      </CalendarItemDay>
    </CalendarItemDayContainer>
  );
};
