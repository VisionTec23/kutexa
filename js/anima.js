/* Adicione este CSS ao seu arquivo style.css */

/* Container da animação de reconciliação */
.reconciliation-animation {
    width: 100%;
    max-width: 800px;
    height: 400px;
    margin: 4rem auto;
    position: relative;
    background: rgba(244, 241, 236, 0.03);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(200, 169, 81, 0.2);
    border-radius: 24px;
    overflow: hidden;
}

/* Documentos que aparecem */
.document {
    position: absolute;
    width: 120px;
    height: 160px;
    background: linear-gradient(135deg, rgba(244, 241, 236, 0.9), rgba(244, 241, 236, 0.7));
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
}

/* Linhas no documento */
.document::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 15px;
    right: 15px;
    height: 8px;
    background: rgba(200, 169, 81, 0.3);
    border-radius: 4px;
}

.document::after {
    content: '';
    position: absolute;
    top: 40px;
    left: 15px;
    right: 15px;
    height: 6px;
    background: rgba(200, 169, 81, 0.2);
    border-radius: 3px;
}

/* Linha adicional no documento */
.document .doc-line {
    position: absolute;
    width: 70%;
    height: 5px;
    background: rgba(200, 169, 81, 0.15);
    border-radius: 2.5px;
}

.document .doc-line:nth-child(1) { top: 60px; }
.document .doc-line:nth-child(2) { top: 75px; width: 50%; }
.document .doc-line:nth-child(3) { top: 90px; width: 60%; }

/* Ícone de verificação no documento reconciliado */
.document .check-icon {
    position: absolute;
    bottom: 20px;
    width: 30px;
    height: 30px;
    background: var(--accent);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 0.8rem;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s ease;
}

/* Linhas de conexão */
.connection-line {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    transform-origin: left center;
    opacity: 0;
}

/* Ponto de conexão */
.connection-dot {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--accent);
    border-radius: 50%;
    transform: scale(0);
    box-shadow: 0 0 15px var(--accent);
}

/* Processo de reconciliação */
.process-ring {
    position: absolute;
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 2s linear infinite;
    opacity: 0;
}

/* Painel de status da reconciliação */
.reconciliation-stats {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(20, 83, 45, 0.8);
    padding: 1rem 2rem;
    border-radius: 12px;
    display: flex;
    gap: 3rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(200, 169, 81, 0.3);
}

.stat-counter {
    text-align: center;
}

.stat-counter .value {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--accent);
}

.stat-counter .label {
    font-size: 0.9rem;
    color: var(--light);
    opacity: 0.8;
}

/* Animações específicas */
@keyframes documentEntry {
    0% {
        transform: translateY(-100px) rotate(-10deg);
        opacity: 0;
    }
    100% {
        transform: translateY(0) rotate(0);
        opacity: 1;
    }
}

@keyframes documentMatch {
    0% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    50% {
        transform: scale(1.1);
        box-shadow: 0 15px 40px rgba(200, 169, 81, 0.4);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
}

@keyframes lineDraw {
    0% {
        transform: scaleX(0);
        opacity: 1;
    }
    100% {
        transform: scaleX(1);
        opacity: 1;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes counterIncrement {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}

/* Classes para controle via JavaScript */
.document.entering {
    animation: documentEntry 0.6s ease forwards;
}

.document.matching {
    animation: documentMatch 0.5s ease forwards;
}

.document.reconciled {
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(244, 241, 236, 0.7));
    border: 2px solid rgba(76, 175, 80, 0.3);
}

.document.reconciled .check-icon {
    opacity: 1;
    transform: scale(1);
    animation: pulse 1s ease infinite;
}

.connection-line.active {
    animation: lineDraw 0.5s ease forwards;
}

.connection-dot.active {
    animation: lineDraw 0.3s ease 0.5s forwards;
}

.process-ring.active {
    opacity: 1;
}

.stat-counter.animating .value {
    animation: counterIncrement 0.3s ease forwards;
}