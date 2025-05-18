import { RequisicaoIncorreta } from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
    try {
        // Desestruturação do objeto req.query
        // ordenacao = "_id:-1" é o valor padrão
        let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

        // Desestruturação do objeto ordenacao, separando o campo de ordenação e a ordem
        // Exemplo: ordenacao = "titulo:1" ou "titulo:-1"
        let [campoOrdenacao, ordem] = ordenacao.split(":");

        limite = parseInt(limite);
        pagina = parseInt(pagina);
        ordem = parseInt(ordem);

        const resultado = req.resultado;

        // Se o limite for maior que 0 e a página for maior que 0
        // ou seja, se o usuário não informar nada, o valor padrão será 5
        if (limite > 0 && pagina > 0) {
            const resultadoPaginado = await resultado.find()
                .sort({ [campoOrdenacao]: ordem }) // ordena os livros pelo campo informado, 1 para ordem crescente e -1 para ordem decrescente
                // skip é usado para pular os primeiros n documentos
                .skip((pagina - 1) * limite)
                .limit(limite)
                // populate é usado para popular o campo autor com os dados do autor
                // ou seja, ao invés de retornar apenas o id do autor, retorna o objeto autor completo
                // .populate("autor")
                // exec é usado para executar a query e retornar uma promise, ou seja, o resultado da query
                .exec();
            res.status(200).json(resultadoPaginado);
        } else {
            next(new RequisicaoIncorreta("Limite e página devem ser maiores que 0"));
        }
    } catch (erro) {
        next(erro);
    }
}

export default paginar;