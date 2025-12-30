import { useState } from "react";
import "../../styles/reconciliation.css"; // usando o mesmo CSS

export default function Cadastroempresas() {
  const [companyData, setCompanyData] = useState({
    name: "",
    nif: ""
  });

  const [bankAccounts, setBankAccounts] = useState([
    { accountNumber: "", iban: "" }
  ]);

  const [processing, setProcessing] = useState(false);

  // Handlers para campos da empresa
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountChange = (index, field, value) => {
    const updatedAccounts = [...bankAccounts];
    updatedAccounts[index] = {
      ...updatedAccounts[index],
      [field]: value
    };
    setBankAccounts(updatedAccounts);
  };

  const addAccount = () => {
    if (bankAccounts.length < 5) {
      setBankAccounts([...bankAccounts, { accountNumber: "", iban: "" }]);
    }
  };

  const removeAccount = (index) => {
    if (bankAccounts.length > 1) {
      const updatedAccounts = bankAccounts.filter((_, i) => i !== index);
      setBankAccounts(updatedAccounts);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyData.name || !companyData.nif) {
      alert("Por favor, preencha o nome da empresa e o NIF");
      return;
    }

    const invalidAccounts = bankAccounts.filter(
      (acc) => !acc.accountNumber || !acc.iban
    );

    if (invalidAccounts.length > 0) {
      alert("Por favor, preencha todos os campos das contas bancárias");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      alert(`✅ Empresa "${companyData.name}" cadastrada com sucesso!`);

      setCompanyData({ name: "", nif: "" });
      setBankAccounts([{ accountNumber: "", iban: "" }]);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="reconciliation-container-empresa">
      <div className="page-header-empresa">
        <h1>Cadastrar Nova Empresa</h1>
        <p>Preencha os dados da empresa e das contas bancárias</p>
      </div>

      <div className="register-card-empresa">
        <div className="logo-empresa">
          <div className="upload-header-empresa">
            <div className="upload-icon-empresa">
              <i className="fas fa-building"></i>
            </div>
            <h2>Kutexa</h2>
          </div>
          <p className="logo-subtitle-empresa">Cadastrar Nova Empresa</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="upload-section-empresa">
            {/* Informações da Empresa */}
            <div className="upload-card-empresa">
              <div className="upload-header-empresa">
                <div className="upload-icon-empresa">
                  <i className="fas fa-info-circle"></i>
                </div>
                <h3>Informações da Empresa</h3>
              </div>

              <div className="upload-area-empresa" style={{ padding: "20px" }}>
                <div className="form-grid-empresa">
                  <div className="form-group-empresa">
                    <label htmlFor="companyName">
                      <i className="fas fa-building"></i> Nome da Empresa
                    </label>
                    <div className="input-with-icon-empresa">
                      <input
                        type="text"
                        id="companyName"
                        name="name"
                        placeholder="Nome da empresa"
                        value={companyData.name}
                        onChange={handleCompanyChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group-empresa">
                    <label htmlFor="companyNIF">
                      <i className="fas fa-id-card"></i> NIF
                    </label>
                    <div className="input-with-icon-empresa">
                      <input
                        type="text"
                        id="companyNIF"
                        name="nif"
                        placeholder="Número de identificação fiscal"
                        value={companyData.nif}
                        onChange={handleCompanyChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contas Bancárias */}
            <div className="upload-card-empresa">
              <div className="upload-header-empresa">
                <div className="upload-icon-empresa">
                  <i className="fas fa-university"></i>
                </div>
                <h3>Contas Bancárias</h3>
              </div>

              <div className="upload-area-empresa" style={{ padding: "20px" }}>
                <div className="bank-accounts-header-empresa">
                  <p>Adicione as contas bancárias da empresa</p>
                  <button
                    type="button"
                    className="upload-btn-empresa"
                    onClick={addAccount}
                    disabled={bankAccounts.length >= 5}
                  >
                    <i className="fas fa-plus"></i> Adicionar Conta
                  </button>
                </div>

                {bankAccounts.map((account, index) => (
                  <div key={index} className="bank-account-item-empresa">
                    {bankAccounts.length > 1 && (
                      <button
                        type="button"
                        className="file-action-btn-empresa"
                        onClick={() => removeAccount(index)}
                        style={{ position: "absolute", right: "10px", top: "10px" }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    )}

                    <div className="account-fields-empresa">
                      <div className="form-group-empresa">
                        <label htmlFor={`accountNumber_${index}`}>
                          <i className="fas fa-credit-card"></i> Número da Conta
                        </label>
                        <div className="input-with-icon-empresa">
                          <input
                            type="text"
                            id={`accountNumber_${index}`}
                            placeholder="Número da conta"
                            value={account.accountNumber}
                            onChange={(e) =>
                              handleAccountChange(index, "accountNumber", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group-empresa">
                        <label htmlFor={`accountIBAN_${index}`}>
                          <i className="fas fa-university"></i> IBAN
                        </label>
                        <div className="input-with-icon-empresa">
                          <input
                            type="text"
                            id={`accountIBAN_${index}`}
                            placeholder="Código IBAN"
                            value={account.iban}
                            onChange={(e) =>
                              handleAccountChange(index, "iban", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {bankAccounts.length >= 5 && (
                  <div className="max-accounts-message-empresa">
                    <i className="fas fa-info-circle"></i>
                    Máximo de 5 contas bancárias atingido
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botão de Cadastro */}
          <div className="process-section-empresa">
            <button
              type="submit"
              className="process-btn-empresa"
              disabled={processing}
            >
              {processing ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-check-circle"></i>
              )}{" "}
              {processing ? "Cadastrando..." : "Cadastrar Empresa"}
            </button>
          </div>
        </form>

        <div className="security-notice-empresa">
          <i className="fas fa-shield-alt"></i>
          Dados protegidos com criptografia avançada
        </div>
      </div>
    </div>
  );
}
