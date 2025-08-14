document.addEventListener("DOMContentLoaded", () => {
    // === Elementos DOM ===
    const musicaInicio = document.getElementById("musica-inicio");
    const guardianNameEl = document.getElementById("guardian-name");
    const guardianTitleEl = document.getElementById("guardian-title");
    const guardianImageContainerEl = document.querySelector(
        ".guardian-portrait-container"
    );
    const dialogueTextEl = document.getElementById("dialogue-text");
    const continueBtn = document.getElementById("continuar-jornada-btn");

    // === Dados dos Guardiões ===
    const guardiansData = {
        Flora: {
            name: "Flora",
            title: "Guardiã da Força",
            image: "assets/mascote.png/flora.1.png",
            dialogue: [
                "Jovem aprendiz, o meu nome é Flora, e tu foste escolhido para caminhar ao meu lado.",
                "Eu sou a guardiã do corpo, da vitalidade, e te guiarei a cuidar de teu templo físico.",
                "Mas cuidado, pois o Sedentarion espreita. Ele é a sombra que invade a clareira quando negligencias o teu corpo.",
                "Lembre-se: 'O corpo fala. Mas tu estás disposto a escutar?'",
                "Vamos, a jornada pelo Grimório te espera!",
            ],
        },
        Mentis: {
            name: "Mentis",
            title: "Guardião do Conhecimento",
            image: "assets/mascote.png/mentis.1",
            dialogue: [
                "Saudações, novo buscador. Eu sou Mentis, o guardião da sabedoria.",
                "Tua mente é um jardim. Eu te ajudarei a cultivá-la e a afastar o Procrastinax, a erva daninha que surge ao ignorar as metas mentais.",
                "Não esqueças: 'Tua mente é um jardim. Cultivas ou deixas ervas daninhas?'",
                "O conhecimento é a maior das armas. Juntos, iremos forjá-lo!",
            ],
        },
        Ordus: {
            name: "Ordus",
            title: "Guardião do Caos",
            image: "assets/mascote.png/ordus.1.png",
            dialogue: [
                "Finalmente, chegaste. Eu sou Ordus, e meu templo protege a ordem que nasce do caos.",
                "Eu sou o guardião dos hábitos e da rotina. Juntos, transformaremos as tuas repetições em atos de poder.",
                "O Desordem Primeva é nosso inimigo, a sombra que cresce conforme os maus hábitos se acumulam. Mas 'não há caos sem ordem. E não há ordem sem coragem.'",
                "Seja bem-vindo. Teus vícios são tuas repetições. Estás preso nelas?",
            ],
        },
        Lumen: {
            name: "Lumen",
            title: "Guardiã Interior",
            image: "assets/mascote.png/lumen.1.png",
            dialogue: [
                "Seja bem-vindo, alma curiosa. Eu sou Lumen, a guardiã da Caverna Interior.",
                "Minha missão é guiar-te na jornada do autoconhecimento e do autocuidado, para que tu encontres a tua própria luz.",
                "Os Devoradores de Tempo que nos ameaçam são as sombras da procrastinação e os pensamentos sabotadores, que te impedem de cuidar de ti mesmo.",
                "Estou aqui para iluminar o caminho. Juntos, faremos com que a tua luz interior brilhe mais forte.",
            ],
        },
        Lux: {
            name: "Lux",
            title: "Guardião da Aurora Digital",
            image: "assets/mascote.png/lux.1.png",
            dialogue: [
                "Bem-vindo à nova era, aprendiz. Eu sou Lux, o guardião da Aurora Digital.",
                "Eu te ajudarei a navegar pelas tecnologias e a construir a tua carreira, transformando o virtual em teu aliado.",
                "Os Devoradores de Tempo, nesta área, são as distrações digitais e o sedentarismo virtual. Eles consomem teu potencial e te desviam do caminho.",
                "Concentre-se, e faremos de tua carreira um farol de sucesso!",
            ],
        },
        Lucros: {
            name: "Lucros",
            title: "Guardião das Finanças",
            image: "assets/mascote.png/lucros.1.png",
            dialogue: [
                "Olá, novo viajante. Meu nome é Lucros, guardião da Câmara das Moedas.",
                "Eu te ajudarei a dominar as finanças. Não planejar é o mesmo que aceitar perder. Eu sou a resistência que te fará construir um futuro sólido.",
                "O nosso inimigo é o Consumptus, que consome tuas metas quando teus gastos descontrolam.",
                "Lembra-te: 'Tu gastas mais com teus impulsos do que com teus sonhos?'",
            ],
        },
    };

    // === Lógica principal ===
    const chosenGuardian = localStorage.getItem("guardiao");

    // Se não houver guardião salvo, redireciona para a tela de login
    if (!chosenGuardian || !guardiansData[chosenGuardian]) {
        alert("Nenhum guardião foi escolhido. Redirecionando para o cadastro.");
        window.location.href = "login.html";
        return;
    }

    const guardian = guardiansData[chosenGuardian];

    // Preenche as informações na tela
    guardianNameEl.textContent = guardian.name;
    guardianTitleEl.textContent = guardian.title;
    guardianImageContainerEl.innerHTML = `<img src="${guardian.image}" alt="${guardian.name}" class="guardian-image">`;

    // Inicia o diálogo com efeito de máquina de escrever
    let currentDialogueIndex = 0;
    let typingTimeout;
    const typingSpeed = 50;

    function typeWriter(text, element, callback) {
        let charIndex = 0;
        element.textContent = "";
        clearTimeout(typingTimeout);

        function type() {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                typingTimeout = setTimeout(type, typingSpeed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function showNextDialogue() {
        if (currentDialogueIndex < guardian.dialogue.length) {
            typeWriter(
                guardian.dialogue[currentDialogueIndex],
                dialogueTextEl,
                () => {
                    currentDialogueIndex++;
                    setTimeout(showNextDialogue, 1500); // Pausa entre as frases
                }
            );
        } else {
            // Quando terminar, mostra o botão de continuar
            continueBtn.style.display = "block";
        }
    }

    // A nova solução para o áudio!
    window.addEventListener("pageshow", (event) => {
        if (musicaInicio) {
            musicaInicio.volume = 0.1;
            // A propriedade 'persisted' indica se a página foi restaurada do cache
            if (event.persisted) {
                musicaInicio.play().catch(e => console.log('Música não pôde ser reproduzida após restauração.'));
            } else {
                // Caso contrário, é um carregamento novo
                musicaInicio.play().catch(e => console.log('Música não pôde ser reproduzida no carregamento.'));
            }
        }
    });

    // Inicia a apresentação
    showNextDialogue();

    // === Evento do botão de continuar ===
    continueBtn.addEventListener("click", () => {
        window.location.href = "mapa.html";
    });
});