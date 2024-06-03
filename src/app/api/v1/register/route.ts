"use server";

import { sqlConnection } from "@/utils/sqlConnection";
import {
  getUserByEmail,
  createUserByEmail,
  queries,
  createAd,
} from "@/utils/sqlQueries";
import crypto from "crypto";
import bcrypt from "bcryptjs";

const saltRounds = 10;

export async function POST(request: Request) {
  try {
    const { email, password, createdBy } = await request.json();

    if (!email || !password || !createdBy) {
      throw new Error("Email or Password or Created By is empty");
    }

    const _user: any = await sqlConnection(getUserByEmail, [email]);

    if (_user?.length > 0) {
      throw new Error("Account already exist. Please Log In");
    }

    const _hashPassword = await bcrypt
      .genSalt(saltRounds)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .catch((error) => {
        return Response.json({ msg: error.message }, { status: 400 });
      });

    const _createUser: any = await sqlConnection(createUserByEmail, [
      _hashPassword,
      email,
      createdBy,
    ]);

    if (_createUser?.affectedRows === 1) {
      await sqlConnection(queries.users.insertOnBoarding, [
        _createUser?.insertId,
        1,
      ]);

      const _adId = crypto
        .createHash("md5")
        .update(email.toLowerCase().trim())
        .digest("hex");

      const _createAdd: any = await sqlConnection(createAd, [
        _adId,
        _createUser?.insertId,
      ]);

      if (_createAdd.affectedRows === 1) {
        return Response.json(
          { msg: "Account created successfully", data: [] },
          { status: 200 },
        );
      }
      return Response.json(
        { msg: "Account created successfully", data: [] },
        { status: 200 },
      );
    }

    return Response.json(
      { msg: "Error creating User", data: [] },
      { status: 400 },
    );
  } catch (error: any) {
    return Response.json({ msg: error.message }, { status: 400 });
  }
}
