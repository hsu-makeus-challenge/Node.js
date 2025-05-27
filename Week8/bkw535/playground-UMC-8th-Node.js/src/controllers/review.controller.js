import { StatusCodes } from "http-status-codes";
import {bodyToReview, bodyToPhotoReview} from "../dtos/review.dto.js";
import { addReview as addReviewService, addPhotoReview as addPhotoReviewService, showUserReview as showUserReviewService } from "../services/review.service.js";
import {convertBigIntToString} from "../typeConfig.js"

export const addReview = async (req, res, next) => {
    try {
      console.log("리뷰 작성");
      console.log("body:", req.body);
  
      const review = await addReviewService(bodyToReview(req.body, req.params.storeId));
      res.status(StatusCodes.CREATED).success(convertBigIntToString(review));
    } catch (err) {
      next(err);
    }
  };

  export const addPhotoReview = async (req, res, next) => {
    try {
      console.log("리뷰 사진 추가");
      console.log("body:", req.body);
  
      const review = await addPhotoReviewService(bodyToPhotoReview(req.body));
      res.status(StatusCodes.CREATED).success(review);
    } catch (err) {
      next(err);
    }
  };

  export const showUserReview = async (req, res, next) => {
    try {
      console.log("나의 리뷰 조회");
      console.log("body:", req.body);
  
      const userId = parseInt(req.params.userId, 10);
      const reviews = await showUserReviewService(userId);
      res.status(StatusCodes.OK).success(reviews);
    } catch (err) {
      next(err);
    }
  };