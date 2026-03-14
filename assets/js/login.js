document.addEventListener("DOMContentLoaded", () => {
  const musicaInicio = document.getElementById("musica-inicio");

  const loginPanel = document.getElementById("login-panel");
  const cadastroPanel = document.getElementById("cadastro-panel");
  const perguntasPanel = document.getElementById("perguntas-panel");

  const formLogin = document.getElementById("formLogin");
  const formCadastro = document.getElementById("formCadastro");
  const formPerguntas = document.getElementById("formPerguntas");

  const linkCadastro = document.getElementById("link-cadastro");
  const linkLogin = document.getElementById("link-login");

  const voltarBtn = document.getElementById("voltar-btn");
  const voltarBtnCadastro = document.getElementById("voltar-btn-cadastro");
  const voltarBtnPerguntas = document.getElementById("voltar-btn-perguntas");

  const passwordError = document.getElementById("password-error");
  const loginError = document.getElementById("login-error");

  function tryPlayMusic() {
    if (!musicaInicio) return;
    musicaInicio.volume = 0.1;
    musicaInicio.muted = false;

    musicaInicio.play().catch(() => {
      console.log("A música não pôde ser reproduzida automaticamente.");
    });
  }

  function stopMusic() {
    if (!musicaInicio) return;
    musicaInicio.pause();
    musicaInicio.currentTime = 0;
  }

  function showPanel(panelToShow) {
    [loginPanel, cadastroPanel, perguntasPanel].forEach((panel) => {
      panel.classList.remove("active");
    });

    panelToShow.classList.add("active");

    if (passwordError) passwordError.textContent = "";
    if (loginError) loginError.textContent = "";
  }

  function goHome() {
    stopMusic();
    window.location.href = "index.html";
  }

  function firstInteractionMusic() {
    tryPlayMusic();
    document.removeEventListener("click", firstInteractionMusic);
    document.removeEventListener("keydown", firstInteractionMusic);
  }

  document.addEventListener("click", firstInteractionMusic, { once: true });
  document.addEventListener("keydown", firstInteractionMusic, { once: true });

  window.addEventListener("pageshow", () => {
    if (musicaInicio) musicaInicio.volume = 0.1;
  });

  if (linkCadastro) {
    linkCadastro.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(cadastroPanel);
    });
  }

  if (linkLogin) {
    linkLogin.addEventListener("click", (event) => {
      event.preventDefault();
      showPanel(loginPanel);
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const senha = document.getElementById("login-senha").value;

      const emailSalvo = localStorage.getItem("email");
      const senhaSalva = localStorage.getItem("senha");

      if (!email || !senha) {
        loginError.textContent = "Preencha todos os campos.";
        return;
      }

      if (!emailSalvo || !senhaSalva) {
        loginError.textContent = "Nenhuma conta cadastrada ainda. Crie uma nova jornada.";
        return;
      }

      if (email !== emailSalvo || senha !== senhaSalva) {
        loginError.textContent = "Email ou senha inválidos.";
        return;
      }

      loginError.textContent = "";
      stopMusic();
      window.location.href = "mapa.html";
    });
  }

  if (formCadastro) {
    formCadastro.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = document.getElementById("cadastro-nome").value.trim();
      const email = document.getElementById("cadastro-email").value.trim();
      const senha = document.getElementById("cadastro-senha").value;
      const senhaConfirma = document.getElementById("cadastro-senha-confirma").value;

      if (!nome || !email || !senha || !senhaConfirma) {
        passwordError.textContent = "Preencha todos os campos.";
        return;
      }

      if (senha !== senhaConfirma) {
        passwordError.textContent = "As senhas não coincidem.";
        return;
      }

      passwordError.textContent = "";

      localStorage.setItem("nomeUsuario", nome);
      localStorage.setItem("email", email);
      localStorage.setItem("senha", senha);

      showPanel(perguntasPanel);
    });
  }

  if (formPerguntas) {
    formPerguntas.addEventListener("submit", (event) => {
      event.preventDefault();

      const respostaTempo = formPerguntas.tempo.value;
      let guardiao = "";

      switch (respostaTempo) {
        case "atividades físicas":
          guardiao = "Flora";
          break;
        case "estudar":
          guardiao = "Mentis";
          break;
        case "organizar":
          guardiao = "Ordus";
          break;
        case "auto-cuidado":
          guardiao = "Lumen";
          break;
        case "tecnologia":
          guardiao = "Lux";
          break;
        case "finanças":
          guardiao = "Lucros";
          break;
      }

      localStorage.setItem("guardiao", guardiao);

      stopMusic();
      window.location.href = "guardioes.html";
    });
  }

  if (voltarBtn) voltarBtn.addEventListener("click", goHome);
  if (voltarBtnCadastro) voltarBtnCadastro.addEventListener("click", goHome);
  if (voltarBtnPerguntas) voltarBtnPerguntas.addEventListener("click", goHome);
});