"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sqlConnection } from "@/utils/sqlConnection";
import { queries } from "@/utils/sqlQueries";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      throw new Error("Email or Password is empty");
    }

    const _user: any = await sqlConnection(queries.users.selectExistingUser, [
      email,
    ]);

    if (Object.keys(_user).length === 0) {
      throw new Error("User cannot found");
    }

    const {
      ID: id,
      EMAIL: _email,
      PASSWORD: _password,
      IS_ON_BOARDING: onBoarding,
    } = _user[0];

    const verifyPassword = await bcrypt.compare(password, _password);

    if (!verifyPassword) {
      throw new Error("Wrong password");
    }

    const _secretKey = process.env.SECRET_KEY;

    if (!_secretKey) {
      throw new Error("Secret key not added");
    }

    const _accessToken = jwt.sign({ email: _email, id: id }, _secretKey, {
      expiresIn: "1d",
    });

    await sqlConnection(queries.users.updateAccessToken, [_accessToken, id]);

    cookies().set("userID", id);

    const _userResponse = {
      user: { id: id, email: _email, onBoarding },
      accessToken: _accessToken,
    };

    return Response.json(
      { msg: "Account created successfully", data: _userResponse },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json({ msg: error.message }, { status: 400 });
  }
}
