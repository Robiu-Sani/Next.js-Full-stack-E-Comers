import axios from "axios";

interface SendSMSOptions {
  to: string | string[];
  message: string;
}

export const sendSMS = async ({ to, message }: SendSMSOptions) => {
  try {
    const numbers = Array.isArray(to) ? to.join(",") : to;

    const response = await axios.post(process.env.NEXT_PUBLIC_BULK_API as string, null, {
      params: {
        api_key: process.env.NEXT_PUBLIC_BULK_API_KEY,
        senderid: process.env.NEXT_PUBLIC_BULK_SENDER_ID,
        number: numbers,
        message,
      },
    });

    if (response.data.response_code === "SUCCESS") {
      console.log(`SMS sent successfully to ${numbers}`);
    } else {
      console.error(`SMS failed:`, response.data);
    }

    return response.data;
  } catch (error) {
    console.error("SMS send error:", error);
    throw error;
  }
};
