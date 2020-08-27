import React, { useState, useEffect, useCallback } from 'react';
import { usePatient } from 'context/PatientContext';
import useStyles from './styles';
import { CustonBreadcrumbs } from 'components';
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
import SelectComplementaryTestType from './components/SelectComplementaryTestType';
import apiFake from 'services/apiFake';
import TestComplementaryList from './components/TestComplementaryList';
// import TestComplementaryForm from './components/TestComplementaryForm';

function ComplementaryTests() {
  const { patient } = usePatient();

  const { id } = patient;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [examesComplementares, setExamesComplementares] = useState([]);

  const handleComplementaryTests = useCallback(async id => {
    try {
      setLoading(true);
      console.log('id', id);

      // carregando os exames complementares do paciente já cadastrados
      const response = await apiFake.get('/exames-complementares');
      setExamesComplementares(exames => [...exames, ...response.data]);
    } catch (err) {
      // TODO: tratar os erros do carregamento aqui.
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleComplementaryTests(id);
  }, [handleComplementaryTests, id]);

  // TODO: nada ainda
  const handleSubmit = values => {
    console.log('handleSubmit', values);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <CustonBreadcrumbs
          links={[
            { label: 'Meus pacientes', route: '/meus-pacientes' },
            { label: 'Categorias', route: '/categorias' },
            {
              label: 'Exames laboratoriais complementares',
              route: '/categorias/exames-complementares/',
            },
          ]}
        />
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={{
                newComplementaryTests: [],
                tipoNewTesteSelected: '',
              }}
              onSubmit={handleSubmit}
              validateOnMount
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form component={FormControl}>
                  <div className={classes.titleWrapper}>
                    <Typography variant="h2">
                      Exames laboratoriais complementares
                    </Typography>
                    <Grid
                      className={classes.actionSection}
                      item
                    >
                      <PatientInfo />
                      <Button
                        className={classes.buttonSave}
                        color="secondary"
                        disabled={isSubmitting}
                        type="submit"
                        variant="contained"
                      >
                        Salvar
                      </Button>
                    </Grid>
                  </div>

                  <SelectComplementaryTestType />

                  <TestComplementaryList testes={examesComplementares} />

                  {/* <TestComplementaryForm /> */}
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  );
}

export default ComplementaryTests;
