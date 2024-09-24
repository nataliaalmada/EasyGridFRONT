import { createContext, useState, useContext, useEffect } from "react";

// Cria um contexto de autenticação
const AuthContext = createContext({});

// Provedor de Autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Estado para armazenar o usuário
  const [loading, setLoading] = useState(false);  // Estado de carregamento

  // Função para simular o login
  const login = (email, password) => {
    // Mock de um usuário admin
    const mockAdminUser = {
      id: 1,
      name: "Temporary Admin",
      email: "admin@temporary.com",
      role: "admin", // Definindo o papel como 'admin'
    };

    setUser(mockAdminUser);  // Definindo o mock como usuário atual
    console.log("Usuário logado:", mockAdminUser);
  };

  // Função para simular o logout
  const logout = () => {
    setUser(null);  // Limpa o estado do usuário
    console.log("Usuário deslogado");
  };

  // UseEffect vazio que normalmente carregaria o usuário de cookies (não necessário para o mock)
  useEffect(() => {}, []);

  return (
    <AuthContext.Provider
      value={{
        user,  // O usuário logado
        login,  // Função de login
        logout,  // Função de logout
        loading,  // Estado de carregamento
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

