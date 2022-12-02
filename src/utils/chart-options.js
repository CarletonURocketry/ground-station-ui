// Streamlines the creation of charts by packaging options in presets

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
/**
 * Fetches the main colours from the root element.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @returns A list of main colours from the root element.
 */
export function mainColours() {
  const root = getComputedStyle(document.documentElement);
  return MAIN_COLOURS_NAMES.map((text) => root.getPropertyValue(text));
}

/**
 * Fetches the accent colours from the root element.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @returns A list of accent colours from the root element.
 */
export function accentColours() {
  const root = getComputedStyle(document.documentElement);
  return ACCENTS_NAMES.map((text) => root.getPropertyValue(text));
}

/**
 * Fetches the font family used by the dashboard.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @returns The font family from the root element.
 */
export function fontFamily() {
  const root = getComputedStyle(document.documentElement);
  return root.getPropertyValue("--font");
}

/**
 * Zips together values from x and y data arrays into an array of [x, y] arrays for ReactEcharts to interpret.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {Array} x_data
 * @param {Array} y_data
 * @returns An array of arrays with format [x, y] for each data point in the x and y arrays.
 */
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
/**
 * The default options for a main dashboard graph, being a line chart.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} title Title of the graph
 * @param {string} x_title Title of the x-axis
 * @param {string} y_title Title of the y-axis
 * @param {Array} x_data Data points to be plotted on the x-axis
 * @param {Array} y_data Data points to be plotted on the y-axis
 * @returns the options for the main dashboard graph line chart
 */
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

/**
 * Options for a changing x-axis.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} title The x-axis title
 * @returns ReactEcharts options for an x-axis with numerical values that scale with changes in data
 */
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

/**
 * Options for a changing y-axis.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {string} title The title of the y-axis
 * @returns ReactEcharts options for a y-axis with numerical values that scale with changes in data
 */
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

/**
 * Allows specification of line style.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {number} accent_num The number corresponding to the accent colour that will be used to color the line
 * @param {number} line_width The width of the graph's line
 * @param {string} line_type The type of the line (dotted, dashed, etc.)
 * @returns ReactEcharts options for line style
 */
export const LineStyle = (accent_num, line_width, line_type) => {
  return {
    lineStyle: {
      color: accentColours()[accent_num - 1],
      width: line_width,
      type: line_type,
    },
  };
};

/**
 * Allows specification for the style of dots that signify data points.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {number} accent_num The number corresponding to the accent colour that will be used to color the line
 * @param {number} size The size of the dots that will appear on the graph
 * @returns ReactEcharts options for dot style.
 */
export const DotStyle = (accent_num, size) => {
  return {
    itemStyle: {
      color: accentColours()[accent_num - 1],
    },
    symbolSize: size,
  };
};

/**
 * Creates a title that is centered on the graph.
 * @author Matteo Golin <matteo.golin@gmail.com>
 * @param {*} title
 * @returns ReactEcharts options for a centered graph title.
 */
export const CenteredTitle = (title) => {
  return {
    title: {
      text: title,
      ...textStyle(500),
      left: "45%",
      top: "5%",
    },
  };
};
