import { cookies } from "next/headers";

const getData = async (path: string) => {
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store", // Add this to prevent caching of authenticated requests
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

export default getData;
