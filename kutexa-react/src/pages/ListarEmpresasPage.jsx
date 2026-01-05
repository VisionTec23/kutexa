import ListarEmpresas from '../components/dashboard/ListarEmpresas';
import DashboardLayout from './DashboardLayout';

export default function ListarEmpresasPage({onLogout}){
return(
    <DashboardLayout  userName="Empresa" onLogout={onLogout}>
            <ListarEmpresas/>
    </DashboardLayout>
    );
}

 