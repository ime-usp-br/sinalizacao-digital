'use strict'

const srcImage = [
    {id:1, url: 'http://natal.ime.usp.br/imagens/canal01/1.gif'},
    {id:2, url: 'http://natal.ime.usp.br/imagens/canal01/2.gif'},
    {id:3, url: 'http://natal.ime.usp.br/imagens/canal01/3.gif'},
    {id:4, url: 'http://natal.ime.usp.br/imagens/canal01/4.gif'},
    {id:5, url: 'http://natal.ime.usp.br/imagens/canal01/5.gif'},
    {id:6, url: 'http://natal.ime.usp.br/imagens/canal01/6.gif'},
    {id:7, url: 'http://natal.ime.usp.br/imagens/canal01/7.gif'},
    {id:8, url: 'http://natal.ime.usp.br/imagens/canal01/8.gif'},
    {id:9, url: 'http://natal.ime.usp.br/imagens/canal01/9.gif'},
    {id:10, url: 'http://natal.ime.usp.br/imagens/canal01/10.gif'}
]

// Função responsável por pegar os dados da api e devolver um array
const pesquisarDefesas = async ()=>{
    const url = "https://eventos.ime.usp.br/api/defesas"

    const response = await fetch(url)
    const data = await response.json()
    

   return data
    
}


//Função responsavel por exibir a primeira tabela
const carregarTabela = async ()=>{
    const dadosTabela = await pesquisarDefesas();
    criarTabela(dadosTabela)
}

//Função responsavel por gerar todo conteudo da tabela e inserir no html
const criarTabela = (dadosTabela)=>{
    const tabela = document.querySelector('table')
    tabela.classList.add("table")
    tabela.classList.add("table-striped")
    tabela.innerHTML = `<tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Local</th>
                        <th>Candidato(a)</th>
                        <th>Orientador(a)</th>
                        <th>Nível</th>
                        <th>Programa</th>
    `
    dadosTabela.forEach(dado =>{
        let linha = criarLinhaTabela(dado)
        tabela.appendChild(linha)
    })
}

//Função responsavel por gerar as siglas que serão introduzidas na tabela
//Ela pega o nome do programa e substitui pela sigla correspondente


//Função responsavel por criar as linhas da tabela
const criarLinhaTabela =  (dado) =>{
   
   let linha = document.createElement("tr")
   let tdData = document.createElement("td")
   let tdHorario = document.createElement("td")
   let tdLocal = document.createElement("td")
   let tdCandidato = document.createElement("td")
   let tdOrientador = document.createElement("td")
   let tdNivel = document.createElement("td")
   let tdPrograma = document.createElement("td")
    
    tdData.innerHTML = dado.data
    tdHorario.innerHTML = dado.horario
    tdLocal.innerHTML = dado.local.nome
    tdCandidato.innerHTML = dado.aluno.nome
    tdOrientador.innerHTML = dado.aluno.orientadores[0].nome
    tdNivel.innerHTML = dado.nivel
    tdPrograma.innerHTML = dado.sigla

    linha.appendChild(tdData)
    linha.appendChild(tdHorario)
    linha.appendChild(tdLocal)
    linha.appendChild(tdCandidato)
    linha.appendChild(tdOrientador)
    linha.appendChild(tdNivel)
    linha.appendChild(tdPrograma)

   
    return linha
}

//Função responsável por listar os membros da banca
const gerarBanca= (tese)=>{
    let banca = tese.banca.membros
    let membros = ""
    
  
    banca.forEach(membro => {
        if(membro.staptp == 1){
             membros+= membro.nome
             if(membro.instituicao != null){
                membros+= ', '+ membro.instituicao.sigla + '</br>'
             }else if(membro.instituicao == null){
                membros+= '</br>'
             }
        }else if(membro.vinculo == "Titular" || membro.vinculo == "Presidente"){
            membros+= membro.nome
             if(membro.instituicao != null){
                membros+= ', '+ membro.instituicao.sigla + '</br>'
             }else if(membro.instituicao == null){
                membros+= '</br>'
             }
        }
    });

      return membros
    }
    

//Função responsavel por gerar as tabelas que virão posteriormente junto com as defesas
const gerarTabelaItem = (teses)=>{
    let cont;
    let tela = "";
    for(cont =  0; cont < teses.length  ; cont++){
        tela += `
        <tr>
        <td>${teses[cont].data}</td>
        <td>${teses[cont].horario}</td>
        <td>${teses[cont].local.nome}</td>
        <td>${teses[cont].aluno.nome}</td>
        <td>${teses[cont].aluno.orientadores[0].nome}</td>
        <td>${teses[cont].nivel}</td>
        <td>${teses[cont].sigla}</td>
        </tr>`
        
    }
    return tela
}


//Função responsável por gerar cada item da page, essa função cria as divs que contém as informações sobre a tese de douturado
const criarSlide =   (teses) =>{
const container = document.getElementById('conteudo')
const cardTese = document.createElement('div')
 cardTese.classList.add('card-tese') 

 const todasTeses = teses.map(tese =>
 ` 
 <div class="carousel-item" data-bs-interval="15000">

 
 <div class="row">
     <div class="col-3 lateral">
         <p class="lateral-titulo text-uppercase">DEFESA DE ${tese.nivel}</p>

         <p class="lateral-data">${tese.data}</p>
         <p class="lateral-hora">${tese.horario}</p>

         <p class="lateral-local-titulo">${tese.local.nome}</p>
         <p class="lateral-local-info"> </p>


         <img src="img/qrcode_defesa_luisa_borsato.png" class="lateral-qrcode" />
         <p class="lateral-url">www.ime.usp.br/defesas</p>
     </div>



     <div class="col-9 corpo">
         <p class="txt-nome-autor">${tese.aluno.nome}</p>

         <p class="titulo-trabalho">${tese.trabalho.titulo}</p>


         <p class="txt-banca-titulo">Comissão julgadora</p>

         <p class="txt-banca">${gerarBanca(tese)}</p>
    

         <p class="txt-programa-titulo">PROGRAMA DE PÓS-GRADUAÇÃO EM ${tese.programa}</p>

     </div>
 </div>
</div>
               
<div class="carousel-item" data-bs-interval="15000">
   <div class="row horizontal">

       <h1 class="text-center text-white lateral-titulo">DEFESAS AGENDADAS</h1>
   </div>

   <div class="row p-5">

       <table class="table table-striped" id="tabela">

       <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Local</th>
                        <th>Candidato(a)</th>
                        <th>Orientador(a)</th>
                        <th>Nível</th>
                        <th>Programa</th>
                        </tr>
          ${gerarTabelaItem(teses)}
       </table>
   </div>


   <img src="img/qrcode_defesas.png" class="lateral-qrcode" />
   <p class="text-center">www.ime.usp.br/defesas</p>

</div>
`)

    const imagens = criarBanner(srcImage);
    const tabela = geraTabelaCompleta(teses);
    const teste = todasTeses + imagens + tabela;

    cardTese.innerHTML = teste
    container.appendChild(cardTese)
                            

}
const geraTabelaCompleta = (teses)=>{
    const tabela = `<div class="carousel-item" data-bs-interval="15000">
    <div class="row horizontal">
 
        <h1 class="text-center text-white lateral-titulo">DEFESAS AGENDADAS</h1>
    </div>
 
    <div class="row p-5">
 
        <table class="table table-striped" id="tabela">
 
        <tr>
                         <th>Data</th>
                         <th>Horário</th>
                         <th>Local</th>
                         <th>Candidato(a)</th>
                         <th>Orientador(a)</th>
                         <th>Nível</th>
                         <th>Programa</th>
                         </tr>
           ${gerarTabelaItem(teses)}
        </table>
    </div>`

    return tabela
}



const criarBanner =   (imagensDb) =>{

    const cardTese = document.createElement('div')
     cardTese.classList.add('card-tese') 
    
     const todasImagens = imagensDb.map(imagem =>
     ` 
     <div class="carousel-item" data-bs-interval="15000">
                    <div class="row">

                        <img src="${imagem.url}" style="max-height: 100%;">

                    </div>
                </div>
    `)
    
                                
    return todasImagens
    }
//Função responsavel por gerar todo o conteudo da pagina
const carregarItens = async()=>{
    const teses = await pesquisarDefesas()
    if(Array.isArray(teses)){
        console.log('array')
    }else{
        console.log('no array')
    }
    gerarTabelaItem(teses)
    criarSlide(teses)
    criarBanner(srcImage)
}

//Inicializando funções
carregarItens()
carregarTabela()