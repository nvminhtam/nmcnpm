import express from 'express';
import homepageRoute from './homepage/homepageRoute';
const router = express.Router();

router.use('/', homepageRoute);

export default router;
