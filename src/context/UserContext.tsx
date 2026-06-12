import { createContext, useState } from "react";


// Tipo del usuario
type User = {
  name: string;
  role: string;
  email: string;
  city: string;
  career: string;
  logged: boolean;
};


// Tipo del contexto
type UserContextType = {
  user: User;
};


// Props del Provider
type UserProviderProps = {
  children: React.ReactNode;
};


// Crear contexto
export const UserContext = createContext({} as UserContextType);


// Provider
export function UserProvider({ children }: UserProviderProps) {

  // Estado global
  const [user] = useState<User>({
    name: "Carlos",
    role: "Administrador",
    email: "carlos@gmail.com",
    city: "Cochabamba",
    career: "Sistemas Informáticos",
    logged: true,
  });


  return (

    <UserContext.Provider value={{ user }}>

      {children}

    </UserContext.Provider>

  );
}