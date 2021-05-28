import React from 'react'
import { 
  Container,
  Typography,
  Grid,
  Button,
} from '@material-ui/core'
import useStyles from '../styles'
import { useHistory } from 'react-router-dom'
import CreateForm from './CreateForm'


const CreateCategory = () => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Container maxWidth={false} classes={{ root: classes.fullContainer }}>
      <Grid container justify="center" classes={{ root: classes.container }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h5">Añadir Categoría</Typography>
                <Button
                  variant="contained" 
                  color="primary"
                  onClick={() => {
                    history.push('/categorias')
                  }}
                >
                  Volver
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CreateForm />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CreateCategory
