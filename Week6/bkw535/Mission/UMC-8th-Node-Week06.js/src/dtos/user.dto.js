export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address,
      detailAddress: body.detailAddress,
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  export const responseFromUser = ({ user, preferences }) => {
    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
      preferences: preferences.map((pref) => ({
        id: Number(pref.foodCategory.id),
        type: pref.foodCategory.type,
      })),
    };
  };