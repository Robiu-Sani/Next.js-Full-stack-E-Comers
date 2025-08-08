import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailOptions) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_STEMAIL_HOST,
      port: 587,
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      auth: {
        user: process.env.NEXT_PUBLIC_APP_EMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Madrasah Association" <${process.env.NEXT_PUBLIC_APP_EMAIL}>`,
      to: Array.isArray(to) ? to.join(",") : to,
      subject,
      text,
    });

    console.log(
      `Email sent to ${info.accepted.join(", ")}, messageId: ${info.messageId}`
    );
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
