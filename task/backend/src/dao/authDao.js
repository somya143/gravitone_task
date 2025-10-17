import User from "./../model/authModel.js";

// database operation of creating and finding user in dao

const createUser = async(data) => {
    const createUser = await User(data);
    return createUser.save();
};

const findUserByEmailAndRole = async (email, role) => {
  if (role) {
    return await User.findOne({ email, role });
  } else {
    return await User.findOne({ email });
  }
};


export default {createUser,findUserByEmailAndRole}