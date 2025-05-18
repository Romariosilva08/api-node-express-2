import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
  // O construtor da classe NaoEncontrado recebe uma mensagem padrão
  // e chama o construtor da classe pai (ErroBase) com essa mensagem e o código de status 404.
  constructor(mensagem = "Página não encontrada") {
    // Chama o construtor da classe pai (ErroBase) com a mensagem e o código de status 404.
    // O código de status 404 indica que a página solicitada não foi encontrada.
    super(mensagem, 404);
  }
}  

export default NaoEncontrado;
// A classe NaoEncontrado estende a classe ErroBase e representa um erro específico de "não encontrado".