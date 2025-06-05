import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Stack,
} from '@mantine/core';
import { useState } from 'react';

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleSubmit = async () => {
    setStatus('sending');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_CONTACT_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
          }),
        },
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Failed to send form:', err);
      setStatus('error');
    }
  };

  return (
    <Container py="xl" maw={600}>
      <Title order={2} mb="md">
        Contact Us
      </Title>
      <Text mb="lg">
        Got questions or need a custom quote? Reach out and we’ll get back to
        you very soon!
      </Text>

      <Stack>
        <TextInput
          label="Your Name"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <TextInput
          label="Email"
          placeholder="your-email@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Textarea
          label="Message"
          placeholder="Tell us what kind of slabs you're after..."
          required
          minRows={4}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button
          variant="filled"
          color="dark"
          onClick={handleSubmit}
          loading={status === 'sending'}
          disabled={!name || !message || !isValidEmail(email)}
        >
          Send Message
        </Button>
        {status === 'success' && (
          <Text c="green">Message sent! We’ll get back to you soon.</Text>
        )}
        {status === 'error' && (
          <Text c="red">Something went wrong. Try again later.</Text>
        )}
      </Stack>
    </Container>
  );
}
