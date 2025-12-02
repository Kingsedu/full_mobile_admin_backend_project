import mongoose from 'mongoose';

export const connectDatabase = async (url: string) => {
  try {
    if (!url) {
      throw new Error('the connection string is not available');
    }
    const connect = await mongoose.connect(url);
    console.log('connected to the database');
    return connect;
  } catch (e: any) {
    console.error(e?.message);
    process.exit(1);
  }
};
