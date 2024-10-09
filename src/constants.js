const { StyleSheet, Platform } = require("react-native");

const PLATFORM = Platform.OS;

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const WEEKDAYS_EU = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const THEMES_MASKS = {
  st_theme__light: "Light",
  st_theme__dark: "Dark",
  st_theme__system: "System",
};

const THEMEV = {
  st_theme__light: {
    label: "light",
    headerGradientStart: "#95f4cb",
    headerGradientEnd: "#3cd0a4",
    tabsGradientStart: "#4eaa90",
    tabsGradientEnd: "#4eaa90",
    tabsColor: "#4e4e4f",
    tabsActiveColor: "#338fe4",
    background: "#f7fafe",
    bgHighlight: "#ffffff",
    bgHighlightSec: "#e3e7f3",
    bgHighlightTh: "#eef6ff",
    borderColor: "#ebeef4",
    borderColorSec: "#e6ebf4",
    borderColorTh: "#e0e5ee",
    textColor: "#44677a",
    textColorHighlight: "#000",
    textColorRevert: "#fff",
    crossSymb: "#c3ccdb",
    crossSymbL: "#e0e5ee",
    thumbBackground: "#e5e5ea",
    thumbBackgroundIos: "#ffffff",
    copyright: "#c3c7d3",
    chevron: "#b3b7c1",
    chevronText: "#a8adb8",
    borderGraphColor: "#e8f1fe",
    borderLinesColor: "#ebedf1",
    dayGraphColor: "#dee8f6",
    calendarBorderColor: "#d6dde6",
    monthGeneral: "#e4edf8",
    monthGeneralActive: "#ffffff",
    navigationBarColor: "#ffffff",
    green: "#5eee5e",
    red: "#ee5e65",
    gray: "#515455",
    green_dimmed: "rgba(94, 238, 94, 0.1)",
    red_dimmed: "rgba(238, 94, 101, 0.1)",
    gray_dimmed: "rgb(81, 84, 85, 0.1)",
  },
  st_theme__dark: {
    label: "dark",
    headerGradientStart: "#8ae4c0",
    headerGradientEnd: "#35bea3",
    tabsGradientStart: "#418e78",
    tabsGradientEnd: "#418e78",
    tabsColor: "#585858",
    tabsActiveColor: "#2897cf",
    background: "#000000",
    bgHighlight: "#16161a",
    bgHighlightSec: "#222228",
    bgHighlightTh: "#222228",
    borderColor: "#000000",
    borderColorSec: "#1f2022",
    borderColorTh: "#2e3033",
    textColor: "#c0cdd9",
    textColorHighlight: "#fff",
    textColorRevert: "#fff",
    crossSymb: "#45474b",
    crossSymbL: "#484b44",
    thumbBackground: "#45474b",
    thumbBackgroundIos: "#45474b",
    chevron: "#888c95",
    chevronText: "#ccd1db",
    borderGraphColor: "#4b4f53",
    borderLinesColor: "#363739",
    dayGraphColor: "#484c50",
    calendarBorderColor: "#313337",
    monthGeneral: "#1e2022",
    monthGeneralActive: "#2c2d2f",
    navigationBarColor: "#1c1c21",
    green: "#5eee5e",
    red: "#ee5e65",
    gray: "#515455",
    green_dimmed: "rgba(94, 238, 94, 0.1)",
    red_dimmed: "rgba(238, 94, 101, 0.1)",
    gray_dimmed: "rgb(81, 84, 85, 0.1)",
  },
};

const REPEAT_MASKS = {
  "every-day": "Every Day",
  "every-week": "Every Week",
  "3-times-week": "3 times per week",
  "5-times-week": "5 times per week",
};

const REPEAT_GAP_VALUES = {
  "every-day": {
    scale: 30, // day_percent * scale = 100%
    gratitude_percent: 100 / 30, // % score for extra days
    day_percent: 100 / 30, // score for specified days
    reset_gap: 4, // when score resets
  },
  "every-week": {
    scale: 33,
    gratitude_percent: 100 / (4 * 0.1),
    day_percent: 100 / 33,
    reset_gap: 12,
  },
  "3-times-week": {
    scale: 33,
    gratitude_percent: 100 / (12 * 0.3),
    day_percent: 100 / 33,
    reset_gap: 4,
  },
  "5-times-week": {
    scale: 38,
    gratitude_percent: 100 / (20 * 0.3),
    day_percent: 100 / 38,
    reset_gap: 2,
  },
};

const LANG_MASKS = {
  en: {
    orig: "English",
    mask: "English",
  },
  pl: {
    orig: "Polish",
    mask: "Polski",
  },
  uk: {
    orig: "Ukrainian",
    mask: "Українська",
  },
};

const HABIT_COLORS = [
  "#f0893a", // Orange
  "#ffcf0f", // Yellow
  "#44C759", // Green
  "#5AC8FA", // Teal
  "#007AFF", // Blue
  "#AF52DE", // Purple
  "#FF2D55", // Red
  "#69dd91", // Green 2
  "#e44244", // Bordo
];

const getRandomItem = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

const getTheme = (th) => {
  const theme = th?.theme;
  const system_theme = th?.system_theme;
  if (theme === "st_theme__dark") return THEMEV["st_theme__dark"];
  if (theme === "st_theme__light") return THEMEV["st_theme__light"];
  if (theme === "st_theme__system") {
    if (system_theme === "dark") return THEMEV["st_theme__dark"];
    else return THEMEV["st_theme__light"];
  }
  return THEMEV["st_theme__light"];
};

const getThemeStatusBar = (th, isReversed) => {
  const theme = getTheme(th).label;
  if (isReversed)
    switch (theme) {
      case "dark":
        return "light-content";
      case "light":
        return "dark-content";
      default:
        return "dark-content";
    }
  else
    switch (theme) {
      case "dark":
        return "dark-content";
      case "light":
        return "light-content";
      default:
        return "light-content";
    }
};

const HEADER_SHADOW = Object.create({
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 1,
  shadowRadius: 3,
  elevation: 3,
})

function getTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Extract hours and minutes
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function convertTo12HourFormat(time24) {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // Convert 0 hour to 12
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

const uses24HourClock = (date) => {
  const timeString = date.toLocaleTimeString([], { hour: "numeric" });
  return !timeString.includes("AM") && !timeString.includes("PM");
};

const getTwelveOr24Time = (time) => {
  if (uses24HourClock(new Date())) return time;
  return convertTo12HourFormat(time);
};

const convertTo24Hour = (timeStr) => {
  if (/^\d{2}:\d{2}$/.test(timeStr)) {
    return timeStr; // return if already in 24-hour format (e.g., "13:45")
  }

  const [time, modifier] = timeStr.split(" "); // split time and AM/PM
  let [hours, minutes] = time.split(":"); // split hours and minutes

  if (hours === "12") {
    hours = modifier === "AM" ? "00" : "12"; // handle 12 AM and 12 PM cases
  } else if (modifier === "PM") {
    hours = String(+hours + 12); // convert PM hours to 24-hour format
  }

  return `${hours.padStart(2, "0")}:${minutes}`; // return 24-hour formatted time
};

/**
 * Determines if the first day of the week in the user's locale is Monday.
 *
 * @param {string} [locale=navigator.language] - The user's locale string (e.g., 'en-US'). Defaults to the user's browser locale.
 * @returns {boolean} - Returns true if the first day of the week is Monday, false if it's Sunday.
 */
function isFirstDayOfWeekMonday() {
  const userLocale = navigator.language || "en-US"; // Get the user's locale
  const firstDayOfWeek = new Date(2024, 0, 1).toLocaleDateString(userLocale, {
    weekday: "short",
  });

  // Check if the first day of the week in the locale is Monday
  if (firstDayOfWeek === "Mon") {
    return true;
  } else if (firstDayOfWeek === "Sun") {
    return false;
  }

  // Default to Monday if locale is unclear
  return true;
}

function getWeekdays() {
  return isFirstDayOfWeekMonday() ? WEEKDAYS_EU : WEEKDAYS;
}

const getGreenRedOrGray =(val, styles) => {
  return {color: val > 0 ? styles.green : val == 0 ? styles.gray : styles.red}
 }

module.exports = {
  PLATFORM,
  WEEKDAYS,
  WEEKDAYS_EU,
  LANG_MASKS,
  THEMES_MASKS,
  HEADER_SHADOW,

  REPEAT_MASKS,
  REPEAT_GAP_VALUES,

  HABIT_COLORS,
  THEMEV,
  getWeekdays,
  getRandomItem,
  getTheme,
  getThemeStatusBar,
  getTimeFromTimestamp,
  uses24HourClock,
  getTwelveOr24Time,
  convertTo24Hour,
  convertTo12HourFormat,
  isFirstDayOfWeekMonday,
  getGreenRedOrGray
};
