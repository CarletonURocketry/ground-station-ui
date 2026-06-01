export const missionStatusMap = (code: number) => {
  switch (code) {
    case 0:
      return "SYSTEMS_NOMINAL";
    case 1:
      return "IDLE";
    case 2:
      return "CHANGED_AIRBORNE";
    case 3:
      return "ROCKET_ASCENT";
    case 4:
      return "ROCKET_APOGEE";
    case 5:
      return "ROCKET_LANDED";
    case 6:
      return "UPDATE_IDLE";
    case 7:
      return "UPDATE_AIRBORNE";
    case 8:
      return "UPDATE_ASCENT";
    case 9:
      return "UPDATE_DESCENT";
    case 10:
      return "UPDATE_LANDED";
    default:
      return "Unknown";
  }
};
