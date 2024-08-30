const apiUrl = process.env.API_URL;

export async function handleEditUser(req, res) {
console.log('Server Side');

      
  const { id, name,apelido, email, password, imagem} = req.body; // Obtemos o ID e outros dados do corpo
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,apelido, email, password,imagem }),
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Erro ao editar usuário com ID ${id}`, error });
  }
}
