import React from 'react'
import { 
  Container,
  Typography,
  Grid,
  Paper,
} from '@material-ui/core'
import useStyles from '../components/styles'
import { Form , FormikProvider , useFormik } from 'formik'
import * as yup from 'yup'

function General() {
  const classes = useStyles()

  const slidesSchema = yup.object().shape({
    slides: yup.array(),
    imagesToDelete: yup.array()
  })

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      slides: [],
      imagesToDelete: []
    },
    validationSchema: slidesSchema,
    onSubmit: async (values , { setSubmitting }) => {

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
    <Container maxWidth={false} classes={{ root: classes.fullContainer }}>
      <Grid container justify="center" classes={{ root: classes.container }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h5">General</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                      <Paper elevation="2" classes={{ root: classes.paddingContainer }}>

                      </Paper>
                    </Form>
                  </FormikProvider>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
                    
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default General
