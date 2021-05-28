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
import { useSnackbar } from 'notistack'

const UpdateForm = () => {
  const classes = useStyles()
  const { category , getCategory , setCategory } = useContext(AppContext)
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getCategory(id)
  }, [])

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
      await setCategory({...values , _id: category._id})
      setSubmitting(false)
      enqueueSnackbar('Categoría actualizada',{
        variant: 'success'
      })
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
    if(category){
      setFieldValue('name', category.name)
    }
  }, [category])

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <UploadPhoto
                width={150}
                height={150}
                file={category ? category.img : null}
                uploadedFile={values.file}
                setUplaodedFile={value => setFieldValue('file',value)}
                name=""
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
                    label="Fecha de creación"
                    variant="outlined"
                    value={category ? category.createdAt : ''}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Última modificación"
                    variant="outlined"
                    value={category ? category.updatedAt : ''}
                    disabled={true}
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
                      Actualizar categoría
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
