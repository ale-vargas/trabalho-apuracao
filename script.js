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
function AbreJsonVotacao() {
  const input = document.querySelector('#arquivoVotacao');
  const arquivo = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
        const objeto = JSON.parse(e.target.result); // Converte para JSON
        console.log(objeto); // Exibe no console
        
        // Envia o conteúdo para a API (exemplo de envio)
        fetch("http://25.49.76.159:8060/api/Cadastros/eleicao", {
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
function AbreJsonSessoes() {
    const input = document.querySelector('#arquivoSessoes');
    const arquivo = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
          const objeto = JSON.parse(e.target.result); // Converte para JSON
          console.log(objeto); // Exibe no console
          
          // Envia o conteúdo para a API (exemplo de envio)
          fetch("http://25.49.76.159:8060/api/Cadastros/eleicao/importacoes-secoes", {
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

function RecebeApuracao() {

  let zona = document.getElementById("zonaInput")
  let secao = document.getElementById("secaoInput")
  let idZona = document.getElementById
  ("idZona");
  let secoesImportadas = document.getElementById
  ("secoes");
  let quantidadeEleitores = document.getElementById
  ("totalEleitores");
  let percentualPresentes = document.getElementById
  ("percentualPresentes");
  let totalAbstencoes = document.getElementById
  ("totalAbstencoes");
  let percentualAbstencoes = document.getElementById
  ("percentualAbstencoes");

    fetch(`http://25.49.76.159:8060/api/Reultados/eleicao/importacoes-secoes?zonaid=${zona?.value || "0"}&secaoid=${secao?.value || "0"}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Convertendo a resposta para JSON
      })
      .then(data => {
        console.log("Dados recebidos:", data);
        idZona.textContent = "1"
        secoesImportadas.textContent = data.secoesImportadas
        quantidadeEleitores.textContent = data.totalEleitoresPresentes
        percentualPresentes.textContent = data.percentualPresentes
        totalAbstencoes.textContent = data.totalAbstencoes
        percentualAbstencoes.textContent = data.percentualAbstencoes 
      })
      .catch(error => {
        alert(`Seção ${secao.value} não está cadastrada!`); 
      });
      RecebeResultados()
  }

  function RecebeResultados() {
    let nomeEleicao = document.getElementById
    ("nomeEleicao2");

    let candidato = document.getElementById
    ("nomeEleito");
    let candidato1 = document.getElementById
    ("nomeCandidato4");
    let candidato2 = document.getElementById
    ("nomeCandidato5");

    let votos = document.getElementById
    ("votosEleito");
    let votos1 = document.getElementById
    ("quantidadeVotos4");
    let votos2 = document.getElementById
    ("quantidadeVotos5");

    fetch("http://25.49.76.159:8060/api/Reultados/eleicao/resultados?zonaid=0&secaoid=0")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); 
      })
      .then(data => {
        nomeEleicao.textContent = data.nomeEleicao;   
   
        console.log("Dados recebidos:", data.nomeEleicao);
        console.log("Total de Votos válidos:", data.totalVotosValidos);
        console.log("Percentual de votos válido:", data.totalVopercentualVotosValidostosValidos);

        data.candidatos.sort((a, b) => b.quantidadeVotos - a.quantidadeVotos);

        candidato.textContent = data.candidatos[0].nomeCandidato
        candidato1.textContent = data.candidatos[1].nomeCandidato
        candidato2.textContent = data.candidatos[2].nomeCandidato

        votos.textContent = data.candidatos[0].quantidadeVotos
        votos1.textContent = data.candidatos[1].quantidadeVotos
        votos2.textContent = data.candidatos[2].quantidadeVotos

        console.log(data.candidatos[0].nomeCandidato); // data.candidatos[0].nomeCandidato - nome | data.candidatos[0].percentualVotos - percenteual votos | data.candidatos[0].quantidadeVotos - quantidade votos
        console.log(data.candidatos[1].nomeCandidato);
        console.log(data.candidatos[2].nomeCandidato);
      })
      .catch(error => {
        console.error("Erro ao fazer o GET:", error); 
      });
  }