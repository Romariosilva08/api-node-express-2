import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "Um ou mais dados fornecidos estão incorretos." });
    } else if (erro instanceof mongoose.Error.ValidationError) {
        const mensagensErro = Object.values(erro.erros)
            .map(erro => erro.message)
            .join(", ");
        res.status(400).send({ message: `Os seguintes erros foram encontrados: ${mensagensErro}`});
    } else {
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;