const apiUrl = process.env.API_URL;

export async function handleGetUsers(req, res) {
  try {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
}
