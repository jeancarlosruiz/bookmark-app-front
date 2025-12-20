# Email Templates

Custom branded email templates for Bookmark Manager using React Email and your Figma design system.

## Templates

### 1. Verification Email (`verification-email.tsx`)
Sent when users sign up to verify their email address.

**Features:**
- Branded header with teal gradient (#014745)
- Personalized greeting with user's name
- Clear CTA button matching your design system
- 24-hour expiration notice
- Alternative text link for accessibility
- Responsive design

### 2. Password Reset Email (`reset-password-email.tsx`)
Sent when users request a password reset.

**Features:**
- Security-focused design
- Warning notice about 1-hour expiration
- Email confirmation display
- Password tips section
- Same branded styling as verification email

## Design System Integration

Both templates use colors from your `globals.css` design system:

- **Primary**: `#014745` (teal-700) - Buttons, headers, links
- **Background**: `#e8f0ef` (neutral-100) - Email background
- **Text Dark**: `#051513` (neutral-900) - Primary text
- **Text Medium**: `#4c5659` (neutral-800) - Body text
- **Borders**: `#c0cfcc` (neutral-400) - Dividers
- **White**: `#ffffff` (neutral-0) - Cards, buttons text

## Preview Templates

To preview and test your email templates:

```bash
pnpm email:preview
```

This will start a development server at `http://localhost:3000` where you can:
- View all email templates
- Test with different data
- See responsive breakpoints
- Copy HTML output
- Send test emails

## File Structure

```
emails/
├── README.md                    # This file
├── index.tsx                    # Exports all templates
├── verification-email.tsx       # Email verification template
└── reset-password-email.tsx     # Password reset template
```

## Usage in Code

The templates are automatically used by Better Auth via the email service:

```typescript
// lib/email/resend.ts
import { sendVerificationEmail, sendPasswordResetEmail } from '@/lib/email/resend';

// Automatically called by Better Auth
await sendVerificationEmail(
  'user@example.com',
  'https://yourapp.com/verify?token=...',
  'John'
);

await sendPasswordResetEmail(
  'user@example.com',
  'https://yourapp.com/reset-password?token=...',
  'John'
);
```

## Customization

### Changing Colors

Edit the `colors` object in each template:

```typescript
const colors = {
  primary: '#014745',      // Your brand color
  neutral900: '#051513',   // Dark text
  neutral0: '#ffffff',     // White
  // ... more colors
};
```

### Changing Content

Each template accepts props:

**VerificationEmail:**
- `verificationUrl: string` - The verification link
- `userName?: string` - User's name (defaults to "there")

**ResetPasswordEmail:**
- `resetUrl: string` - The password reset link
- `userName?: string` - User's name (defaults to "there")
- `userEmail?: string` - User's email address

### Adding New Templates

1. Create a new file: `emails/your-template.tsx`
2. Import React Email components
3. Use the same color scheme
4. Export the component
5. Add to `emails/index.tsx`
6. Create a helper function in `lib/email/resend.ts`

Example:

```typescript
// emails/welcome-email.tsx
import { Body, Container, Heading, Html, Text } from '@react-email/components';

interface WelcomeEmailProps {
  userName: string;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Welcome {userName}!</Heading>
          <Text>Thanks for joining Bookmark Manager.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
```

## Email Deliverability Tips

### Development
- Use `onboarding@resend.dev` as sender
- Can only send to your verified email
- No DNS setup required

### Production
1. Add your domain in Resend dashboard
2. Configure DNS records:
   - SPF record
   - DKIM record
   - DMARC record
3. Verify domain
4. Update `RESEND_FROM_EMAIL` to `noreply@yourdomain.com`

### Best Practices
- Keep emails under 102KB
- Use inline CSS (React Email handles this)
- Test across email clients (Gmail, Outlook, Apple Mail)
- Avoid spam trigger words
- Include plain text alternative
- Add unsubscribe link for marketing emails

## Testing

### Manual Testing

1. Start preview server:
```bash
pnpm email:preview
```

2. Click "Send Test Email" in the preview UI
3. Enter your email address
4. Check your inbox

### Automated Testing

You can render templates to HTML for testing:

```typescript
import { render } from '@react-email/render';
import VerificationEmail from '@/emails/verification-email';

const html = render(VerificationEmail({
  verificationUrl: 'https://example.com/verify',
  userName: 'Test User'
}));

console.log(html); // Full HTML output
```

## Environment Variables

Required in `.env.local`:

```env
# Resend API Key (get from resend.com)
RESEND_API_KEY="re_..."

# Sender email address
RESEND_FROM_EMAIL="onboarding@resend.dev"  # Development
RESEND_FROM_EMAIL="noreply@yourdomain.com" # Production
```

## Troubleshooting

### Emails not sending
- Check `RESEND_API_KEY` is set correctly
- Verify no typos in environment variables
- Check Resend dashboard for error logs
- Ensure you're sending to verified email in development

### Styling issues
- React Email automatically inlines CSS
- Test in multiple email clients
- Use email-safe CSS properties
- Avoid flexbox, prefer tables for complex layouts

### Preview server not starting
```bash
# Clear cache and restart
rm -rf .next
pnpm email:preview
```

## Resources

- [React Email Documentation](https://react.email/docs)
- [Resend Documentation](https://resend.com/docs)
- [Better Auth Email Guide](https://better-auth.com/docs/concepts/email)
- [Email Client CSS Support](https://www.caniemail.com/)

## Support

If you encounter issues:
1. Check the preview server for errors
2. Verify environment variables are set
3. Review Resend dashboard logs
4. Test with a simple template first
5. Check email spam folder
