export const bodyToStore = (body) => {
    return {
        storeName: body.store_name,
        verification_id: body.verification_id,
        openTime: body.open_time,
        foodType: body.food_type || "",
        address: body.address
    };
};