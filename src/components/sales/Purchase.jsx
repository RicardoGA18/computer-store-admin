import React, {useContext , useEffect , useState} from 'react'
import { 
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
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
import useStyles from '../styles'
import { useParams , useHistory } from 'react-router-dom'
import AppContext from '../../store/App/AppContext'

const Purchase = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const [page,setPage] = useState(0)
  const { purchase , getPurchase , getClient , client } = useContext(AppContext)

  useEffect(() => {
    getPurchase(id)
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const setPaginationLabel = ({from,to,count}) => {
    return `${from}-${to} de ${count}`
  }

  const setProducts = () => {
    if(purchase){
      const secureProducts = JSON.parse(JSON.stringify(purchase.products))
      const newProducts = secureProducts.slice(page * 5, (page * 5) + 5)
      return newProducts.map(prod => (
        <TableRow key={prod._id}>
          <TableCell>
            <Avatar variant="rounded" alt={prod.name} src={prod.img} />
          </TableCell>
          <TableCell>
            <Typography variant="overline">{prod.name}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{prod.price}</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="overline">{prod.amount}</Typography>
          </TableCell>
        </TableRow>
      ))
    }
  }

  useEffect(() => {
    if(purchase){
      getClient(purchase.userId)
    }
  }, [purchase])

  return (
    <Container maxWidth={false} classes={{ root: classes.fullContainer }}>
      <Grid container justify="center" classes={{ root: classes.container }}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="h5">Compra: {id}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    history.push('/ventas')
                  }}
                >
                  Volver
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">Usuario:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}> 
                      <Grid container direction='row' alignItems="center">
                        {
                          client 
                            ? client.avatar 
                              ? (<Avatar variant="rounded" className={classes.avatar} alt={client.name} src={client.avatar}/>)
                              : (<Avatar variant="rounded" className={classes.avatar} >{client.name[0].toUpperCase()}</Avatar>)
                            : <></>
                        }
                        <Typography variant="subtitle1" component="p" classes={{ root: classes.noBold}}>
                          {client
                            ? `${client.name} ${client.lastName} (${client.email})`
                            : ''
                          }
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Detalles de compra:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography component="p" variant="subtitle1" classes={{ root: classes.noBold}}>
                        {
                          purchase
                            ? `ID de MercadoPago: ${purchase.mercadoPagoId}`
                            : ''
                        }
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography component="p" variant="subtitle1" classes={{ root: classes.noBold}}>
                        {
                          purchase
                            ? `Monto total: S/. ${purchase.totalAmount}`
                            : ''
                        }
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Productos:</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
                          <TableCell><Typography variant="h6">P.Unitario</Typography></TableCell>
                          <TableCell><Typography variant="h6">Cantidad</Typography></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {setProducts()}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Purchase
