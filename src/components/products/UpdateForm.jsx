import React , { useContext , useEffect } from 'react'
import {
  Grid,
  Button,
  Paper,
  TextField,
  FormControl,
  Select,
  FormHelperText,
  InputLabel,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { red , lightBlue } from '@material-ui/core/colors'
import useStyles from '../styles'
import UploadPhoto from '../UploadPhoto'
import AppContext from '../../store/App/AppContext'
import * as yup from 'yup'
import { Form , FormikProvider , useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import UploadSlides from '../UploadSlides'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete'

const UpdateForm = () => {
  const classes = useStyles()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const { product , getProduct , getCategories , categories , setProduct , setError } = useContext(AppContext)
  const ReactSwal = withReactContent(Swal)

  useEffect(() => {
    getProduct(id)
    getCategories()
  }, [])

  const urlRegex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

  const productSchema = yup.object().shape({
    name: yup.string().required('Nombre requerido'),
    categoryId: yup.string().required('Categoría requerida'),
    description: yup.string().required('Descripción requerida'),
    officialInformation: yup.string().matches(urlRegex,'URL inválida').required('Información oficial requerida'),
    price: yup.number().min(0, 'Ingrese un precio válido').required('Precio requerido'),
    stock: yup.number().min(1, 'El stock debe ser 1 como mínimo').integer('El stock debe ser un entero').required('Stock requerido'),
    discount: yup.number().min(0,'El descuento debe estar en el rango 0 - 100').max(100, 'El descuento debe estar en el rango 0 - 100').integer('El descuento debe ser un entero'),
    file: yup.object().nullable(),
    slides: yup.array().of(yup.object().nullable()).nullable(),
    imagesToDelete: yup.array().of(yup.string()),
    details: yup.string().required('Detalles requeridos')
  })

  const setCategoriesOptions = () => {
    if(categories && categories.length){
      return categories.map(category => (
        <MenuItem value={category._id} key={category._id}>{category.name}</MenuItem>
      ))
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      categoryId: '',
      description: '',
      officialInformation: '',
      price: 0,
      stock: 0,
      discount: 0,
      file: null,
      slides: [],
      imagesToDelete: [],
      details: '[]',
    },
    validationSchema: productSchema,
    onSubmit: async (values , { setSubmitting }) => {
      const detailsArray = JSON.parse(values.details)
      if(!detailsArray.length){
        setError('Detalles requeridos')
        setSubmitting(false)
        return
      }
      if(values.slides.length === 0 && values.imagesToDelete.length === product.slides.length){
        const {isConfirmed} = await Swal.fire({
          title: '¿Seguro?',
          icon: 'warning',
          text: 'El producto quedará sin slides',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Continuar',
          cancelButtonColor: lightBlue[700],
          confirmButtonColor: red[500],
        })
        if(isConfirmed){
          const respond = await setProduct({...values, details: detailsArray , _id: product._id})
          if(respond){
            setFieldValue('imagesToDelete',[])
            setFieldValue('slides',[])
            enqueueSnackbar('Producto actualizado',{
              variant: 'success'
            })
          }
          setSubmitting(false)
        }
        setSubmitting(false)
      }
      else{
        const respond = await setProduct({...values, details: detailsArray , _id: product._id})
        if(respond){
          setFieldValue('imagesToDelete',[])
          setFieldValue('slides',[])
          enqueueSnackbar('Producto actualizado',{
            variant: 'success'
          })
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

  useEffect(() => {
    if(product){
      setFieldValue('name',product.name)
      setFieldValue('categoryId',product.categoryId)
      setFieldValue('description',product.description)
      setFieldValue('officialInformation',product.officialInformation)
      setFieldValue('price',product.price)
      setFieldValue('stock',product.stock)
      setFieldValue('discount',product.discount)
      setFieldValue('details',JSON.stringify(product.details))
    }
  }, [product])

  const deleteDetail = (detail) => {
    const arrayDetails = JSON.parse(values.details)
    const newDetails = arrayDetails.filter(valueDetail => {
      if(valueDetail.key === detail.key && valueDetail.value === detail.value){
        return false
      }else{
        return true
      }
    })
    setFieldValue('details',JSON.stringify(newDetails))
    ReactSwal.close()
  }

  const showDetails = () => {
    const arrayValues = JSON.parse(values.details)
    return arrayValues.map((detail,idx) => (
      <React.Fragment key={idx}>
        <Grid item xs={5}>
          <TextField
            label="Detalle"
            value={detail.key}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            label="Descripción"
            value={detail.value}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={() => deleteDetail(detail)}>
            <DeleteIcon style={{ color: red[500] }}/>
          </IconButton>
        </Grid>
      </React.Fragment>
    ))
  }

  const handleWatchDetails = () => {
    ReactSwal.fire({
      title: 'Detalles',
      html: (
        <Grid container spacing={1}>
          {showDetails()}
        </Grid>
      ),
      confirmButtonText: 'Ok'
    })
  }

  const handleAddDetails = async () => {
    const { value: formValues , isConfirmed } = await ReactSwal.fire({
      title: 'Añadir detalle',
      html: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField 
              label="Detalle"
              fullWidth
              variant="outlined"
              id="swal-input1"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="Descripción"
              fullWidth
              variant="outlined"
              id="swal-input2"
            />
          </Grid>
        </Grid>
      ),
      confirmButtonText: 'Añadir',
      preConfirm: () => {
        const key = document.getElementById('swal-input1').value
        const value = document.getElementById('swal-input2').value
        if(key && value){
          return {key , value}
        }
        return null
      }
    })
    if(isConfirmed){
      if(formValues){
        const detailsArray = JSON.parse(values.details)
        detailsArray.push(formValues)
        setFieldValue('details',JSON.stringify(detailsArray))
        ReactSwal.fire({
          icon: 'success',
          title: 'Listo!',
          text: 'Detalle añadido'
        })
      }else{
        ReactSwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ambos campos son requeridos'
        })
      }
    }
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
                  <UploadPhoto 
                    width={200}
                    height={150}
                    file={product ? product.img : null}
                    uploadedFile={values.file}
                    setUplaodedFile={value => setFieldValue('file',value)}
                    name=""
                    disabled={isSubmitting}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={2} classes={{ root: classes.paddingSlides }}>
                  <UploadSlides 
                    slides={product ? product.slides : []}
                    uploadedSlides={values.slides}
                    setUploadedSlides={value => setFieldValue('slides',value)}
                    imagesToDelete={values.imagesToDelete}
                    setImagesToDelete={value => setFieldValue('imagesToDelete',value)}
                    disabled={isSubmitting}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Nombre"
                    variant="outlined"
                    {...getFieldProps('name')}
                    value={values.name}
                    disabled={isSubmitting}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="category-label">Categoría</InputLabel>
                    <Select
                      labelId="category-label"
                      label="Categoría"
                      value={values.categoryId}
                      {...getFieldProps('categoryId')}
                      disabled={isSubmitting}
                      error={errors.categoryId && touched.categoryId}
                    >
                      <MenuItem value="">Seleccionar categoría:</MenuItem>
                      {setCategoriesOptions()}
                    </Select>
                    <FormHelperText error={errors.categoryId && touched.categoryId}>{touched.categoryId ? errors.categoryId : ''}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Información oficial"
                    variant="outlined"
                    type="url"
                    value={values.officialInformation}
                    {...getFieldProps('officialInformation')}
                    disabled={isSubmitting}
                    error={errors.officialInformation && touched.officialInformation}
                    helperText={touched.officialInformation && errors.officialInformation}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Precio (soles)"
                    variant="outlined"
                    type="number"
                    value={values.price}
                    {...getFieldProps('price')}
                    disabled={isSubmitting}
                    error={errors.price && touched.price}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Stock"
                    variant="outlined"
                    type="number"
                    value={values.stock}
                    {...getFieldProps('stock')}
                    disabled={isSubmitting}
                    error={errors.stock && touched.stock}
                    helperText={touched.stock && errors.stock}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Descuento"
                    variant="outlined"
                    type="number"
                    value={values.discount}
                    {...getFieldProps('discount')}
                    disabled={isSubmitting}
                    error={errors.discount && touched.discount}
                    helperText={touched.discount && errors.discount}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Fecha de creación"
                    variant="outlined"
                    value={product ? product.createdAt : ''}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Última modificación"
                    variant="outlined"
                    value={product ? product.updatedAt : ''}
                    disabled={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth
                    label="Descripción"
                    variant="outlined"
                    value={values.description}
                    {...getFieldProps('description')}
                    disabled={isSubmitting}
                    multiline
                    spellCheck={false}
                    rows={6}
                    error={errors.description && touched.description}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField 
                    fullWidth
                    label="Detalles (JSON)"
                    variant="outlined"
                    value={values.details}
                    {...getFieldProps('details')}
                    disabled={true}
                    spellCheck={false}
                    error={errors.details && touched.details}
                    helperText={touched.details && errors.details}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={3} >
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={() => {handleWatchDetails()}}
                      >
                        Ver
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        onClick={() => {handleAddDetails()}}
                      >
                        Añadir
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Actualizar Producto
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
