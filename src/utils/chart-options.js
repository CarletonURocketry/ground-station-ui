// Streamlines the creation of charts by packaging options in presets

import { type } from "@testing-library/user-event/dist/type";

// Constants
const MAIN_COLOURS_NAMES = [
  "--primary",
  "--secondary",
  "--tertiary",
  "--quaternary",
];
const ACCENTS_NAMES = [
  "--accent-one",
  "--accent-two",
  "--accent-three",
  "--accent-four",
];

// Helper functions
export function mainColours() {
  const root = getComputedStyle(document.documentElement);
  return MAIN_COLOURS_NAMES.map((text) => root.getPropertyValue(text));
}

export function accentColours() {
  const root = getComputedStyle(document.documentElement);
  return ACCENTS_NAMES.map((text) => root.getPropertyValue(text));
}

// Components
const hideOverlap = {
  axisLabel: {
    hideOverlap: true,
  },
};

const xSpacer = {
  ...hideOverlap,
  nameTextStyle: {
    lineHeight: 50,
  },
};

const ySpacer = {
  ...hideOverlap,
  nameTextStyle: {
    lineHeight: 75,
  },
};

// Parameterized components

export const GrowingX = (x_data, title) => {
  return {
    type: "value",
    data: x_data,
    scale: true,
    name: title,
    nameLocation: "center",
    ...xSpacer,
  };
};

export const GrowingY = (title) => {
  return {
    type: "value",
    scale: true,
    name: title,
    nameLocation: "center",
    ...ySpacer,
  };
};

export const LineStyle = (accent_num, line_width, line_type) => {
  return {
    lineStyle: {
      color: accentColours()[accent_num - 1],
      width: line_width,
      type: line_type,
    },
  };
};

export const DotStyle = (accent_num, size) => {
  return {
    itemStyle: {
      color: accentColours()[accent_num - 1],
    },
    symbolSize: size,
  };
};
