import { Resend } from "resend";
import { render } from "@react-email/render";
import VerificationEmail from "@/emails/verification-email";
import ResetPasswordEmail from "@/emails/reset-password-email";

// Lazy initialization of Resend client
let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

/**
 * Send a generic email using Resend
 */
export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  try {
    const resend = getResendClient();

    const emailOptions = {
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to,
      subject,
      ...(html && { html }),
      ...(text && { text }),
    };

    const data = await resend.emails.send(
      emailOptions as {
        from: string;
        to: string;
        subject: string;
        html: string;
      },
    );

    console.log("✅ Email sent successfully:", {
      to,
      subject,
      data,
    });

    return { success: true, data };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return { success: false, error };
  }
}

/**
 * Send email verification email with branded template
 */
export async function sendVerificationEmail(
  to: string,
  verificationUrl: string,
  userName?: string,
) {
  const html = await render(
    VerificationEmail({
      verificationUrl,
      userName,
    }),
  );

  return sendEmail({
    to,
    subject: "Verify your email - Bookmark Manager",
    html,
  });
}

/**
 * Send password reset email with branded template
 */
export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  userName?: string,
) {
  const html = await render(
    ResetPasswordEmail({
      resetUrl,
      userName,
      userEmail: to,
    }),
  );

  return sendEmail({
    to,
    subject: "Reset your password - Bookmark Manager",
    html,
  });
}
