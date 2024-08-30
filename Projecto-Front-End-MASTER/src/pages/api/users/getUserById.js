const apiUrl = process.env.API_URL;

export async function handleGetUserById(req, res) {
  const { id } = req.query;
  try {
    const response = await fetch(`${apiUrl}/users/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar usuário com ID ${id}`, error });
  }
}
