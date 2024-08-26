// pages/api/login.js
export default async function handlerLogin(req, res) {
    if (req.method === 'POST') {
      const { email, password } = req.body;
  
      const response = await fetch('http://localhost:3004/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        res.status(201).json(data);
      } else {
        res.status(401).json({ message: 'Erro na API: Usuario nao encontrado' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }

  