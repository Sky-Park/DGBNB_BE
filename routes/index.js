const express = require('express');
const router = express.Router();
const MembersRouter = require('./members.routes');
const AccommodationsRouter = require('./');
const ReviewsRouter = require('./reviews.routes');
const LikesRouter = require('./')
const ReservationsRouter = require('./')
//전역 미들웨어

router.use("/members", MembersRouter);
// router.use("/accommodations", AccommodationsRouter);
// router.use("/reviews", ReviewsRouter);
// router.use("/likes", LikesRouter);
// router.use("/reservations", ReservationsRouter);


module.exports = router;