import { Modal, TextInput, PasswordInput, Button, ActionIcon } from '@mantine/core';
import { User } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAuth } from '@context/auth/useAuth';

export default function Login() {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      await login(data); // stores JWT + metadata in localForage inside useAuth
      close();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ActionIcon
        onClick={open}
        variant="subtle"
        color={user ? 'green' : 'gray'}
        size="lg"
        title={user ? `Logged in as ${user.email}` : 'Login'}
      >
        <User size={20} />
      </ActionIcon>

      <Modal opened={opened} onClose={close} title="Login" overlayProps={{ blur: 3 }} centered>
        <TextInput
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          mb="sm"
        />
        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          mb="sm"
        />
        {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
        <Button fullWidth onClick={handleLogin} loading={loading}>
          Log in
        </Button>
      </Modal>
    </>
  );
}
