import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categorias, setCategorias] = useState([]);
  const [valores, setValores] = useState(valoresIniciais);

  function setValor(chave, valor) {
    // chave: nome, descricao, cor
    setValores({
      ...valores,
      [chave]: valor,
    });
  }

  function handleChange(infosDoEvento) {
    const { name, value } = infosDoEvento.target;

    setValor(
      name,
      value,
    );
  }

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/categorias'
    : 'https://lariflix-nine.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });

    // setTimeout(() => {
    //   setCategorias([
    //     ...categorias, // destrinche todas as categorias e add a de baixo
    //     {
    //       id: 1,
    //       nome: 'Front End',
    //       descricao: 'Uma categoria sacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //     {
    //       id: 2,
    //       nome: 'Back End',
    //       descricao: 'Outra categoria sacanudassa',
    //       cor: '#cbd1ff',
    //     },
    //   ]);
    // }, 4 * 1000);
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {valores.nome}
      </h1>

      <form
        // style={{ background: valores.cor }}
        onSubmit={function handleSubmit(infosDoEvento) {
          infosDoEvento.preventDefault();
          setCategorias([
            ...categorias, // destrinche todas as categorias e add a de baixo
            valores,
          ]);
          setValores(valoresIniciais);
        }}
      >

        <FormField
          label="Nome da categoria"
          type="text"
          name="nome"
          value={valores.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={valores.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={valores.cor}
          onChange={handleChange}
        />
        <Button>
          Cadastrar
        </Button>
      </form>

      {categorias.length === 0 && (
      <div>
        Loading...
      </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => (
          <li key={`${categoria.nome}${indice}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
