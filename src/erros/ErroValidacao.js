import RequisicaoIncorreta from './RequisicaoIncorreta.js';

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        let mensagensErro = '';

        // Formata a mensagem de erro para incluir os detalhes de cada erro de validação
        // O erro é um objeto que contém os detalhes dos erros de validação
        // A propriedade "erros" contém um array de erros, onde cada erro tem uma propriedade "message"
        // Se o erro for uma instância de ValidationError, formata a mensagem
        // err?.errors é um objeto que contém os detalhes dos erros de validação
        // Se o erro não for uma instância de ValidationError, usa a mensagem padrão
        if (erro?.name === 'ValidationError') {
            mensagensErro = Object.values(erro.errors)
                .map(e => e.message)
                .join(', ');
        } else {
            // Se o erro não for uma instância de ValidationError, usa a mensagem padrão
            mensagensErro = erro?.message || 'Erro de validação desconhecido';
        }
        // Chama o construtor da classe pai (RequisicaoIncorreta)
        // passando a mensagem de erro formatada
        super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

export default ErroValidacao;   

