import React , { useContext } from 'react'
import {
  Grid,
  Button,
  Paper,
  TextField
} from '@material-ui/core'
import { lightBlue , red } from '@material-ui/core/colors'
import useStyles from '../styles'
import UploadPhoto from '../UploadPhoto'
import AppContext from '../../store/App/AppContext'
import * as yup from 'yup'
import { Form , FormikProvider , useFormik } from 'formik'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import swal from 'sweetalert2'

const CreateForm = () => {
  const classes = useStyles()
  const { createCategory } = useContext(AppContext)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  const categorySchema = yup.object().shape({
    name: yup.string().required('Nombre requerido'),
    file: yup.object().nullable()
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      file: null
    },
    validationSchema: categorySchema,
    onSubmit: async (values , { setSubmitting }) => {
      if(values.file){
        const respond = await createCategory(values)
        setSubmitting(false)
        if(respond){
          enqueueSnackbar('Categoría añadida',{variant: 'success'})
          history.push('/categorias')
        }
      }else{
        const response = await swal.fire({
          title: '¿Seguro?',
          icon: 'warning',
          text: 'Crearás una categoría sin imagen',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Sí, continuar',
          confirmButtonColor: lightBlue[800],
          cancelButtonColor: red[500],
        })
        if(response.isConfirmed){
          const respond = await createCategory(values)
          setSubmitting(false)
          if(respond){
            enqueueSnackbar('Categoría añadida',{variant: 'success'})
            history.push('/categorias')
          }
        }
        setSubmitting(false)
      }
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <UploadPhoto 
                width={150}
                height={150}
                file={null}
                uploadedFile={values.file}
                setUplaodedFile={value => setFieldValue('file',value)}
                name={''}
                disabled={isSubmitting}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Añadir Categoría
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

export default CreateForm
