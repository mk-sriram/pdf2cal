import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  console.log("called the route");
  const { email, password } = await request.json();

  await connect();
  const existingUser = await User.findOne({ email });

  if (existingUser)
    return new NextResponse("Email already in user", {
      status: 400,
    });

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log("Part of new ");
  const newUser = new User({
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse("User registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
