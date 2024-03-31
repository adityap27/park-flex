/*
  Author: Aditya Purohit
*/
import express from 'express';

import { getReviewsByListingId, addReviewForListing } from '../controllers/reviews';

const router = express.Router({mergeParams: true});

router.get('/', getReviewsByListingId);
router.post('/', addReviewForListing);

export default router;