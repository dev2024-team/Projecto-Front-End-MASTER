import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userApelido, setUserApelido] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userImagem, setUserImagem] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados.');
      }
      const result = await response.json();
      setData(result);
      console.log(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao buscar dados.');
    }
  };

  const buscarUsuarioporId = async () => {
    try {
      const response = await fetch(`/api/users?id=${userId}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado.');
      }
      const user = await response.json();
      setUserName(user.name || '');
      setUserApelido(user.apelido || '');
      setUserEmail(user.email || '');
      setUserPassword(user.password || '');
      setUserImagem(user.imagem || '');
      setError('');
      console.log('Usuário encontrado:', user);
    } catch (error) {
      console.error('Erro ao buscar o usuário:');
      setError('Usuário não encontrado ou erro na busca.');
    }
  };

  const adicionarUsuario = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName, apelido: userApelido, email: userEmail, password: userPassword, imagem: userImagem }),
      });
      if (response.ok) {
        const newUser = await response.json();
        //  setData([...data, newUser]); // Adiciona o novo usuário à lista
        setUserName('');
        setUserApelido('')
        setUserEmail('');
        setUserPassword('');
        setUserImagem('');
        setError('');
        console.log('Usuário adicionado:', newUser);
      } else {
        throw new Error('Erro ao adicionar usuário.');
      }
    } catch (error) {
      console.error('Erro ao adicionar usuário:');
      setError('Erro ao adicionar usuário.');
    }
  };

  const editarUsuario = async () => {
    console.log({ id: userId, name: userName, apelido: userApelido, email: userEmail, password: userPassword, imagem: userImagem });
  
    
    try {
      const response = await fetch(`/api/users?id=${userId}`, { // Caminho para a função de edição
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, name: userName, apelido: userApelido, email: userEmail, password: userPassword, imagem: userImagem }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        //  setData(data.map(user => (user.id === userId ? updatedUser : user))); // Atualiza o usuário na lista
        setError('');
        console.log('Usuário editado:', updatedUser);
      } else {
        throw new Error('Erro ao editar usuário.');
      }
    } catch (error) {
      console.error('Erro ao editar usuário:');
      setError('Erro ao editar usuário.');
    }
  };

  const eliminarUsuario = async () => {
    try {
      const response = await fetch('/api/users', { // Caminho para a função de exclusão
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });
      if (response.ok) {
        //  setData(data.filter(user => user.id !== userId)); // Remove o usuário da lista
        setUserId('');
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setError('');
        console.log(`Usuário com ID ${userId} eliminado`);
      } else {
        throw new Error('Erro ao eliminar usuário.');
      }
    } catch (error) {
      console.error('Erro ao eliminar usuário:');
      setError('Erro ao eliminar usuário.');
    }
  };

  return (
    <div>
      <h1>Página de Boas Vindas</h1>

      <div>
        <input
          type="text"
          placeholder="Digite o ID do usuário"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={buscarUsuarioporId}>
          Buscar Usuário por ID
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Adicionar ou Editar Usuário</h2>
        <input
          type="text"
          placeholder="Nome do usuário"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apelido do usuário"
          value={userApelido}
          onChange={(e) => setUserApelido(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email do usuário"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha do usuário"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagem do usuário"
          value={userImagem}
          onChange={(e) => setUserImagem(e.target.value)}
        />
        <button onClick={adicionarUsuario}>
          Adicionar Usuário
        </button>
        <button onClick={editarUsuario}>
          Editar Usuário
        </button>
        <button onClick={eliminarUsuario}>
          Eliminar Usuário
        </button>
      </div>

      <p>OLA MUNDO</p>
    </div>
  );
}
