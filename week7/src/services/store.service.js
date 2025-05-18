import { findRegionByName, createRegion, addStoreToRegion } from '../repositories/store.repository.js';

export const createStoreWithRegionName = async (regionName, storeData) => {
  // 1️⃣ 지역 이름으로 검색
  let region = await findRegionByName(regionName);

  // 2️⃣ 없으면 생성
  if (!region) {
    console.log(`🔄 지역(${regionName})이 존재하지 않습니다. 새로운 지역 생성 중...`);
    region = await createRegion(regionName);
    console.log(`✅ 지역(${regionName})이 생성되었습니다.`);
  }

  // 3️⃣ 가게 생성
  const store = await addStoreToRegion(region.id, storeData);
  console.log("✅ 가게가 추가되었습니다.");

  return store;
};