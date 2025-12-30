import { BrowserRouter, Route, Routes } from "react-router-dom";

 
import CadastroempresasPage from "./pages/CadastroempresasPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
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
        <Route path="cadastroempresas" element={<CadastroempresasPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
