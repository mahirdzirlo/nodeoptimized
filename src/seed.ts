import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import User from "./models/User";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log("MongoDB connected for seeding");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    const users = Array.from({ length: 20000 }, () => ({
      name: faker.name.fullName(),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
    }));

    await User.insertMany(users);
    console.log("20,000 users inserted successfully");
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

const main = async () => {
  await connectDB();
  await seedUsers();
  mongoose.connection.close();
};

main();
