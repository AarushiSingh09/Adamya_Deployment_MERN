import User from '../models/User';
import mongoose from 'mongoose';

const checkAdmin = async id => {
    const user = await User.findById(mongoose.Types.ObjectId(id));
    return(user.isAdmin);
}

const checkAuthorization = async id => {
    const user = await User.findById(mongoose.Types.ObjectId(id));
    return(user.emailVerified);
}

export {checkAdmin,checkAuthorization};