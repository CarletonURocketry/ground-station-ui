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

export function fontFamily() {
  const root = getComputedStyle(document.documentElement);
  return root.getPropertyValue("--font");
}

export function create_series(x_data, y_data) {
  return x_data.map((x_val, index) => [x_val, y_data[index]]);
}

// Components
const hideOverlap = {
  axisLabel: {
    hideOverlap: true,
  },
};

const xSpacer = {
  ...hideOverlap,
  nameGap: 35,
};

const ySpacer = {
  ...hideOverlap,
  nameGap: 50,
};

const textStyle = (font_weight) => {
  return {
    textStyle: {
      color: mainColours()[1],
      fontFamily: fontFamily(),
      fontWeight: font_weight,
    },
  };
};

const axisLineStyle = {
  axisLine: {
    lineStyle: {
      color: mainColours()[1],
    },
  },
};

const axisLabelStyle = {
  axisLabel: {
    ...textStyle(100).textStyle,
  },
};

// Parameterized components
export const DashGraph = (title, x_title, y_title, x_data, y_data) => {
  return {
    ...CenteredTitle(title),
    xAxis: GrowingX(x_title),
    yAxis: GrowingY(y_title),
    series: [
      {
        data: create_series(x_data, y_data),
        type: "line",
        ...LineStyle(1, 3, "solid"),
        ...DotStyle(1, 7),
      },
    ],
  };
};

export const GrowingX = (title) => {
  return {
    type: "value",
    scale: true,
    name: title,
    nameLocation: "center",
    ...xSpacer,
    nameTextStyle: {
      ...textStyle(300).textStyle,
    },
    ...axisLineStyle,
    ...axisLabelStyle,
  };
};

export const GrowingY = (title) => {
  return {
    type: "value",
    scale: true,
    name: title,
    nameLocation: "center",
    ...ySpacer,
    nameTextStyle: {
      ...textStyle(300).textStyle,
    },
    ...axisLineStyle,
    ...axisLabelStyle,
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

export const CenteredTitle = (title) => {
  return {
    title: {
      text: title,
      ...textStyle(500),
      left: "50%",
      top: "5%",
    },
  };
};
