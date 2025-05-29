export const bodyToStore = (body) => {
    return {
        name: body.name,
        store_number: body.store_number,
        open_time: body.open_time,
        food_theme: body.food_theme || "",
        address: body.address
    };
};
