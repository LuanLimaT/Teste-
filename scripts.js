let livros = [];

// Carregar e processar o arquivo XML
fetch('livraria.xml') //a função FETCH vai criar um array de objetos JavaScript
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser(); //vai analisar o xml
        const xmlDoc = parser.parseFromString(data, "text/xml");//parseFromString converte a string
        //XML em um documento DOM

        //Esse comando retorna todos os elementos <livro> encontrados dentro do documento XML.
        const livrosXML = xmlDoc.getElementsByTagName("livro");
        const bookList = document.getElementById("bookList");

        //Acessando cada livro e extraindo os dados
        for (let i = 0; i < livrosXML.length; i++) {
            const titulo = livrosXML[i].getElementsByTagName("titulo")[0].textContent;
            const autor = livrosXML[i].getElementsByTagName("autor")[0].textContent;
            const ano = livrosXML[i].getElementsByTagName("ano")[0].textContent;

            // Armazenar os livros para o filtro
            livros.push({ titulo, autor, ano });



            // exibir dinamicamente uma lista de livros na página web a
            // partir de dados carregados de um arquivo XML ou outra fonte de dados.
            //o trecho do  código realiza uma requisição para carregar o arquivo XML
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${titulo}</td>
                    <td>${autor}</td>
                    <td>${ano}</td>
                `;
            bookList.appendChild(row);
        }
    });

// Função para filtrar os livros
function filterBooks() {// verifica o valor digitado em cada campo e filtra a lista de livro
    const searchTitle = document.getElementById("searchTitle").value.toLowerCase();
    const searchAuthor = document.getElementById("searchAuthor").value.toLowerCase();
    const searchYear = document.getElementById("searchYear").value;
    const yearComparison = document.getElementById("yearComparison").value; //valor selecionado no campo de comparação de ano (yearComparison

    // Limpar a lista de livros antes de mostrar os filtrados
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    //Filtrando os livros com base nos critérios
    const filteredBooks = livros.filter(livro => {
        let matchTitle = livro.titulo.toLowerCase().includes(searchTitle);
        let matchAuthor = livro.autor.toLowerCase().includes(searchAuthor);
        let matchYear = true;

        // Filtro por ano
        if (searchYear) {
            switch (yearComparison) {
                case "equals":
                    matchYear = livro.ano === searchYear;
                    break;
                case "greater":
                    matchYear = parseInt(livro.ano) > parseInt(searchYear);
                    break;
                case "less":
                    matchYear = parseInt(livro.ano) < parseInt(searchYear);
                    break;
            }
        }

        return matchTitle && matchAuthor && matchYear;
    });

    // Exibir os livros filtrados
    //pega os valores de pesquisa do usuário (título, autor, ano e comparação de ano).
    filteredBooks.forEach(livro => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.ano}</td>
            `;
        bookList.appendChild(row);
    });
}
