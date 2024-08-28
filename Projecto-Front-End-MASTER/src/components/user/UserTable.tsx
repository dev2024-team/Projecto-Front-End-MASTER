import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

const UserTable = () => {
  const [users, setUsers] = useState<Array<{ id: string; name: string; password: string; email: string; dataCriada: string }>>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; password: string; email: string; dataCriada: string } | null>(null);
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

  const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      const response = await fetch(`/api/users`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Usuario Removido com sucesso')
        setUsers(users.filter(user => user.id !== id));
        setSelectedUser(null);
      } else {
        console.error('Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleEdit = (user: { id: string; name: string; password: string; email: string; dataCriada: string }) => {
    setSelectedUser(user);
  };

  const handleUpdate = async () => {
    if (!token || !selectedUser) return;

    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        setSelectedUser(null);
      } else {
        console.error('Erro ao atualizar usuário, verifique a entrada de dados');
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">id</th>
            <th className="py-3 px-6 text-left">name</th>
            <th className="py-3 px-6 text-left">password</th>
            <th className="py-3 px-6 text-left">email</th>
            <th className="py-3 px-6 text-left">dataCriada</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user.id}
                className={`border-b border-gray-200 hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-gray-300' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <td className="py-3 px-6 text-left">{user.id}</td>
                <td className="py-3 px-6 text-left">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.password}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.dataCriada}</td>
                <td className="py-3 px-6 text-left">
                  <button onClick={() => handleEdit(user)} className="text-blue-500 mr-3">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-3 px-6 text-center">
                A procucar dados de usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedUser && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold text-black">Edit User</h3>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={selectedUser.id}
              readOnly
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <label>Name:</label>
            <input
              type="text"
              value={selectedUser.name}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <label>Email:</label>
            <input
              type="email"
              value={selectedUser.email}
              onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <label>Password:</label>
            <input
              type="text"
              value={selectedUser.password}
              onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })}
              className="border p-2 rounded w-full mb-2 text-black"
            />
            <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded">
              Update User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
