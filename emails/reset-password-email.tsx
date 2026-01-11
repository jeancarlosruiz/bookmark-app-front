import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ResetPasswordEmailProps {
  resetUrl: string;
  userName?: string;
  userEmail?: string;
}

export const ResetPasswordEmail = ({
  resetUrl = 'https://example.com/reset-password?token=abc123',
  userName = 'there',
  userEmail = 'user@example.com',
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password for Bookmark Manager</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with warning color */}
          <Section style={header}>
            <Heading style={h1}>Password Reset Request</Heading>
            <Text style={headerSubtext}>
              We received a request to reset your password
            </Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>Hi {userName},</Text>

            <Text style={paragraph}>
              Someone requested a password reset for the Bookmark Manager account
              associated with <strong>{userEmail}</strong>.
            </Text>

            <Text style={paragraph}>
              If this was you, click the button below to create a new password:
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            {/* Security notice */}
            <Section style={warningBox}>
              <Text style={warningText}>
                ⚠️ <strong>Security Notice:</strong> This link will expire in{' '}
                <strong>1 hour</strong> for your security. If you didn&apos;t request
                this password reset, please ignore this email or contact support if
                you have concerns.
              </Text>
            </Section>

            <Hr style={hr} />

            {/* Alternative link */}
            <Text style={smallText}>
              If the button doesn&apos;t work, copy and paste this link into your
              browser:
            </Text>
            <Link href={resetUrl} style={link}>
              {resetUrl}
            </Link>

            <Hr style={hr} />

            {/* Tips */}
            <Section style={tipsSection}>
              <Text style={tipsHeading}>Tips for a secure password:</Text>
              <ul style={tipsList}>
                <li style={tipsItem}>Use at least 8 characters</li>
                <li style={tipsItem}>Mix uppercase and lowercase letters</li>
                <li style={tipsItem}>Include numbers and special characters</li>
                <li style={tipsItem}>Avoid common words or personal information</li>
              </ul>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              If you didn&apos;t request a password reset, please ignore this email.
              Your password will remain unchanged.
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} Bookmark Manager. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ResetPasswordEmail;

// Design system colors from globals.css
const colors = {
  primary: '#014745', // teal-700
  primaryDark: '#013c3b', // teal-800
  neutral900: '#051513',
  neutral800: '#4c5659',
  neutral500: '#899492',
  neutral400: '#c0cfcc',
  neutral300: '#dde9e7',
  neutral200: '#e8f0ef',
  neutral100: '#e8f0ef',
  neutral0: '#ffffff',
  red600: '#fd4740',
  red800: '#cb0a04',
  warningBg: '#fff8f0',
  warningBorder: '#ffe0c7',
};

// Styles
const main = {
  backgroundColor: colors.neutral200,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
};

const container = {
  backgroundColor: colors.neutral0,
  margin: '0 auto',
  marginTop: '40px',
  marginBottom: '40px',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(5, 21, 19, 0.1)',
  overflow: 'hidden' as const,
  maxWidth: '600px',
};

const header = {
  backgroundColor: colors.primary,
  padding: '40px 32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: colors.neutral0,
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 8px 0',
  padding: '0',
};

const headerSubtext = {
  color: colors.neutral0,
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  opacity: 0.9,
};

const content = {
  padding: '40px 32px',
};

const greeting = {
  color: colors.neutral900,
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '28px',
  margin: '0 0 16px 0',
};

const paragraph = {
  color: colors.neutral800,
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: colors.primary,
  borderRadius: '8px',
  color: colors.neutral0,
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
  transition: 'background-color 0.2s ease',
};

const warningBox = {
  backgroundColor: colors.warningBg,
  border: `2px solid ${colors.warningBorder}`,
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const warningText = {
  color: colors.neutral900,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const hr = {
  borderColor: colors.neutral300,
  margin: '24px 0',
};

const smallText = {
  color: colors.neutral500,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 8px 0',
};

const link = {
  color: colors.primary,
  fontSize: '14px',
  lineHeight: '22px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
  display: 'block',
  marginBottom: '16px',
};

const tipsSection = {
  backgroundColor: colors.neutral100,
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0 0 0',
};

const tipsHeading = {
  color: colors.neutral900,
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '24px',
  margin: '0 0 12px 0',
};

const tipsList = {
  color: colors.neutral800,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
  paddingLeft: '20px',
};

const tipsItem = {
  marginBottom: '8px',
};

const footer = {
  padding: '0 32px 32px 32px',
};

const footerText = {
  color: colors.neutral500,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const footerCopyright = {
  color: colors.neutral400,
  fontSize: '12px',
  lineHeight: '20px',
  margin: '8px 0 0 0',
  textAlign: 'center' as const,
};
