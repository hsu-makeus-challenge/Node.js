import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", { email: data.email });
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new UserNotFoundError("사용자를 찾을 수 없습니다.", { userId });
  }

  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  try {
    await prisma.foodType.create({
      data: {
        userId,
        foodCategoryId,
      },
    });
  } catch (err) {
    throw new PreferenceSaveError("선호 카테고리 저장에 실패했습니다.", {
      userId,
      foodCategoryId,
      originalError: err,
    });
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  try {
    const preferences = await prisma.foodType.findMany({
      where: { userId },
      include: {
        foodCategory: {
          select: {
            id: true,
            type: true,
          },
        },
      },
      orderBy: {
        foodCategoryId: "asc",
      },
    });

    return preferences;
  } catch (err) {
    throw new PreferenceFetchError("선호 카테고리 조회 중 오류가 발생했습니다.", {
      userId,
      originalError: err,
    });
  }
};
