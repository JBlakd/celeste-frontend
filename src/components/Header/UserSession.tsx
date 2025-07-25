import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  ActionIcon,
  useMantineTheme,
  Text,
  Tooltip,
  Stack,
  Divider,
  Group,
  Flex,
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput label="Email" name="email" value={form.email} onChange={handleChange} required />
        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}
        <Button fullWidth type="submit" loading={loading}>
          Log in
        </Button>
      </Stack>
    </form>
  );
}

function LoggedInModalContent({
  user,
  logout,
  onChangePasswordClick,
}: {
  user: AuthData;
  logout: () => Promise<void>;
  onChangePasswordClick: () => void;
}) {
  return (
    <Stack gap="md">
      <Stack gap={2}>
        <Text fw={500}>{user.contactName}</Text>
        <Text size="sm" c="dimmed">
          {user.email}
        </Text>
        <Text size="sm" c="dimmed">
          {user.companyName}
        </Text>
      </Stack>

      <Divider />

      <Group grow>
        <Button variant="default" onClick={onChangePasswordClick}>
          Change Password
        </Button>
        <Button color="red" onClick={logout}>
          Logout
        </Button>
      </Group>
    </Stack>
  );
}

function ChangePasswordModalContent({
  form,
  handleChange,
  handleSubmit,
  error,
  loading,
  onCancel,
}: {
  form: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  error: string | null;
  loading: boolean;
  onCancel: () => void;
}) {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSubmit();
  };

  return (
    <form onSubmit={onFormSubmit}>
      <Stack gap="md">
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <PasswordInput
          label="New Password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <PasswordInput
          label="Confirm New Password"
          name="confirmNewPassword"
          value={form.confirmNewPassword}
          onChange={handleChange}
          required
        />
        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}
        <Group grow>
          <Button variant="default" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            Change
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export default function UserSession({ onClick }: { onClick?: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { user, login, logout } = useAuth();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [changePasswordView, setChangePasswordView] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [changeForm, setChangeForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleChangeFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeForm({ ...changeForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      await login(data);
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

  const handlePasswordChange = async () => {
    setLoading(true);
    setError(null);

    if (changeForm.newPassword !== changeForm.confirmNewPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/changePassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user?.email,
          currentPassword: changeForm.currentPassword,
          newPassword: changeForm.newPassword,
        }),
      });

      if (!res.ok) throw new Error('Failed to change password');

      const data = await res.json();
      await login(data);
      setChangePasswordView(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Password change failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const getModalContent = () => {
    if (changePasswordView) {
      return (
        <ChangePasswordModalContent
          form={changeForm}
          handleChange={handleChangeFormChange}
          handleSubmit={handlePasswordChange}
          error={error}
          loading={loading}
          onCancel={() => setChangePasswordView(false)}
        />
      );
    }

    if (user) {
      return (
        <LoggedInModalContent
          user={user}
          logout={logout}
          onChangePasswordClick={() => {
            setChangeForm({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            setChangePasswordView(true);
          }}
        />
      );
    }

    return (
      <LogInModalContent
        form={loginForm}
        handleChange={handleLoginFormChange}
        handleLogin={handleLogin}
        error={error}
        loading={loading}
      />
    );
  };

  return (
    <>
      <Tooltip label={user ? `Logged in as ${user.email}` : 'Login'} withinPortal offset={25}>
        {isMobile ? (
          <Flex
            gap="xs"
            align="center"
            onClick={() => {
              setChangePasswordView(false);
              open();
              onClick?.();
            }}
          >
            <Text truncate c={user ? theme.colors.celesteGold[5] : 'black'}>
              {user ? `${user.contactName}` : 'Login'}
            </Text>
            <User color={user ? theme.colors.celesteGold[5] : 'grey'} />
          </Flex>
        ) : (
          <ActionIcon
            onClick={() => {
              setChangePasswordView(false);
              open();
              onClick?.();
            }}
            variant="subtle"
            color={user ? theme.colors.celesteGold[5] : 'gray'}
            size="lg"
            title={user ? `Logged in as ${user.email}` : 'Login'}
          >
            <User size={20} />
          </ActionIcon>
        )}
      </Tooltip>

      <Modal
        opened={opened}
        onClose={close}
        title={
          changePasswordView ? 'Change Password' : user ? `Logged in as ${user.email}` : 'Login'
        }
        overlayProps={{ blur: 3 }}
        centered
      >
        {getModalContent()}
      </Modal>
    </>
  );
}
