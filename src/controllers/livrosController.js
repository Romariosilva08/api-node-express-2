import NaoEncontrado from "../erros/NaoEncontrado.js";
import { livros } from "../models/index.js";
import autores from "../models/Autor.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro)
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro)
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros
          .find(busca)
          .populate("autor")

        req.resultado = livrosResultado;
        next();
      } else {
        // Se o autor não for encontrado, retorna um array vazio
        // para não retornar erro 500
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro)
    }
  };
}

async function processaBusca(parametros) {
  // Desestruturação do objeto parametros
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};
  if (editora) busca.editora = editora;
  // $regex é uma expressão regular
  // $options: "i" é para tornar a busca case insensitive
  // ou seja, não diferencia maiúsculas de minúsculas
  // Exemplo: "livro" e "LIVRO" são considerados iguais
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  // se minPaginas ou maxPaginas foram informados
  // se não foram informados, o objeto busca.numeroPaginas não é criado
  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // $gte: greater than or equal
  // $lte: less than or equal
  // dinamicamente sem reescrever o objeto
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    // se o autor não for encontrado, o valor de autor será null
    if (autor !== null) {
      // se o autor for encontrado, o valor de autor será um objeto
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  return busca;
}

export default LivroController