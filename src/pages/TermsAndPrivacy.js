import { Container, Typography } from '@mui/material';

export default function TermsAndPrivacy() {
  return (
    <Container maxWidth="md" sx={{pb: 10}}>
      <Typography variant="h1" component="h1" sx={{ fontFamily: "Pacifico, cursive", fontWeight: 600, fontSize: 48, marginY: 4, textAlign: 'center' }}>
        Terms of Service and Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ fontSize: 18, marginBottom: 2 }}>
        <strong>Terms of Service</strong>
        <br />
        <br />

        <strong>1. Acceptance of Terms</strong>
        <br />
        By accessing or using Card4U (the "Service"), you agree to comply with and be bound by these Terms of Service.
        <br />
        <br />

        <strong>2. User Conduct</strong>
        <br />
        You agree not to engage in any activity that may disrupt or interfere with the proper functioning of the Service.
        <br />
        <br />

        <strong>3. Intellectual Property</strong>
        <br />
        All content provided on the Service is the property of Card4U and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express consent.
        <br />
        <br />

        <strong>4. User Accounts</strong>
        <br />
        You are responsible for maintaining the confidentiality of your account and password. Notify us immediately of any unauthorized use.
        <br />
        <br />

        <strong>5. Termination</strong>
        <br />
        We reserve the right to terminate or suspend your account for any reason without notice.
        <br />
        <br />

        <strong>6. Limitation of Liability</strong>
        <br />
        We are not liable for any direct, indirect, incidental, consequential, or special damages arising out of or in any way connected with your use of the Service.
        <br />
        <br />

        <strong>Privacy Policy</strong>
        <br />
        <br />

        <strong>Information We Collect</strong>
        <br />
        We collect personal information, including but not limited to name, email, and phone number, to provide and improve our services.
        <br />
        <br />

        <strong>How We Use Your Information</strong>
        <br />
        We use your information to personalize your experience, process transactions, and send periodic emails.
        <br />
        <br />

        <strong>Information Sharing</strong>
        <br />
        We do not sell, trade, or otherwise transfer your personal information to third parties.
        <br />
        <br />

        <strong>Security</strong>
        <br />
        We implement a variety of security measures to protect your information.
        <br />
        <br />

        <strong>Cookies</strong>
        <br />
        We use cookies to enhance your experience on our site.
        <br />
        <br />

        <strong>Changes to Privacy Policy</strong>
        <br />
        Any changes to our privacy policy will be posted on this page.
        <br />
        <br />

        <strong>Contact</strong>
        <br />
        If you have any questions regarding these terms or our privacy practices, contact us at adamrgv@hotmail.com
      </Typography>
    </Container>
  );
};
