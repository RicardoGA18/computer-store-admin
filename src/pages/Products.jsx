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
import { useHistory , Link } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import swal from 'sweetalert2'

function Products() {
  const { deleteProduct , products , getProducts , getCategories , categories } = useContext(AppContext)
  const classes = useStyles()
  const [page,setPage] = useState(0)
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getCategories()
    getProducts()
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const setPaginationLabel = ({from,to,count}) => {
    return `${from}-${to} de ${count}`
  }

  const handleDelete = async (productId) => {
    const respond = await swal.fire({
      title: '¿Seguro?',
      icon: 'warning',
      text: 'Perderás la información del producto',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: red[500],
      cancelButtonColor: lightBlue[700],
    })
    if(respond.isConfirmed){
      await deleteProduct(productId)
      enqueueSnackbar('Producto eliminado', {
        variant: 'success'
      })
    }
  }

  const setProducts = () => {
    const secureProducts = JSON.parse(JSON.stringify(products))
    const newProducts = secureProducts.slice(page * 5 , (page * 5) + 5 )
    return newProducts.map(product => {
      const category = categories.filter(cat => cat._id === product.categoryId)
      let categoryName = ''
      if(category.length){
        categoryName = category[0].name
      }
      return (
        <TableRow key={product._id}>
          <TableCell>
            <Typography variant="overline">{product.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{categoryName}</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="overline">{product.stock}</Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton className={classes.iconSpacer} component={Link} to={`/productos/editar/${product._id}`}>
              <Edit style={{ color: lightBlue[700] }}/>
            </IconButton>
            <IconButton onClick={() => {handleDelete(product._id)}}>
              <Delete style={{color: red[700]}}/>
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  }

  return (
    <Container maxWidth={false} classes={{ root: classes.fullContainer }}>
      <Grid container justify="center" classes={{ root: classes.container }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h5">Productos</Typography>
                <Button variant="contained" color="primary" onClick={() => {history.push('/productos/crear')}}>Añadir Producto</Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                      <TableCell><Typography variant="h6">Categoría</Typography></TableCell>
                      <TableCell align="center"><Typography variant="h6">Stock</Typography></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setProducts()}
                  </TableBody>
                </Table>
                <TablePagination 
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  page={page}
                  component={'div'}
                  count={products.length}
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

export default Products
