import { createStoreWithRegionName } from '../services/store.service.js';

export const handleCreateStore = async (req, res) => {
  try {
    const { name, address, description, regionName } = req.body;

    // ✅ regionName만으로 지역 생성 및 가게 등록
    const store = await createStoreWithRegionName(regionName, { name, address, description });

    res.status(201).json({
      message: "가게가 성공적으로 추가되었습니다.",
      data: store
    });
  } catch (error) {
    console.error("가게 생성 실패:", error.message);
    res.status(500).json({ message: "가게 생성 중 오류 발생" });
  }
};
