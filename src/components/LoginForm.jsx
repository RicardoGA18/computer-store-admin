import React , { useContext } from 'react'
import { Form , FormikProvider , useFormik } from 'formik'
import * as yup from 'yup'
import { Grid , TextField , Button } from '@material-ui/core'
import AppContext from '../store/App/AppContext'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const { signIn } = useContext(AppContext)
  const history = useHistory()

  const loginUserSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email requerido'),
    password: yup.string().min(6,'La contraseña debe tener por lo menos 6 caracteres').required('Contraseña requerida')
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginUserSchema,
    onSubmit: async (values , { setSubmitting }) => {
      const respond = await signIn(values)
      if(respond){
        history.push('/')
      }
      setSubmitting(false)
    }
  })

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo electrónico"
              variant="outlined"
              type="email"
              value={values.email}
              {...getFieldProps('email')}
              disabled={isSubmitting}
              error={errors.email && touched.email}
              helperText={touched.email && errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contraseña"
              variant="outlined"
              type="password"
              value={values.password}
              {...getFieldProps('password')}
              disabled={isSubmitting}
              error={errors.password && touched.password}
              helperText={touched.password && errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}

export default LoginForm
