import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Router, { useRouter } from 'next/router';

const UserRegistration: React.FC = () => {
  const [users, setUsers] = useState<Array<{ id: string; name: string; password: string; email: string; dataCriada: string }>>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const currentTime = Math.floor(Date.now() / 1000); 
    console.log(storedToken);
    
    if (storedToken) {
      const decodedToken: any = jwtDecode(storedToken);
      console.log('Token Exp: ',decodedToken.exp,', Data Atual: ',currentTime);
      
      

      if (decodedToken.exp < currentTime) {
        // Token expirado
        alert('A sua sessao expirou');
        localStorage.removeItem('token');
        router.push('/login');
      } else {
        setToken(storedToken);
        fetchUsers(storedToken);
        
        
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const fetchUsers = async (storedToken: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      router.push('/login');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError('Token de autorização não encontrado.');
      return;
    }

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Usando o token armazenado
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess('Usuário cadastrado com sucesso!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao cadastrar usuário');
      }
    } catch (error) {
      setError('Erro de conexão ou servidor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Senha</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;
