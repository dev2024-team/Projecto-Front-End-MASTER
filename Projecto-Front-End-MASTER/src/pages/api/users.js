export default async function handler(req, res) {
  const { method } = req;
  const { id, name, email, password } = req.body;
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1]; // Extrai o token do header Authorization




  if (['GET', 'POST', 'PUT', 'DELETE'].includes(method) && !token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    let response;
    let data;

    switch (method) {
      case 'GET':
        response = await fetch('http://localhost:3004/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        break;

      case 'POST':
        response = await fetch('http://localhost:3004/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, password }),
        });
        break;

      //METODO POR CONCRETIZAR
      case 'PUT':
        response = await fetch(`http://localhost:3004/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, password }),
        });
        break;

      case 'DELETE':
        //console.log(`http://localhost:3004/users/${id}`);
        response = await fetch(`http://localhost:3004/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        break;

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }

    if (response.ok) {
      data = method === 'DELETE'
        ? { message: 'Usuário removido com sucesso' }
        : await response.json();
      return res.status(method === 'POST' ? 201 : 200).json(data);
    } else {
      const errorData = await response.json();
      return res.status(response.status).json({
        message: `Erro ao ${method === 'POST' ? 'cadastrar' : method === 'PUT' ? 'editar' : 'remover'} usuário`,
        details: errorData
      });
    }
  } catch (error) {
    console.error('Erro no servidor:', error);
    return res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}
