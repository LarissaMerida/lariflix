import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    cor: '',
    link_extra: {
      text: '',
      url: ''
    }
  };

  const history = useHistory();

  const { valores, handleChange, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // inicio as categorias com dados do banco
    categoriasRepository
      .getAll()
      .then((categorias) => {
        setCategorias(categorias);
      }, []);

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
        onSubmit={
          function handleSubmit(infosDoEvento) {
            infosDoEvento.preventDefault();

            categoriasRepository.create({
              titulo: valores.titulo,
              // descricao: valores.descricao,
              cor: valores.cor,
              link_extra: {
                text: valores.link_extra.text,
                url: valores.link_extra.url,
              }
            })
              .then(() => {
                console.log('Cadastrou com sucesso');
                history.push('/');
              });
          }
        }
      >

        <FormField
          label="Título da categoria"
          type="text"
          name="titulo"
          value={valores.titulo}
          onChange={handleChange}
        />

        {/* <FormField
          label="Descrição"
          type="textarea"
          name="text"
          value={valores.link_extra.text}
          onChange={handleChange}
        />

        <FormField
          label="URL"
          type="text"
          name="url"
          value={valores.link_extra.url}
          onChange={handleChange}
        /> */}

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
        {categorias.map((categoria) => (
          <li key={`${categoria.id}${categoria.titulo}`}>
            {categoria.titulo}

            <form
              onSubmit={
                  function handleSubmit(infosDoEvento) {
                    infosDoEvento.preventDefault();

                    categoriasRepository.deleta(
                      categoria.id,
                    )
                      .then(() => {
                        console.log('Deletou com sucesso');
                        history.push('/');
                      });
                  }
                }
            >
              <Button>
                Deletar
              </Button>
            </form>
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
