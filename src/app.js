import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

// app é o objeto principal do express
const app = express();
// app.use() é um método do express que permite adicionar middleware
// middleware é uma função que tem acesso ao objeto de requisição (req), ao objeto de resposta (res) e à próxima função de middleware na pilha
// express.json() é um middleware que analisa o corpo da requisição e o transforma em um objeto JSON
app.use(express.json())
// routes é um método do express que permite definir as rotas da aplicação
routes(app);

// manipulador404 é um middleware que trata erros 404 (página não encontrada)
// só é chamado se nenhum outro middleware ou rota tiver respondido à requisição
app.use(manipulador404);

// manipuladorDeErros é um middleware que trata erros que ocorrem na aplicação
// ele deve ser o último middleware a ser adicionado, pois é chamado quando um erro é passado para o next()
app.use(manipuladorDeErros)

export default app