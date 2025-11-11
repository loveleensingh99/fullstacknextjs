import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
console.log("🚀 ~ MONGODB_URI:", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  global.mongoose = {
    connection: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  console.log("[DB] Checking for cached connection...");
  if (cached?.connection) {
    console.log("[DB] Using cached connection");
    return cached.connection;
  }

  if (!cached?.promise) {
    console.log("[DB] No cached promise, connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI).then((conn) => {
      console.log("MongoDB connected successfully");
      return mongoose.connection;
    });
  } else {
    console.log("[DB] Using cached promise");
  }

  try {
    cached.connection = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.connection;
}
