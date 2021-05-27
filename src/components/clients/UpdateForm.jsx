import React , { useContext , useEffect } from 'react'
import {
  Grid,
  Button,
  Paper,
  TextField
} from '@material-ui/core'
import useStyles from '../styles'
import UploadPhoto from '../UploadPhoto'
import AppContext from '../../store/App/AppContext'
import * as yup from 'yup'
import { Form , FormikProvider , useFormik } from 'formik'
import { useParams } from 'react-router-dom'

const UpdateForm = () => {
  const classes = useStyles()
  const { client , getClient , setClient } = useContext(AppContext)
  const { id } = useParams()

  useEffect(() => {
    getClient(id)
  }, [])

  const onlyLettersRegex = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]+$/

  const clientSchema = yup.object().shape({
    name: yup.string().matches(onlyLettersRegex,'Nombre inválido').required('Nombre requerido'),
    lastName: yup.string().matches(onlyLettersRegex, 'Apellido inválido').required('Apellido requerido'),
    email: yup.string().email('Email inválido').required('Email requerido'),
    role: yup.string().required('Rol requerido'),
    file: yup.object().nullable()
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      role: '',
      file: null
    },
    validationSchema: clientSchema,
    onSubmit: async (values , { setSubmitting }) => {
      await setClient({ ...values , _id: client._id })
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
    setFieldValue,
  } = formik

  useEffect(() => {
    if(client){
      setFieldValue('name', client.name)
      setFieldValue('lastName', client.lastName)
      setFieldValue('email',client.email)
      setFieldValue('role', client.role)
    }
  }, [client])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <UploadPhoto 
                width={150}
                height={150}
                file={client ? client.avatar : null}
                uploadedFile={values.file}
                setUplaodedFile={value => setFieldValue('file',value)}
                name={client ? `${client.name[0]}${client.lastName[0]}` : ''}
                disabled={isSubmitting}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                    value={values.name}
                    {...getFieldProps('name')}
                    disabled={isSubmitting}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Apellido"
                    variant="outlined"
                    value={values.lastName}
                    {...getFieldProps('lastName')}
                    disabled={isSubmitting}
                    error={errors.lastName && touched.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={values.email}
                    type="email"
                    {...getFieldProps('email')}
                    disabled={isSubmitting}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Rol"
                    variant="outlined"
                    value={values.role}
                    {...getFieldProps('role')}
                    disabled={true}
                    error={errors.role && touched.role}
                    helperText={touched.role && errors.role}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Actualizar cliente
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  )
}

export default UpdateForm
