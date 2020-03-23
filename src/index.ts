import Battle from "./classes/Battle";

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});
readline.question("Hero's name: ", (name: any) =>
  console.log("coucou " + name)
);
