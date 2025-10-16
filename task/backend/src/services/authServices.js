import { createUser, findUserByEmailAndRole } from "../dao/authDao";
import { generateToken } from "../utils/jwt";

export const registerUser = async (name, email, password, role) => {
    const existingUser = await findUserByEmailAndRole(email, role)
    if(existingUser){
        throw new Error("User Already Exists");
    }
    const user = await createUser({ name,email,password,role });
    const token = generateToken({id:user._id});
    return {user, token}
};

export const loginUser = async (email,password,role) => {
    const user = await findUserByEmailAndRole(email,role);
    if(!user){
        throw new Error("Invalid email or role!!!");
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch){
        throw new Error("Invalid Passowrd!!")
    } 
    const token = generateToken({id:user._id})
    return {user, token}
}