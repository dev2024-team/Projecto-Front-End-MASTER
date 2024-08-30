const apiUrl = process.env.API_URL;

export async function handleCreateUser(req, res) {
  try {
    const response = await fetch(`${apiUrl}/users/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário', error });
  }
}
