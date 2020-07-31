import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';
import FormField from '../../../components/FormField';

function CadastroCategoria(){
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  }

  const [categorias, setCategorias] =  useState([]);
  const [valores, setValores] = useState(valoresIniciais);

  function setValor(chave, valor){
    // chave: nome, descricao, cor
    setValores({
      ...valores,
      [chave]: valor,
    })
  }

  function handleChange(infosDoEvento){
    const { name , value } = infosDoEvento.target;

    setValor(
        name, 
        value
      );
  }

  return (
    <PageDefault>
      <h1>Cadastro de Categoria: {valores.nome} </h1>
      
      <form style={ {background: valores.cor} } onSubmit={ function handleSubmit(infosDoEvento){
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias, // destrinche todas as categorias e add a de baixo
          valores,
        ]);
        setValores(valoresIniciais);
      }}>

       <FormField
          label="Nome da categoria"
          type="text" 
          name="nome"
          value={valores.nome}
          onChange={handleChange}
       />

        <FormField
          label="Descrição"
          type="text" 
          name="descricao"
          value={valores.descricao}
          onChange={handleChange}
        />
        {/* <div>
          <label>
            Descrição:
            <textarea
              type="text" 
              value={valores.descricao} 
              name="descricao"
              onChange={handleChange}
            />
          </label>
        </div> */}

        <FormField
          label="Cor"
          type="color" 
          name="cor"
          value={valores.cor}
          onChange={handleChange}
        />
        {/* <div>
          <label>
            Cor:
            <input 
              type="color" 
              value={valores.cor} 
              name="cor"
              onChange={handleChange}
            />
          </label>
        </div>
         */}

        <button>Cadastrar</button>
      </form>

      <ul>
        {categorias.map((categoria, indice) => {
          return (
              <li key={`${categoria.nome}${indice}`}>
                {categoria.nome}
              </li>
            )
        })}
      </ul>
      
      <Link to="/">
          Ir para home
      </Link>
    </PageDefault>
  )
}

export default CadastroCategoria;


