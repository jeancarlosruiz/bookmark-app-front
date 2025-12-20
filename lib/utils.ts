import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sendEmailHTML = (url: string) => {
  return `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
              </div>
              <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>
                <p style="font-size: 16px; margin-bottom: 20px;">We received a request to reset your password for your Bookmark Manager account.</p>
                <p style="font-size: 16px; margin-bottom: 30px;">Click the button below to reset your password:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${url}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block;">Reset Password</a>
                </div>
                <p style="font-size: 14px; color: #666; margin-top: 30px;">Or copy and paste this link into your browser:</p>
                <p style="font-size: 14px; color: #667eea; word-break: break-all;">${url}</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                <p style="font-size: 14px; color: #666;">If you didn't request a password reset, you can safely ignore this email.</p>
                <p style="font-size: 14px; color: #666;">This link will expire in 1 hour.</p>
              </div>
            </body>
          </html>
        `;
};
