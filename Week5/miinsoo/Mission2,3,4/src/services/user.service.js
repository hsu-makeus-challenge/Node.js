// import { responseFromUser } from "../dtos/user.dto.js";
import {
    addUser,
    getUser,
    getUserPreferencesByUserId,
    setPreference,
  } from "../repositories/user.repository.js";
  
  export const userSignUp = async (data) => {
    const joinUserId = await addUser({
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth_date: data.birth_date,
      region: data.region,
      address: data.address,
      phoneNumber: data.phoneNumber,
    });
  
    if (joinUserId === null) {
      throw new Error("이미 존재하는 이메일입니다.");
    }
  
    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference);
    }
  
    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);
  
    return responseFromUser({ user, preferences });
  };