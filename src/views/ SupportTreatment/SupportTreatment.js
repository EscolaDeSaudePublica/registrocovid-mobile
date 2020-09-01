import React, { useCallback, useState, useEffect } from 'react';
import useStyles from './styles';
import { usePatient } from 'context/PatientContext';
import {
  CustonBreadcrumbs,
  // FormikErroObserver
} from 'components';

import {
  CircularProgress,
  FormControl,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import { Formik, Form } from 'formik';
import schema from './schema';
import PatientInfo from 'components/PatientInfo';
import { useToast } from 'hooks/toast';
// import api from 'services/api';
import { useHistory } from 'react-router-dom';
import apiFake from 'services/apiFake';
import SupportTreatmentItem from './components/SupportTreatmentItem';
import SupportTreatmentForm from './components/SupportTreatmentForm';

// Valores iniciais
const initialValues = {
  data_inicio: '',
  data_termino: '',
  motivo_hemodialise: '',
  frequencia_hemodialise: '',
};

function SupportTreatment() {
  const classes = useStyles();

  const { addToast } = useToast();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const [isPrevValue, setIsPrevValue] = useState(false);

  const [tratamento, setTratamento] = useState({});

  const {
    patient: { id },
  } = usePatient();

  const handleSupportTreatments = useCallback(async id => {
    try {
      console.log(id);
      setLoading(true);
      const response = await apiFake.get('/tratamento_suporte_2');
      // verifica se o objeto está vazio
      if (Object.entries(response.data).length === 0) {
        setIsPrevValue(false);
      } else {
        setIsPrevValue(true);
      }
      console.log(response.data);
      setTratamento(response.data);
    } catch (error) {
      addToast({
        type: 'error',
        message: 'Erro ao tentar carregar informações, tente novamente',
      });
      history.goBack();
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async values => {
      try {

        console.log(values);

        // TODO: colocar quando o back estiver pronto
        // await api.post(
        //   `/pacientes/${id}/tratamentos-suportes/`,
        //   newSupportTreatments,
        // );

        addToast({
          type: 'success',
          message: 'Dados salvos com sucesso.',
        });

        // TODO: colocar depois quando tiver a api
        // window.location.reload();
      } catch (error) {
        addToast({
          type: 'error',
          message: 'Algo de errado aconteceu',
        });
      }
    },
    [addToast, id],
  );

  useEffect(() => {
    handleSupportTreatments(id);
  }, [id, handleSupportTreatments]);

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Tratamento de Suporte',
              route: '/categorias/tratamento-suporte/',
            },
          ]}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h2">Tratamento de suporte</Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
                      <PatientInfo />
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting || isPrevValue}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  {isPrevValue ? (
                    <SupportTreatmentItem tratamento={tratamento} />
                  ) : (
                    <SupportTreatmentForm />
                  )}

                  {/* TODO: colocar depois do primeiro MVP */}
                  {/* <FormikErroObserver /> */}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupportTreatment;
