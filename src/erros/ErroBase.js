class ErroBase extends Error {
  // Construtor da classe ErroBase
  // O construtor recebe dois parâmetros: mensagem e status
  // A mensagem padrão é "Erro interno do servidor" e o status padrão é 500
  // O construtor chama o construtor da classe pai (Error) usando super()
  // A mensagem e o status são atribuídos às propriedades da instância
  // A propriedade message é a mensagem de erro
  // A propriedade status é o código de status HTTP
  constructor(mensagem = "Erro interno do servidor", status = 500) {
    // Chama o construtor da classe pai (Error)
    super();
    this.message = mensagem;
    this.status = status;
  }

  enviarResposta(res) {
    //obtendo o status da resposta
    // O método enviarResposta recebe um objeto de resposta (res) como parâmetro
    // O método envia uma resposta JSON com o status e a mensagem de erro
    res.status(this.status).json({
      status: this.status,
      message: this.message
    });
  }
}

export default ErroBase;