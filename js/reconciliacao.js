// js/reconciliacao.js
import { reconciliar } from "./request.js";

export async function iniciarReconciliação() {
  const bankInput = document.getElementById("extratos");
  const faturas = document.getElementById("faturas");
  const resultado = document.getElementById("resultado");
  const status = document.getElementById("status");
  const processBtn = document.getElementById("processBtn");
  const loadingOverlay = document.getElementById("loadingOverlay");

  if (!bankInput || !faturas) {
    console.error("Inputs não encontrados: verifique os IDs");
    resultado.textContent = "Erro: inputs não encontrados.";
    return;
  }

  if (bankInput.files.length === 0) {
    resultado.textContent = "Selecione o extrato bancário (extratos).";
    return;
  }

  // Monta FormData com chaves explícitas esperadas pela API
  const formData = new FormData();

  // Um arquivo do extrato bancário
  formData.append("extratos", bankInput.files[0]);

  // Vários arquivos de faturas (se houver)
  if (faturas.files.length === 0) {
    resultado.textContent = "Selecione pelo menos uma invoice.";
    return;
  }
  for (let i = 0; i < faturas.files.length; i++) {
    // chave "faturas" repetida para arrays multipart
    formData.append("faturas", faturas.files[i]);
  }

  // MOSTRAR LOADING
  loadingOverlay.classList.add('active');
  processBtn.disabled = true;
  processBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
  status.textContent = "Reconciliação iniciada...";

  try {
    const dados = await reconciliar(formData);
    
    // Salva os dados no localStorage para usar na página de resultados
    localStorage.setItem('reconciliationData', JSON.stringify(dados));
    
    // O loading continua até a página de resultados carregar
    console.log("✅ Reconciliação concluída! Redirecionando...");
    
    // Redireciona para a página de resultados
    window.location.href = 'resultados.html';
    
  } catch (err) {
    console.error("Erro na reconciliação:", err);
    
    // ESCONDER LOADING EM CASO DE ERRO
    loadingOverlay.classList.remove('active');
    processBtn.disabled = false;
    processBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Iniciar Reconciliação';
    status.textContent = "Erro ao processar. Verifique o console.";
  }
}