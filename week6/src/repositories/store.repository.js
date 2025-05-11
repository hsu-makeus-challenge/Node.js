import { prisma } from "../db.config.js";

// ✅ 지역 이름으로 찾기
export const findRegionByName = async (regionName) => {
  return await prisma.region.findFirst({
    where: { name: regionName }
  });
};

// ✅ 지역 생성하기
export const createRegion = async (regionName) => {
  return await prisma.region.create({
    data: { name: regionName }
  });
};

// ✅ 가게 생성하기
export const addStoreToRegion = async (regionId, { name, address, description }) => {
  return await prisma.store.create({
    data: {
      regionId,
      name,
      address,
      description
    }
  });
};
