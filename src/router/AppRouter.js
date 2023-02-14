import React, { useEffect } from 'react';
import { useContext } from 'react';
import { 
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const { auth, verificaToken } = useContext(AuthContext);

  useEffect(() => {
      verificaToken();
  }, [verificaToken]);
  

  if (auth.checking) {
    return <h1>Espere por favor</h1>
  }

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<ChatPage />} />
    //     {/* el asterisco le dice a react que las rutas son anidadas y el elemento debe responder a la ruta que comienza con /auth/ */}
    //     <Route path="/auth/*" element={<AuthRouter />} />
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
      <Routes>
          <Route
              path="/"
              element={
                  <PublicRoute isAuthenticated={auth.logged}>
                      <ChatPage />
                  </PublicRoute>
              }
          />
          <Route
              path="/auth/*"
              element={
                  <PrivateRoute isAuthenticated={auth.logged}>
                      <AuthRouter />
                  </PrivateRoute>
              }
          />

          <Route path="*" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  )
}
