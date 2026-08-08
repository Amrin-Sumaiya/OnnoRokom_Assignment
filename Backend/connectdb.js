import mongoose from 'mongoose';

const connectDB = async (MONGO_URL) => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL);
    console.log('Connected Successfully...');
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
