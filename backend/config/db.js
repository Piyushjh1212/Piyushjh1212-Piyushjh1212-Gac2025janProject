import mongoose from 'mongoose';

const connectDB = async (mongo_url) => {
    try {
        await mongoose.connect(mongo_url);
        console.log(`Mongodb connected : ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongodb Error ${error.message} : ${error.name}`)
    }
}

export default connectDB;