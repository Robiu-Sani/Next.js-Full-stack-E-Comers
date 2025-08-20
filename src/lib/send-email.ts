/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import * as path from "path";
import nodemailer from "nodemailer";
import Handlebars from "handlebars";

const ReadFile = fs.promises.readFile;

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  templateData?: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    encoding?: string;
    contentType?: string;
  }>;
}

interface EmailTemplate {
  compile: (data: any) => string;
}

// Cache for compiled templates
const templateCache = new Map<string, EmailTemplate>();

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
  template,
  templateData = {},
  attachments = [],
}: SendEmailOptions) => {
  try {
    // Validate required environment variables
    if (
      !process.env.NEXT_PUBLIC_APP_EMAIL ||
      !process.env.NEXT_PUBLIC_APP_PASS
    ) {
      throw new Error("Email credentials are not configured");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_STEMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || "587"),
      secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
      auth: {
        user: process.env.NEXT_PUBLIC_APP_EMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASS,
      },
      // Better connection handling
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });

    // Verify connection configuration
    await transporter.verify();

    let finalHtml = html;

    // If template is specified, compile and use it
    if (template && !html) {
      finalHtml = await compileTemplate(template, templateData);
    }

    // If no HTML content, use text as fallback
    if (!finalHtml && text) {
      finalHtml = `<pre style="font-family: sans-serif;">${text}</pre>`;
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Madrasah Association" <${process.env.NEXT_PUBLIC_APP_EMAIL}>`,
      to: Array.isArray(to) ? to.join(",") : to,
      subject,
      text: text || (finalHtml ? stripHtml(finalHtml) : ""),
      html: finalHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error(
      `Email sending failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Helper function to compile email templates
export const compileTemplate = async (
  templateName: string,
  data: Record<string, any> = {}
): Promise<string> => {
  try {
    // Check if template is already compiled and cached
    if (templateCache.has(templateName)) {
      const template = templateCache.get(templateName)!;
      return template.compile(data);
    }

    // Load template file
    const templatesDir = path.join(process.cwd(), "src", "templates", "emails");
    const templatePath = path.join(templatesDir, `${templateName}.hbs`);

    const templateContent = await ReadFile(templatePath, "utf-8");

    // Compile template
    const template = Handlebars.compile(templateContent);

    // Cache the compiled template
    templateCache.set(templateName, { compile: template });

    return template(data);
  } catch (error) {
    console.error(`Failed to compile template ${templateName}:`, error);
    throw new Error(
      `Template compilation failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// Helper function to strip HTML tags for text fallback
const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

// Predefined email templates for common use cases
export const EmailTemplates = {
  // OTP Verification Email
  sendOtpEmail: async (to: string, otp: string, userName?: string) => {
    return sendEmail({
      to,
      subject: "Your Verification Code - Madrasah Association",
      template: "otp-verification",
      templateData: {
        otp,
        userName: userName || "User",
        expiryTime: "15 minutes",
        supportEmail:
          process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@madrasah.org",
      },
    });
  },

  // Welcome Email
  sendWelcomeEmail: async (to: string, userName: string) => {
    return sendEmail({
      to,
      subject: "Welcome to Madrasah Association!",
      template: "welcome",
      templateData: {
        userName,
        loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
        supportEmail:
          process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@madrasah.org",
      },
    });
  },

  // Password Reset Email
  sendPasswordResetEmail: async (
    to: string,
    resetToken: string,
    userName?: string
  ) => {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    return sendEmail({
      to,
      subject: "Password Reset Request - Madrasah Association",
      template: "password-reset",
      templateData: {
        userName: userName || "User",
        resetUrl,
        expiryTime: "1 hour",
        supportEmail:
          process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@madrasah.org",
      },
    });
  },

  // General Notification Email
  sendNotificationEmail: async (
    to: string,
    title: string,
    message: string,
    userName?: string
  ) => {
    return sendEmail({
      to,
      subject: title,
      template: "notification",
      templateData: {
        userName: userName || "User",
        title,
        message,
        appUrl: process.env.NEXT_PUBLIC_APP_URL,
        supportEmail:
          process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@madrasah.org",
      },
    });
  },
};
