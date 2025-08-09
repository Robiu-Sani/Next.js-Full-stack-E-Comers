/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUserRole } from "@/interface/auth.constent";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import UserModel from "@/models/user.model";

export const auth = async (...requiredRoles: TUserRole[]) => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("accessToken");

  if (!tokenCookie || !tokenCookie.value) {
    throw new Error("You are not authorized to access this resource");
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(
      tokenCookie.value,
      process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET as string
    ) as JwtPayload;
  } catch (err: any) {
    console.log(err);
    throw new Error(
      "Invalid token. Please provide a valid authorization token"
    );
  }

  // Check if token contains required user identification
  if (!decoded.email && !decoded.number) {
    throw new Error("Token must contain email or number");
  }

  // Find user by email or number
  const user = await UserModel.findOne({
    $or: [{ email: decoded.email }, { number: decoded.number }],
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check account status
  if (user.isDeleted) {
    throw new Error("This account has been deleted");
  }

  if (!user.isActive) {
    throw new Error("This account is not active");
  }

  if (user.status === "blocked") {
    throw new Error("Your account has been blocked by admin");
  }

  if (
    !(
      requiredRoles.length > 0 &&
      !requiredRoles.includes(decoded.role as TUserRole)
    )
  ) {
    throw new Error("You are not authorized to access this resource");
  }

  return {
    user,
    decoded,
  };
};
