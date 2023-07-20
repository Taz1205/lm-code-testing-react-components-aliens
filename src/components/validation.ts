export const validateSpeciesName = (value: string) => {
  return (
    value !== "" &&
    /^[a-zA-Z]+$/.test(value) &&
    value.length >= 3 &&
    value.length <= 23
  );
};

export const validatePlanetName = (value: string) => {
  return (
    value !== "" &&
    /^[a-zA-Z0-9 ]+$/.test(value) &&
    value.length >= 2 &&
    value.length <= 49
  );
};

export const validateNumberOfBeings = (value: string) => {
  return value !== "" && /^\d+$/.test(value) && Number(value) >= 1000000000;
};

export const validateMathTest = (value: string) => {
  return value === "4";
};

export const validateReasonForSparing = (value: string) => {
  return value !== "" && value.length >= 17 && value.length <= 153;
};
