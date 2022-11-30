export const generateHslColor = () => {
  return "hsl(" + Math.random() * 360 + ", 100%, 50%)";
};

export const generateLocationX = () => {
  return Math.random() * 1000 + 300;
};

export const generateLocationY = () => {
  return Math.random() * 1000 + 450;
};
