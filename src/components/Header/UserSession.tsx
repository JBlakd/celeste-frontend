import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  ActionIcon,
  useMantineTheme,
  Text,
  Tooltip,
  Flex,
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useAuth } from '@context/auth/useAuth';
import type { AuthData } from '@stores/authStore';

function LogInModalContent({
  form,
  handleChange,
  handleLogin,
  error,
  loading,
}: {
  form: {
    email: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: () => Promise<void>;
  error: string | null;
  loading: boolean;
}) {
  return (
    <>
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
    </>
  );
}

function LoggedInModalContent({ user, logout }: { user: AuthData; logout: () => Promise<void> }) {
  return (
    <>
      <Text>Welcome, {user.contactName}</Text>
      <Text>{user.email}</Text>
      <Text>Welcome, {user.companyName}</Text>
      <Flex>
        <Button>Change Password</Button>
        <Button color="red" onClick={logout}>
          Logout
        </Button>
      </Flex>
    </>
  );
}

export default function UserSession() {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, login, logout } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useMantineTheme();

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
      <Tooltip label={user ? `Logged in as ${user.email}` : 'Login'} withinPortal>
        <ActionIcon
          onClick={open}
          variant="subtle"
          color={user ? theme.colors.celesteGold[5] : 'gray'}
          size="lg"
          title={user ? `Logged in as ${user.email}` : 'Login'}
        >
          <User size={20} />
        </ActionIcon>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title={user ? `Logged in as ${user.email}` : 'Login'}
        overlayProps={{ blur: 3 }}
        centered
      >
        {user ? (
          <LoggedInModalContent user={user} logout={logout} />
        ) : (
          <LogInModalContent
            form={form}
            handleChange={handleChange}
            handleLogin={handleLogin}
            error={error}
            loading={loading}
          />
        )}
      </Modal>
    </>
  );
}
