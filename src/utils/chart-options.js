// Streamlines the creation of charts by packaging options in presets

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
