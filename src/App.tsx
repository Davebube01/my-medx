import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./Routes";
import "./index.css";

import { MockDataProvider } from "./context/MockDataContext";

function App() {
  return (
    <AuthProvider>
      <MockDataProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MockDataProvider>
    </AuthProvider>
  );
}

export default App;
