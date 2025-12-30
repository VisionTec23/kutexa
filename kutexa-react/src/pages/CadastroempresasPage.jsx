
import Cadastroempresas from "../components/dashboard/Cadastroempresas";
import DashboardLayout from "./DashboardLayout";

export default function CadastroempresasPage({ onLogout }){
    return(
        <DashboardLayout userName="Adilson Fernandes" onLogout={onLogout}>
            <Cadastroempresas/>
        </DashboardLayout>
    );
}