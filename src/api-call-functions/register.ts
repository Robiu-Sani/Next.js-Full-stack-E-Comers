"use server";

interface RegisterPayload {
  email?: string;
  number?: string;
  password: string;
  isSocial: boolean;
}

export const registerData = async (
  path: string,
  data: RegisterPayload
): Promise<Response> => {
  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Request failed with status ${response.status}`
      );
    }

    return response;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
