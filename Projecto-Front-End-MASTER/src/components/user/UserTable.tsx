import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { userService } from '@/services/userService';

const UserTable = () => {
  const [users, setUsers] = useState<Array<{ id: string; name: string; password: string; email: string; dataCriada: string }>>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; name: string; password: string; email: string; dataCriada: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (storedToken) {
      const decodedToken: any = jwtDecode(storedToken);
      
      if (decodedToken.exp < currentTime) {
        // Token expirado
        alert('A sua sessão expirou');
        localStorage.removeItem('token');
        router.push('/signin');
      } else {
        setToken(storedToken);
        fetchUsers(storedToken);
      }
    } else {
      router.push('/signin');
    }
  }, [router]);

  const fetchUsers = async (storedToken: string) => {
    try {
      const data = await userService.fetchUsers(storedToken);
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
      router.push('/signin');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;

    try {
      await userService.deleteUser(id, token);
      alert('Usuário removido com sucesso');
      setUsers(users.filter(user => user.id !== id));
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleEdit = (user: { id: string; name: string; password: string; email: string; dataCriada: string }) => {
    setSelectedUser(user);
  };

  const handleUpdate = async () => {
    if (!token || !selectedUser) return;

    const { id, name, email, password } = selectedUser;
    console.log('Dados de Usuario: ',id, name, email, password, token);
    try {
      const updatedUser = await userService.editUser(id, { name, email, password }, token);  
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setSelectedUser(null);
      alert('Usuário atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Password</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Data Criada</th>
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
                Nenhum usuário encontrado
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
