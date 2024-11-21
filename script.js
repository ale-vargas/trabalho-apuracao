function abrirAba(evt, abaNome) {
    // Oculta todos os conteúdos das abas
    const tabcontents = document.querySelectorAll('.tabcontent');
    tabcontents.forEach(function(content) {
        content.classList.remove('active');
    });

    // Remove a classe "active" de todos os botões
    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(function(link) {
        link.classList.remove('active');
    });

    // Exibe o conteúdo da aba clicada e adiciona "active" ao botão da aba
    document.getElementById(abaNome).classList.add('active');
    evt.currentTarget.classList.add('active');
}
function AbreJson() {
  const input = document.querySelector('#arquivo');
  const arquivo = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
        const objeto = JSON.parse(e.target.result); // Converte para JSON
        console.log(objeto); // Exibe no console
        
        // Envia o conteúdo para a API (exemplo de envio)
        fetch("http://localhost:5174/api/Cadastros/eleicao", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(objeto)  // Envia o objeto convertido para JSON
        })
        .then(response => response.json())  // Trata a resposta da API
        .then(data => {
            alert("Resposta do servidor: " + JSON.stringify(data));  // Exibe a resposta no alert
        })
        .catch(error => {
          alert("Erro ao enviar os dados:" + error);  // Exibe erros, caso haja
        });
    } catch (error) {
        alert('Erro ao ler o arquivo JSON.');  // Exibe erro se não for um JSON válido
    }
};
reader.readAsText(arquivo);
}
