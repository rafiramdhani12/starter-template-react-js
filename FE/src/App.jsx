import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import LayoutPage from "./layout/LayoutPage";

function App() {
  return (
    <LayoutPage>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </LayoutPage>
  );
}

export default App;
