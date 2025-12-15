import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de login
    setTimeout(() => {
      alert(`Login efetuado com sucesso!\nEmail: ${email}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      <style>{css}</style>

      <div className="login-card">
        <h1 className="login-title">KUTEXA</h1>
        <p className="login-subtitle">Acesso à plataforma</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Esqueci a senha</a>
          <span>•</span>
          <a href="#">Criar conta</a>
        </div>
      </div>
    </div>
  );
}

const css = `
:root {
  --primary: #c8a951;
  --bg: #0b0e13;
  --card: #111827;
  --text: #e5e7eb;
  --muted: #9ca3af;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.login-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at top, #1f2933, var(--bg));
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", system-ui, sans-serif;
}

.login-card {
  width: 100%;
  max-width: 380px;
  background: linear-gradient(180deg, #111827, #0b1220);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  color: var(--text);
}

.login-title {
  margin: 0;
  text-align: center;
  font-size: 28px;
  letter-spacing: 3px;
  color: var(--primary);
}

.login-subtitle {
  text-align: center;
  color: var(--muted);
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  color: var(--muted);
}

.form-group input {
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #1f2937;
  background: #020617;
  color: var(--text);
  outline: none;
}

.form-group input:focus {
  border-color: var(--primary);
}

.login-button {
  margin-top: 12px;
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: linear-gradient(135deg, var(--primary), #f5d76e);
  color: #020617;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(200, 169, 81, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
}

.login-footer a {
  color: var(--primary);
  text-decoration: none;
}

.login-footer span {
  color: var(--muted);
}
`;
