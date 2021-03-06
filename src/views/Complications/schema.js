import { object, string, boolean, array } from 'yup';

const schema = object().shape({
  newsComplicacoes: array().of(
    object().shape({
      tipo_complicacao_id: string().required('Campo obrigatório'),
      data: string().required('Campo obrigatório'),
      data_termino: string().when('tipo_complicacao_id', {
        is: '1',
        then: string().required('Campo obrigatório'),
      }),
      descricao: string().when('tipo_complicacao_id', {
        is: '13',
        then: string().required('Campo obrigatório'),
      }),
      menos_24h_uti: boolean().when('tipo_complicacao_id', {
        is: '1',
        then: boolean().required('Campo obrigatório'),
      }),
    }),
  ),
});

export default schema;
