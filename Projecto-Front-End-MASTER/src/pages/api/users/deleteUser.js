const apiUrl = process.env.API_URL;

export async function handleDeleteUser(req, res) {
  const { id } = req.body; // Obtemos o ID do corpo
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      res.status(204).end(); // Sucesso sem conteúdo
    } else {
      res.status(500).json({ message: `Erro ao excluir usuário com ID ${id}` });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro ao excluir usuário com ID ${id}`, error });
  }
}
