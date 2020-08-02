/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [ categorias, setCategorias ] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);
  // console.log('categoryTitles', categoryTitles);

  const { handleChange, valores } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=9dFo8QgbzwA',
    categoria: 'Front End',
  });

  useEffect(() => {
    categoriasRepository
    .getAll()
    .then((categorias) => {
      setCategorias(categorias);
    });
  }, []);
  // console.log(categorias);

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        // alert('Acorda');
        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === valores.categoria;
        });

        // console.log(categoriaEscolhida);

        videosRepository.create({
          tiulo: valores.titulo,
          url: valores.url,
          categoriaId: categoriaEscolhida.id,
        })
          .then(() => {
            console.log('Cadastrou com sucesso');
            history.push('/');
          });
      }}
      >
        <FormField
          label="Título do Vídeo"
          type="text"
          name="titulo"
          value={valores.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL do Vídeo"
          type="url"
          name="titulo"
          value={valores.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={valores.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <Link to="/cadastro/categoria">
        Cadastro de categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;
