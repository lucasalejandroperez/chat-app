import React, { createContext, useState } from "react";
import { useContext } from "react";
import { useCallback } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext);

    const login = async(email, password)  => {
        const resp = await fetchSinToken('login', { email, password }, 'POST');

        if (resp.ok) {
            localStorage.setItem('token-socket', resp.token);

            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            });
        }

        return resp.ok;
    }

    const register = async(name, email, password) => {
        const resp = await fetchSinToken('login/new', { name, password, email }, 'POST');

        if (resp.ok) {
            localStorage.setItem('token-socket', resp.token);

            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            });

            return true;
        }

        return resp.msg;
    }

    const verificaToken = useCallback( async() => {
        const token = localStorage.getItem('token-socket');

        // Si el token no existe
        if ( !token ) {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })

            return false;
        }

        const resp = await fetchConToken('login/renew');

        if (resp.ok) {
            localStorage.setItem('token-socket', resp.token);

            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.name,
                email: usuario.email
            });

            return true;
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            });

            return false;
        }
      },
    []);
    
    const logout = () => {
        localStorage.removeItem('token-socket');
        
        dispatch({
            type: types.borrarMensajes
        });

        setAuth({
            checking: false,
            logged: false,
        });

    }

  return (
    <AuthContext.Provider value={{
        auth,
        login,
        register,
        verificaToken,
        logout,
    }}>
        {children}
    </AuthContext.Provider>
  )
}
