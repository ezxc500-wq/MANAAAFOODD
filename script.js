// 1. CONFIGURAÇÃO DO FIREBASE
// Substitua os dados abaixo com as credenciais que você pegou no painel do seu Firebase!
const firebaseConfig = {
  apiKey: "AIzaSyDBgnbNpgltuIUa5Zm_yC-8B33LDW9m0OQ",
  authDomain: "mannnnaaa-7e81a.firebaseapp.com",
  databaseURL: "https://mannnnaaa-7e81a-default-rtdb.firebaseio.com",
  projectId: "mannnnaaa-7e81a",
  storageBucket: "mannnnaaa-7e81a.firebasestorage.app",
  messagingSenderId: "799201209782",
  appId: "1:799201209782:web:d24032c8c7d675b22d6517",
  measurementId: "G-W8VKWYWM45"
};


// 2. INICIALIZAÇÃO DO FIREBASE (Atualizado com os novos itens)
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let quantidadesAtuais = {
    hotdog: 0,
    salgados: 0,
    arrozdoce: 0,
    bolopote: 0,
    espetinhodoce: 0,
    caldinho: 0,
    xburguer: 0,
    xsalada: 0,
    xegg: 0,
    xeggsalada: 0,
    xbacon: 0,
    xbaconsalada: 0,
    xeggbaconsalada: 0,
    acai: 0
};

// 3. ESCUTAR MUDANÇAS EM TEMPO REAL
// Sempre que QUALQUER pessoa clicar em um botão, o Firebase avisa todas as outras telas abertas
database.ref('vendas').on('value', (snapshot) => {
    const dados = snapshot.val();
    if (dados) {
        // Atualiza o nosso objeto na memória com os dados que vieram da nuvem
        quantidadesAtuais = dados;
        
        // Atualiza os números visíveis na tela de todo mundo instantaneamente
        for (let item in dados) {
            const elementoHtml = document.getElementById(item);
            if (elementoHtml) {
                elementoHtml.innerText = dados[item];
            }
        }
    }
});

// 4. FUNÇÃO PARA ADICIONAR +1 (Modifica diretamente na nuvem)
function adicionar(item) {
    // Garante que se o item não existir no banco ainda, ele comece em 0 e some 1
    const novaQuantidade = (quantidadesAtuais[item] || 0) + 1;
    
    // Envia o novo número para a nuvem do Firebase
    database.ref('vendas/' + item).set(novaQuantidade);
}

// 5. FUNÇÃO PARA ZERAR O CONTADOR DE TODO MUNDO (Atualizado com os novos itens)
function zerarTudo() {
    if (confirm("Tem certeza que deseja zerar as vendas de todo mundo?")) {
        const zerados = {
            hotdog: 0,
            salgados: 0,
            arrozdoce: 0,
            bolopote: 0,
            espetinhodoce: 0,
            caldinho: 0,
            xburguer: 0,
            xsalada: 0,
            xegg: 0,
            xeggsalada: 0,
            xbacon: 0,
            xbaconsalada: 0,
            xeggbaconsalada: 0,
            acai: 0
        };
        database.ref('vendas').set(zerados);
    }
}
