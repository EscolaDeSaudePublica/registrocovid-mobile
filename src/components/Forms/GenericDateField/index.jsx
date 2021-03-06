import { FormGroup, FormLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const useStyles = makeStyles(theme => ({
  formLabel: {
    paddingBottom: theme.spacing(1),
  },
}));

function GenericDateField(props) {
  const { label, title, name, ...rest } = props;

  const classes = useStyles();

  return (
    <FormGroup>
      {title && (
        <FormLabel className={classes.formLabel}>
          <Typography variant="h4">{title}</Typography>
        </FormLabel>
      )}
      <Field
        className={classes.field}
        component={TextField}
        InputLabelProps={{
          shrink: true,
        }}
        label={label}
        name={name}
        type="date"
        variant="outlined"
        {...rest}
      />
    </FormGroup>
  );
}

export default GenericDateField;
