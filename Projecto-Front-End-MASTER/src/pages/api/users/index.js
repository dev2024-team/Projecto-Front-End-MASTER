import { handleGetUsers } from './getUsers';
import { handleGetUserById } from './getUserById';
import { handleCreateUser } from './addUser';
import { handleEditUser } from './editUsers';
import { handleDeleteUser } from './deleteUser';



export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        await handleGetUserById(req, res);
      } else {
        await handleGetUsers(req, res);
      } 
      break;

      
    case 'POST':
      if (req.body.userId && req.body.role) {
        await handleCreateUserRole(req, res);
      } else {
        await handleCreateUser(req, res);
      }
      break;

    case 'PUT':
      
      await handleEditUser(req, res);
      
      break;

    case 'DELETE':
      await handleDeleteUser(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
