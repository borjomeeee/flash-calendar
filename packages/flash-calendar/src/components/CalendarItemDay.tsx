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
    flex: 1,
    justifyContent: "center",
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
        params: Omit<CalendarDayMetadata, "isStartOfRange" | "isEndOfRange"> & {
          isPressed: boolean;
          isHovered?: boolean;
          isFocused?: boolean;
          isStartOfRange?: boolean;
          isEndOfRange?: boolean;
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
    <Pressable onPress={handlePress} style={{ height }}>
      {({ pressed: isPressed, hovered: isHovered, focused: isFocused }) => {
        const params = {
          isPressed,
          isHovered,
          isFocused,
        };

        const baseStylesForStates = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...baseStyles?.[item]?.({
              ...params,
              ...metadata,
              isStartOfRange: metadata.isStartOfRange.includes(item),
              isEndOfRange: metadata.isEndOfRange.includes(item),
            }).content,
          };
          return acc;
        }, {});

        const statesStyles = metadata.state.reduce((acc, item) => {
          acc = {
            ...acc,
            ...theme?.[item]?.({
              ...params,
              ...metadata,
              isStartOfRange: metadata.isStartOfRange.includes(item),
              isEndOfRange: metadata.isEndOfRange.includes(item),
            }).content,
          };
          return acc;
        }, {});

        const Wrapper = metadata.state.reduce(
          (Acc, state, indx) => {
            const baseStylesForStatesContainer = {
              ...baseStyles?.[state]?.({
                ...params,
                ...metadata,
                isStartOfRange: metadata.isStartOfRange.includes(state),
                isEndOfRange: metadata.isEndOfRange.includes(state),
              }).container,
            };

            const statesStylesContainer = {
              ...theme?.[state]?.({
                ...params,
                ...metadata,
                isStartOfRange: metadata.isStartOfRange.includes(state),
                isEndOfRange: metadata.isEndOfRange.includes(state),
              }).container,
            };

            return ({ children }: { children: ReactNode }) => (
              <Acc>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    ...baseStylesForStatesContainer,
                    ...statesStylesContainer,
                  }}
                >
                  {children}
                </View>
              </Acc>
            );
          },
          (({ children }) => children) as React.FC<{
            children: ReactNode;
          }>
        );

        return (
          <Wrapper>
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
          </Wrapper>
        );
      }}
    </Pressable>
  );
};

interface CalendarItemDayContainerTheme {
  /** An empty view that acts as a spacer between each day. The spacing is
   * controlled by the `daySpacing` prop. */
  spacer?: ViewStyle;
  filler?: ViewStyle;
}

export interface CalendarItemDayContainerProps {
  children: ReactNode;

  isStartOfWeek: boolean;
  isEndOfWeek: boolean;

  theme?: CalendarItemDayTheme;
  /**
   * The spacing between each day
   */
  daySpacing: number;
  /** The day's height */
  dayHeight: number;
  /** Calendar hotizontal padding */
  calendarHorizontalPadding: number;

  metadata: CalendarDayMetadata;
  CalendarDot?: React.FC;

  show?: boolean;
}

export const CalendarItemDayContainer = ({
  children,
  isStartOfWeek,
  isEndOfWeek,
  daySpacing,
  dayHeight,
  calendarHorizontalPadding,
  metadata,
  theme,
  CalendarDot,
}: CalendarItemDayContainerProps) => {
  const showFiller = metadata.state.filter((item) => {
    const isEndOfRange = metadata.isEndOfRange.includes(item);

    if (isEndOfRange) {
      return false;
    }

    if (!metadata.isRangeValid.includes(item)) {
      return false;
    }

    return true;
  });

  const showHorizontalFiller = metadata.state.filter((item) => {
    const isEndOfRange = metadata.isEndOfRange.includes(item);
    const isStartOfRange = metadata.isStartOfRange.includes(item);

    if (!metadata.isRangeValid.includes(item)) {
      return false;
    }

    if (isStartOfRange && !isEndOfWeek) {
      return false;
    }

    if (isEndOfRange && !isStartOfWeek) {
      return false;
    }

    return true;
  });

  const spacerStyles = useMemo<ViewStyle>(() => {
    return {
      position: "relative",
      marginLeft: isStartOfWeek ? 0 : daySpacing,
      flex: 1,
      height: dayHeight,
      overflow: "visible",
    };
  }, [dayHeight, daySpacing, isStartOfWeek]);

  const dayFiller = useMemo(() => {
    if (isEndOfWeek) {
      return null;
    }

    const params = {
      isPressed: false,
      isHovered: false,
      isFocused: false,
    };

    return showFiller.reduce((acc, item, indx) => {
      return [
        ...acc,
        <View
          key={indx}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: -daySpacing - 1, // +1 to cover the 1px gap
            width: daySpacing + 2, // +2 to cover the 1px gap (distributes evenly on both sides)
            ...theme?.[item]?.({
              ...params,
              ...metadata,
              isEndOfRange: false,
              isStartOfRange: false,
            }).container,
          }}
        />,
      ];
    }, [] as React.ReactNode[]);
  }, [daySpacing, isEndOfWeek, theme, metadata, showFiller]);

  const dayFillerStart = useMemo(() => {
    if (!isStartOfWeek) {
      return null;
    }

    const params = {
      isPressed: false,
      isHovered: false,
      isFocused: false,
    };
    return showHorizontalFiller.reduce((acc, item, indx) => {
      return [
        ...acc,
        <View
          key={indx}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: -(calendarHorizontalPadding + 1), // +1 to cover the 1px gap
            width: calendarHorizontalPadding + 2, // +2 to cover the 1px gap (distributes evenly on both sides)
            ...theme?.[item]?.({
              ...params,
              ...metadata,
              isEndOfRange: false,
              isStartOfRange: false,
            }).container,
          }}
        />,
      ];
    }, [] as React.ReactNode[]);
  }, [
    calendarHorizontalPadding,
    isStartOfWeek,
    theme,
    metadata,
    showHorizontalFiller,
  ]);

  const dayFillerEnd = useMemo(() => {
    if (!isEndOfWeek) {
      return null;
    }

    const params = {
      isPressed: false,
      isHovered: false,
      isFocused: false,
    };

    return showHorizontalFiller.reduce((acc, item, indx) => {
      return [
        ...acc,
        <View
          key={indx}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: -calendarHorizontalPadding - 1, // +1 to cover the 1px gap
            width: calendarHorizontalPadding + 1, // +2 to cover the 1px gap (distributes evenly on both sides)
            ...theme?.[item]?.({
              ...params,
              ...metadata,
              isEndOfRange: false,
              isStartOfRange: false,
            }).container,
          }}
        />,
      ];
    }, [] as React.ReactNode[]);
  }, [
    calendarHorizontalPadding,
    isEndOfWeek,
    theme,
    metadata,
    showHorizontalFiller,
  ]);

  return (
    <View style={spacerStyles}>
      {dayFillerStart}
      {children}
      {dayFiller}
      {metadata.additionalData.specialDate && CalendarDot ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <CalendarDot />
        </View>
      ) : null}
      {dayFillerEnd}
    </View>
  );
};

export interface CalendarItemDayWithContainerProps
  extends Omit<CalendarItemDayProps, "height">,
    Pick<CalendarItemDayContainerProps, "daySpacing" | "dayHeight"> {
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
  /** Calendar hotizontal padding */
  calendarHorizontalPadding: number;

  CalendarDot?: React.FC;
}

export const CalendarItemDayWithContainer = ({
  children,
  metadata: baseMetadata,
  onPress,
  theme,
  dayHeight,
  daySpacing,
  calendarHorizontalPadding,
  calendarInstanceId,
  CalendarDot,
}: CalendarItemDayWithContainerProps) => {
  const metadata = useOptimizedDayMetadata(baseMetadata, calendarInstanceId);

  return (
    <CalendarItemDayContainer
      CalendarDot={CalendarDot}
      calendarHorizontalPadding={calendarHorizontalPadding}
      dayHeight={dayHeight}
      daySpacing={daySpacing}
      isEndOfWeek={metadata.isEndOfWeek}
      isStartOfWeek={metadata.isStartOfWeek}
      metadata={metadata}
      theme={theme as any}
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
