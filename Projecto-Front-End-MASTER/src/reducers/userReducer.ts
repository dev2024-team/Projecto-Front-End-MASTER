// src/reducers/userReducer.ts

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    dataCriada: string;
  }
  
  type Action =
    | { type: 'SET_USERS'; payload: User[] }
    | { type: 'ADD_USER'; payload: User }
    | { type: 'EDIT_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: string };
  
  export interface UserState {
    users: User[];
  }
  
  export const initialState: UserState = {
    users: [],
  };
  
  export const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
      case 'SET_USERS':
        return { ...state, users: action.payload };
      case 'ADD_USER':
        return { ...state, users: [...state.users, action.payload] };
      case 'EDIT_USER':
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        };
      case 'REMOVE_USER':
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
        };
      default:
        return state;
    }
  };
  