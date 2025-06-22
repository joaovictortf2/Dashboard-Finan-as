  /*Código JavaScript  */
  
    /* Array para armazenar os lançamentos financeiros */
    let lancamentos = [];

    // Formata um valor para duas casas decimais
    function formatarValor(valor) {
      return parseFloat(valor).toFixed(2);
    }

    // Atualiza os elementos da tela com os valores atuais
    function atualizarDashboard() {
      const lista = document.getElementById('lista');
      const totalReceitas = document.getElementById('totalReceitas');
      const totalDespesas = document.getElementById('totalDespesas');
      const saldo = document.getElementById('saldo');

      // Limpa a lista antes de atualizar
      lista.innerHTML = '';

      // Inicializa os totais
      let receitas = 0;
      let despesas = 0;

      // Percorre todos os lançamentos e atualiza a interface
      lancamentos.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${item.tipo === 'receita' ? '+' : '-'} R$ ${formatarValor(item.valor)} - ${item.descricao}</span>
          <button class="delete-btn" onclick="excluirLancamento(${index})">&times;</button>
        `;
        lista.appendChild(li);

        // Soma receitas e despesas separadamente
        if (item.tipo === 'receita') {
          receitas += parseFloat(item.valor);
        } else {
          despesas += parseFloat(item.valor);
        }
      });

      // Atualiza os totais na tela
      totalReceitas.textContent = formatarValor(receitas);
      totalDespesas.textContent = formatarValor(despesas);
      saldo.textContent = formatarValor(receitas - despesas);
    }

    // Adiciona um novo lançamento financeiro
    function adicionarLancamento() {
      const descricao = document.getElementById('descricao').value;
      const valor = document.getElementById('valor').value;
      const tipo = document.getElementById('tipo').value;

      // Validação simples dos campos
      if (!descricao || !valor || isNaN(valor)) {
        alert('Preencha corretamente os campos!');
        return;
      }

      // Adiciona o novo item ao array
      lancamentos.push({ descricao, valor: parseFloat(valor), tipo });

      // Limpa os campos do formulário
      document.getElementById('descricao').value = '';
      document.getElementById('valor').value = '';

      // Atualiza a visualização
      atualizarDashboard();
    }

    // Remove um lançamento do array e atualiza a tela
    function excluirLancamento(index) {
      lancamentos.splice(index, 1); // Remove o item pelo índice
      atualizarDashboard();
    }
 