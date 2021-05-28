import React, { useContext , useEffect , useState } from 'react'
import { 
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton,
  TablePagination,
} from '@material-ui/core'
import { lightBlue, red  } from '@material-ui/core/colors'
import { Delete , Edit } from '@material-ui/icons'
import useStyles from '../components/styles'
import AppContext from '../store/App/AppContext'
import { Link , useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useSnackbar } from 'notistack'

function Categories() {
  const { categories , getCategories , deleteCategory } = useContext(AppContext)
  const classes = useStyles()
  const [page,setPage] = useState(0)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getCategories()
  },[])
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const setPaginationLabel = ({from,to,count}) => {
    return `${from}-${to} de ${count}`
  }

  const handleDelete = async (categoryId) => {
    const respond = await Swal.fire({
      title: '¿Seguro?',
      icon: 'warning',
      text: 'Se eliminará la categoría y todos sus productos',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: red[500],
      cancelButtonColor: lightBlue[700],
    })
    if(respond.isConfirmed){
      await deleteCategory(categoryId)
      enqueueSnackbar('Categoría eliminada', {
        variant: 'success'
      })
    }
  }

  const setCategories = () => {
    const secureCategories = JSON.parse(JSON.stringify(categories))
    const newCategories = secureCategories.slice(page * 5, (page * 5) + 5)
    return newCategories.map(category => (
      <TableRow key={category._id}>
        <TableCell>
          <Typography variant="overline">{category.name}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton className={classes.iconSpacer} component={Link} to={`/categorias/editar/${category._id}`}>
            <Edit style={{ color: lightBlue[700] }}/>
          </IconButton>
          <IconButton onClick={() => {handleDelete(category._id)}}>
            <Delete style={{color: red[700]}}/>
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }

  return (
    <Container maxWidth={false} classes={{ root: classes.fullContainer }}>
      <Grid container justify="center" classes={{ root: classes.container }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h5">Categorías</Typography>
                <Button variant="contained" color="primary" onClick={() => {history.push('/categorias/crear')}}>Añadir Categoría</Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setCategories()}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  page={page}
                  component="div"
                  count={categories.length}
                  onChangePage={handleChangePage}
                  labelDisplayedRows={setPaginationLabel}
                />
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Categories
