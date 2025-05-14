export const bodyToAddMission = (body, storeId) => {
    return {
        content: body.content,
        deadline: body.deadline,
        point: body.point,
        storeId,
    };
};

export const bodyToChallengeMission = (body, missionId) => {
    if (!body.userId) {
        throw new Error("userId가 필요합니다.");
    }

    return {
        missionId: parseInt(missionId, 10),
        userId: body.userId
    };
};