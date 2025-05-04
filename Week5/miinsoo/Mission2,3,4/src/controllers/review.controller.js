import { StatusCodes } from "http-status-codes";
import {bodyToReview, bodyToPhotoReview} from "../dtos/review.dto.js";
import { addReview as addReviewService, addPhotoReview as addPhotoReviewService } from "../services/review.service.js";

export const addReview = async (req, res, next) => {
    console.log("리뷰 작성");
    console.log("body:", req.body);

    const review = await addReviewService(bodyToReview(req.body, req.params.storeId));
    res.status(StatusCodes.OK).json({ result: review});
};

export const addPhotoReview = async (req, res, next) => {
    console.log("리뷰 사진 추가");
    console.log("body:", req.body);

    const review = await addPhotoReviewService(bodyToPhotoReview(req.body));
    res.status(StatusCodes.CREATED).json({result: review});
}