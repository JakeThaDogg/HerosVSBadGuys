const readline = require("readline");

const inputTerminal = async (question: string) => {
  let response;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  await new Promise((resolve, reject) => {
    rl.question(`${question}`, (answer: string) => {
      resolve(answer);
    });
  }).then(onfull => (response = onfull));

  return response;
};

export default inputTerminal;
