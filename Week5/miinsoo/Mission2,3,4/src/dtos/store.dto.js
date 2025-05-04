export const bodyToStore = (body) => {
    return {
        store_name: body.store_name,
        verification_id: body.verification_id,
        open_time: body.open_time,
        food_type: body.food_type || "",
        address: body.address
    };
};