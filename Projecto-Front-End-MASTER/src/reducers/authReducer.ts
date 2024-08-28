export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
  }
  
  export type AuthAction = 
    | { type: 'LOGIN', token: string }
    | { type: 'LOGOUT' };
  
  // Estado inicial
  export const initialState: AuthState = {
    isAuthenticated: false,
    token: null,
  };
  
  // Reducer para manipular o estado de autenticação
  export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
      case 'LOGIN':
        return {
          isAuthenticated: true,
          token: action.token,
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  };
  