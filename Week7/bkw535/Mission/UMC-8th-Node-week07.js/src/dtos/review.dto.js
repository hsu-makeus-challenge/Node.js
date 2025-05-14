export const bodyToReview = (body, storeId) => {
    if (!body.userId || !body.content || body.star == null) {
      throw new Error("userId, content, rating 을 입력해야 합니다.");
    }
  
    return {
      storeId: parseInt(storeId, 10),
      userId: body.userId,
      content: body.content,
      star: parseFloat(body.star),
    };
  };

export const bodyToPhotoReview = (body) => {
    return {
      photoUrl: body.photoUrl,
      reviewId: body.reviewId,
    };
};