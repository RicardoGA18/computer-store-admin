import React, { useContext , useEffect , useState } from 'react'
import { Link , useHistory } from 'react-router-dom'
import { 
  Container,
  Typography,
  Grid,
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
import useStyles from '../components/styles'
import Chart from "react-apexcharts"
import AppContext from '../store/App/AppContext'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { lightBlue  } from '@material-ui/core/colors'

function General() {
  const { getPurchases , purchases , clients , getClients } = useContext(AppContext)
  const classes = useStyles()
  const [page,setPage] = useState(0)
  const [series,setSeries] = useState([])
  const [options,setOptions] = useState({
    labels: ['Ventas para llegar a la meta','Ventas'],
    fill:{
      colors: ['gray','#25E6A4']
    },
    legend:{
      show: true,
      position: 'bottom',
    },
  })
  useEffect(()=>{
    getClients()
    getPurchases()
  },[])

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
            <IconButton component={Link} to={`/ventas/${purchase._id}`}>
              <VisibilityIcon style={{ color: lightBlue[700] }}/>
            </IconButton>
          </TableCell>
        </TableRow>
      )
    })
  }

  useEffect(() => {
    if(purchases.length){
      setSeries([ 50 - purchases.length , purchases.length])
    }
  },[purchases])

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
                  <Paper elevation="2" classes={{ root: classes.paddingContainer }}>
                    <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>Meta de Ventas: 50</Typography>
                    {
                      purchases.length
                        ?
                          <Chart 
                            type="donut"
                            series={series}
                            options={options}
                          />
                        : <></>
                    }
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper elevation={2} classes={{ root: classes.paddingContainer }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h5">Ventas:</Typography>
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
