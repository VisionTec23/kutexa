import { BrowserRouter, Route, Routes } from "react-router-dom";

 
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import ListarEmpresasPage from "./pages/ListarEmpresasPage";
import LoginPage from "./pages/LoginPage";
import ReconciliationPage from "./pages/ReconciliationPage";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={< DashboardPage/>} />
        <Route path="/reconciliation" element={< ReconciliationPage/>} />
        <Route path="/cadastroempresas" element={<ListarEmpresasPage/>}/>
        <Route path="/listarEmpresas" element={<ListarEmpresasPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
