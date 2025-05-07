import {
  Container,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Stack,
} from '@mantine/core';

export default function Contact() {
  return (
    <Container py="xl" maw={600}>
      <Title order={2} mb="md">
        Contact Us
      </Title>
      <Text mb="lg">
        Got questions or need a custom quote? Reach out and we’ll get back to
        you quick smart.
      </Text>

      <Stack>
        <TextInput
          label="Your Name"
          placeholder="Brah from Western Sydney"
          required
        />
        <TextInput label="Email" placeholder="brah@example.com" required />
        <Textarea
          label="Message"
          placeholder="Tell us what kind of slabs you're after..."
          required
          minRows={4}
        />
        <Button variant="filled" color="dark">
          Send Message
        </Button>
      </Stack>
    </Container>
  );
}
