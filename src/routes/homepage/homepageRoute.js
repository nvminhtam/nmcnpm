import express from 'express';

const router = express();

router.get('/', (req, res) => {
  return res.send('homepage');
});
export default router;
