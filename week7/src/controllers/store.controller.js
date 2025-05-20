import { createStoreWithRegionName } from '../services/store.service.js';
import { BadRequestError } from '../errors/customErrors.js';

export const handleCreateStore = async (req, res, next) => {
  try {
    const { name, address, description, regionName } = req.body;

    const store = await createStoreWithRegionName(regionName, {
      name,
      address,
      description,
    });

    res.status(201).success({
      message: "가게가 성공적으로 추가되었습니다.",
      store,
    });
  } catch (error) {
    next(
      new BadRequestError("가게 생성 중 오류 발생", {
        requestBody: req.body,
        error: error.message,
      })
    );
  }
};
