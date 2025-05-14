export const bodyToUser = (body) => {
    const birth_date = new Date(body.birth_date);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth_date,
      region: body.region,
      address: address,
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
  };

  export const responseFromUser = ({ user }) => {
    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
    };
  };