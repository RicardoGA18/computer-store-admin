import React, { useContext , useEffect , useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
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
import VisibilityIcon from '@material-ui/icons/Visibility';
import useStyles from '../components/styles'
import AppContext from '../store/App/AppContext'
import swal from 'sweetalert2'
import { useSnackbar } from 'notistack'

const Sales = () => {
  const classes = useStyles()
  const history = useHistory()
  const [page,setPage] = useState(0)
  const { enqueueSnackbar } = useSnackbar()
  const { getPurchases , purchases ,  clients , getClients } = useContext(AppContext)

  useEffect(() => {
    getClients()
    getPurchases()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const setPaginationLabel = ({from,to,count}) => {
    return `${from}-${to} de ${count}`
  }

  const setPurchases = () => {
    const securePurchases = JSON.parse(JSON.stringify(purchases))
    const newPurchases = securePurchases.slice(page * 5 , (page * 5) + 5)
    return newPurchases.map(purchase => {
      const client = clients.filter(cl => cl._id === purchase.userId)
      let clientName = ''
      let clientEmail = ''
      if(client.length){ 
        clientName = client[0].name
        clientEmail = client[0].email
      }
      return (
        <TableRow key={purchase._id}>
          <TableCell>
            <Typography variant="overline">{purchase.mercadoPagoId}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{clientName}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{clientEmail}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{purchase.totalAmount}</Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton >
              <VisibilityIcon style={{ color: lightBlue[700] }}/>
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
                <Typography variant="h5">Ventas</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">ID</Typography></TableCell>
                      <TableCell><Typography variant="h6">Nombre de Usuario</Typography></TableCell>
                      <TableCell><Typography variant="h6">Email de Usuario</Typography></TableCell>
                      <TableCell><Typography variant="h6">Monto Total</Typography></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setPurchases()}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  page={page}
                  component={'div'}
                  count={purchases.length}
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

export default Sales

