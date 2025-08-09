/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

const postData = async (path: string, data: any) => {
  try {
    // Get access token from cookies
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("accessToken");

    if (!tokenCookie || !tokenCookie.value) {
      throw new Error("Authentication token not found");
    }

    const accessToken = tokenCookie.value;

    // Make the API request
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
      cache: "no-store", // Prevent caching of authenticated requests
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

export default postData;
