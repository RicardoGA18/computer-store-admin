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
import { Delete , Edit } from '@material-ui/icons'
import useStyles from '../components/styles'
import AppContext from '../store/App/AppContext'
import swal from 'sweetalert2'

function Clients() {
  const { clients , getClients , deleteClient } = useContext(AppContext)
  const classes = useStyles()
  const [page,setPage] = useState(0)
  const history = useHistory()

  useEffect(() => {
    getClients()
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const setPaginationLabel = ({from,to,count}) => {
    return `${from}-${to} de ${count}`
  }

  const handleDelete = async (clientId) => {
    const respond = await swal.fire({
      title: 'Seguro',
      icon: 'warning',
      text: 'Perderás la información del cliente',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: red[500],
      cancelButtonColor: lightBlue[700],
    })
    if(respond.isConfirmed){
      deleteClient(clientId)
    }
  }

  const setClients = () => {
    const secureClients = JSON.parse(JSON.stringify(clients))
    const newClients = secureClients.slice(page * 5, (page * 5) + 5)
    return newClients.map(client => (
      <TableRow key={client._id}>
        <TableCell>
          <Typography variant="overline">{client.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="overline">{client.lastName}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="overline">{client.email}</Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton className={classes.iconSpacer} component={Link} to={`/clientes/editar/${client._id}`}>
            <Edit style={{ color: lightBlue[700] }}/>
          </IconButton>
          <IconButton onClick={() => {handleDelete(client._id)}}>
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
                <Typography variant="h5">Clientes</Typography>
                <Button variant="contained" color="primary" onClick={() => {history.push('/clientes/crear')}}>Añadir Cliente</Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                      <TableCell><Typography variant="h6">Apellido</Typography></TableCell>
                      <TableCell><Typography variant="h6">Email</Typography></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {setClients()}
                  </TableBody>
                </Table>
                <TablePagination 
                  rowsPerPage={5}
                  rowsPerPageOptions={[5]}
                  page={page}
                  component={'div'}
                  count={clients.length}
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

export default Clients
