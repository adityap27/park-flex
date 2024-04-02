/**
*  Author: Aditya Purohit
*/
import express from 'express';

import { getReviewsByListingId, addReviewForListing } from '../controllers/reviews';
import { authenticateToken } from '../middleware/authenticateToken';

const router = express.Router({mergeParams: true});

router.get('/reviews', getReviewsByListingId);
router.post('/review', authenticateToken, addReviewForListing);

export default router;