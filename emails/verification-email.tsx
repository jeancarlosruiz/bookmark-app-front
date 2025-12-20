import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  verificationUrl: string;
  userName?: string;
}

export const VerificationEmail = ({
  verificationUrl = 'https://example.com/verify?token=abc123',
  userName = 'there',
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to get started with Bookmark Manager</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={header}>
            <Heading style={h1}>Welcome to Bookmark Manager!</Heading>
            <Text style={headerSubtext}>
              Organize your bookmarks with ease
            </Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Text style={greeting}>Hi {userName},</Text>

            <Text style={paragraph}>
              Thanks for signing up! We're excited to have you on board.
            </Text>

            <Text style={paragraph}>
              To get started and access all features, please verify your email
              address by clicking the button below:
            </Text>

            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={button} href={verificationUrl}>
                Verify Email Address
              </Button>
            </Section>

            <Text style={paragraph}>
              This verification link will expire in <strong>24 hours</strong> for
              security reasons.
            </Text>

            <Hr style={hr} />

            {/* Alternative link */}
            <Text style={smallText}>
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>
            <Link href={verificationUrl} style={link}>
              {verificationUrl}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerText}>
              If you didn't create an account with Bookmark Manager, you can
              safely ignore this email.
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

export default VerificationEmail;

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
  teal: '#014745',
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
