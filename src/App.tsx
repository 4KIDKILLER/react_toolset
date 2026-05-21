import { Cursor } from 'animal-island-ui';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts";

import Login from "./views/login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Cursor>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Cursor>
    </AuthProvider>
  );
}

export default App;
