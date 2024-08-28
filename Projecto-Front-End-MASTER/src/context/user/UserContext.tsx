// src/context/UserContext.tsx

import React, { createContext, useReducer, ReactNode, useContext, useEffect } from 'react';
import { userReducer, initialState, UserState, User } from '../../reducers/userReducer';

interface UserContextProps {
  state: UserState;
  dispatch: React.Dispatch<any>;
  fetchUsers: (token: string) => void;
  addUser: (user: User, token: string) => void;
  editUser: (user: User, token: string) => void;
  removeUser: (id: string, token: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async (token: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }
      const data = await response.json();
      dispatch({ type: 'SET_USERS', payload: data });
    } catch (error) {
      console.error('Erro ao buscar os usuários:', error);
    }
  };

  const addUser = async (user: User, token: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        dispatch({ type: 'ADD_USER', payload: user });
      } else {
        throw new Error('Erro ao cadastrar usuário');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  const editUser = async (user: User, token: string) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        dispatch({ type: 'EDIT_USER', payload: user });
      } else {
        throw new Error('Erro ao editar usuário');
      }
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  };

  const removeUser = async (id: string, token: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        dispatch({ type: 'REMOVE_USER', payload: id });
      } else {
        throw new Error('Erro ao remover usuário');
      }
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
  };

  return (
    <UserContext.Provider value={{ state, dispatch, fetchUsers, addUser, editUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
