import { useEffect, useState } from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import Header from '../components/dashboard/Header';
import HistoryTable from '../components/dashboard/HistoryTable';
import ReconciliationChart from '../components/dashboard/ReconciliationChart';
import Sidebar from '../components/dashboard/Sidebar';
import '../styles/DashboardPage.css';

function DashboardPage({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('7');
  const [userName, setUserName] = useState('Adilson Fernandes');

  const dashboardCards = [
    {
      id: 1,
      icon: 'fas fa-sync-alt',
      title: 'Reconciliações Hoje',
      value: '24',
      description: '+5 desde ontem'
    },
    {
      id: 2,
      icon: 'fas fa-check-circle',
      title: 'Taxa de Sucesso',
      value: '98.7%',
      description: 'Precisão nas reconciliações'
    },
    {
      id: 3,
      icon: 'fas fa-clock',
      title: 'Tempo Economizado',
      value: '15h',
      description: 'Este mês'
    },
    {
      id: 4,
      icon: 'fas fa-building',
      title: 'Empresas Ativas',
      value: '12',
      description: 'Clientes ativos'
    }
  ];

  const historyData = [
    { id: 1, empresa: 'Empresa A Ltda', data: '15/12/2024', transacoes: 247, status: 'completed' },
    { id: 2, empresa: 'Comércio B SA', data: '14/12/2024', transacoes: 189, status: 'completed' },
    { id: 3, empresa: 'Indústria C', data: '14/12/2024', transacoes: 312, status: 'pending' },
    { id: 4, empresa: 'Serviços D ME', data: '13/12/2024', transacoes: 156, status: 'completed' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout();
    }
  };

  useEffect(() => {
    // Recuperar nome do usuário do localStorage (se existir)
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }

    // Adicionar ou remover classe do body quando sidebar está aberta
    if (sidebarOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [sidebarOpen]);

  return (
    <div className="dashboard-container">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="menu-overlay active" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar 
        isOpen={sidebarOpen} 
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Header 
          userName={userName}
          onMenuClick={toggleSidebar}
        />

        <main className="content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <h2>Bem-vindo de volta, {userName.split(' ')[0]}!</h2>
              <p>Seu dashboard foi atualizado com as últimas reconciliações.</p>
            </div>
            <button className="quick-action">
              <i className="fas fa-plus"></i>
              Nova Reconciliação
            </button>
          </div>

          {/* Cards Principais */}
          <div className="cards-grid">
            {dashboardCards.map(card => (
              <DashboardCard
                key={card.id}
                icon={card.icon}
                title={card.title}
                value={card.value}
                description={card.description}
              />
            ))}
          </div>

          <div className="dashboard-content">
            {/* Coluna esquerda - Histórico */}
            <div className="dashboard-column">
              <section className="history-section">
                <div className="section-header">
                  <h2>Histórico de Reconciliações</h2>
                  <a href="/reconciliations" className="view-all">Ver Todos</a>
                </div>
                <HistoryTable data={historyData} />
              </section>

              {/* Atividades Recentes */}
              <section className="activities-section">
                <div className="section-header">
                  <h2>Atividades Recentes</h2>
                </div>
                <div className="activities-list">
                  <div className="activity-item">
                    <div className="activity-icon success">
                      <i className="fas fa-check"></i>
                    </div>
                    <div className="activity-content">
                      <p>Reconciliação concluída para <strong>Empresa A</strong></p>
                      <span className="activity-time">Há 2 horas</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon warning">
                      <i className="fas fa-exclamation"></i>
                    </div>
                    <div className="activity-content">
                      <p>3 transações precisam de atenção em <strong>Comércio B</strong></p>
                      <span className="activity-time">Há 4 horas</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon info">
                      <i className="fas fa-sync-alt"></i>
                    </div>
                    <div className="activity-content">
                      <p>Reconciliação automática iniciada para <strong>12 empresas</strong></p>
                      <span className="activity-time">Hoje, 08:00</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Coluna direita - Gráfico */}
            <div className="dashboard-column">
              <section className="chart-section">
                <div className="section-header">
                  <h2>Últimas Reconciliações</h2>
                  <div>
                    <select 
                      id="chartPeriod" 
                      value={chartPeriod}
                      onChange={(e) => setChartPeriod(e.target.value)}
                      className="chart-select"
                    >
                      <option value="7">Últimos 7 dias</option>
                      <option value="30">Últimos 30 dias</option>
                      <option value="90">Últimos 3 meses</option>
                    </select>
                  </div>
                </div>
                <ReconciliationChart period={chartPeriod} />
              </section>

              {/* Status das Empresas */}
              <section className="companies-status">
                <div className="section-header">
                  <h2>Status das Empresas</h2>
                </div>
                <div className="status-grid">
                  <div className="status-card">
                    <div className="status-indicator active"></div>
                    <div className="status-info">
                      <h4>Empresas Ativas</h4>
                      <p className="status-count">8</p>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="status-indicator processing"></div>
                    <div className="status-info">
                      <h4>Em Processamento</h4>
                      <p className="status-count">3</p>
                    </div>
                  </div>
                  <div className="status-card">
                    <div className="status-indicator pending"></div>
                    <div className="status-info">
                      <h4>Pendentes</h4>
                      <p className="status-count">1</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;