import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appRoot: {
    display: 'flex',
  },
  appBar: {
    background: "#0F0F10 !important",
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    }
  },
  appBarSpacer: {
    [theme.breakpoints.down('xs')]: {
      ...theme.mixins.toolbar
    }
  },
  navigationLogo: {
    width: '60%',
    cursor: 'pointer',
  },
  navigationLogoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(2)
  },
  navigationDrawer: {
    width: 240,
    border: "none",
    background: '#0F0F10',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    position: 'relative',
    height: '100vh',
    
  },
  menuItemIcon: {
    width: '100%'
  },
  menuItem:{
    width: '80%',
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  menuItemActive: {
    backgroundColor: '#23242A'
  },
  navigationList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  navigationListSpacer: {
    paddingBottom: 70,
  },
  navigationSpacer: {
    flex: 1,
  },
  navigationToolBar:{
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
    ...theme.mixins.toolbar,
  },
  navigationDrawerCollapse:{
    width: theme.spacing(9),
  },
  navigationToolBarCollapse: {
    justifyContent: 'center',
    paddingRight: 0,
  },
  isWhite: {
    color: '#FFFFFF'
  },
  isPrimary: {
    color: '#1DDECE'
  },
  ligthButton: {
    background: '#23242A'
  },
  fullContainer: {
    width: '100%',
  },
  container: {
    paddingTop: 30
  },
  iconSpacer: {
    marginRight: 10,
  }
}))

export default useStyles