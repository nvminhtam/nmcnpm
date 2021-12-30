import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello');
});

export const runServerWithPort = (PORT) => {
  if (!PORT) throw Error('runServerWithPort need an initial PORT');
  app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
  });
};

