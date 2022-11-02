const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth_middleware");

const AccommoController = require("../controllers/accommodations.controller");
const accommoController = new AccommoController();
const upload = require('../middleware/upload_image')

// 숙소 호스팅 하기(숙소 글 올리기) API
router.post("/", authMiddleware, upload.array('accImg', 5) ,accommoController.hostAccommodation);

// 숙소 전체 리스트 API
router.get("/", accommoController.getAllAccommodations);

// 숙소 상세 API
router.get("/:accId", accommoController.getAccommoDetails);

// 숙소 정보 수정 API
router.patch("/:accId", authMiddleware, upload.array('accImg', 5), accommoController.updateAccommo);

// 숙소 삭제 API
router.delete("/:accId", authMiddleware, accommoController.deleteAccommo);

module.exports = router;