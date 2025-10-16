import user from "../model/authModel";

// database operation of creating and finding user in dao

export const createUser = async(data) => {
    const user = await user(data);
    return user.save();
};

export const findUserByEmailAndRole = async(email, role) => {
    return await user.findOne({ email, role });
}