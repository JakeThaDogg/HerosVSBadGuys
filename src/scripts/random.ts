/*
  Method that return a random number
  between specified range
*/
export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
