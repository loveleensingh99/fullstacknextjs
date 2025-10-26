import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}


let cached = global.mongoose;



if (!cached) {
  global.mongoose = {
    connection: null,
    promise: null
  }
}


export async function connectToDatabase() {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    mongoose.connect(MONGODB_URI).then(() => mongoose.connection);
  }

  try {
    cached.connection = await cached.promise;
  } catch (err) {

    cached.promise = null;
    throw err;
  }
  return cached.connection;
}



