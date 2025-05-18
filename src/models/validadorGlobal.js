import mongoose from "mongoose";

// definindo o validador global para todos os campos do tipo String dos schemas
mongoose.Schema.Types.String.set("validate", {
  // validator é uma função que retorna true ou false
  // se o valor for realmente diferente de uma string vazia, a expressão será avaliada como verdadeira e o dado string será validado. Se a string estiver vazia, vai retornar falso e o dado será invalidado.
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`
});