// src/components/LoginForm.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth/AuthContext';
import { login } from '@/services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { dispatch } = useAuth();

  const handleLogin = async () => {
    try {
      const access_token = await login(email, password);
      dispatch({ type: 'LOGIN', token: access_token });
      localStorage.setItem('token', access_token);
      router.push('/painel');
    } catch (error) {
      alert('Erro ao tentar conectar-se ao servidor.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <div>
        <label htmlFor="email" className="block text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
