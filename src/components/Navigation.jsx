import React, {useState , useEffect} from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import MenuItem from './MenuItem'
import clsx from 'clsx'
import { AppBar , Toolbar , useTheme , useMediaQuery, Typography } from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard';
import StoreIcon from '@material-ui/icons/Store';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CategoryIcon from '@material-ui/icons/Category';
import ComputerIcon from '@material-ui/icons/Computer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';

import IconButton from '@material-ui/core/IconButton'
import { ChevronLeft , Menu } from '@material-ui/icons'
import logo from '../assets/logo.png'
import logoFull from '../assets/logoFull.png'
import useStyles from './styles'

function Navigation() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const classes = useStyles()
  const [open,setOpen] = useState(true)

  const toggleNavigation = () => {
    setOpen(!open)
  }

  const closeNavigation = () => {
    if(matches){
      setOpen(false)
    }
  }

  return (
    <div>
      <AppBar classes={{ root: classes.appBar }}>
        <Toolbar>
          <IconButton onClick={toggleNavigation} edge="start" color="primary" aria-label="Menu">
            <Menu />
          </IconButton>
          <Typography variant="body1">Admin - Computer Store</Typography>
        </Toolbar>
      </AppBar>
      <Drawer classes={{ paper: clsx(classes.navigationDrawer, !open && classes.navigationDrawerCollapse) }} variant={matches ? 'temporary' : 'permanent'} open={open}>
        <div className={clsx(classes.navigationToolBar, !open && classes.navigationToolBarCollapse)}>
          <IconButton onClick={toggleNavigation} color="primary" classes={{ root: classes.ligthButton }}>
            { open ? <ChevronLeft /> : <Menu /> }
          </IconButton>
        </div>
        <div className={classes.navigationLogoContainer}>
          <img className={classes.navigationLogo} src={open ? logoFull : logo} alt="Logo Computer Store"/>
        </div>
        <List className={clsx(classes.navigationList, matches && classes.navigationListSpacer)}>
          <MenuItem
            label="General"
            Icon={DashboardIcon}
            path="/"
            onClick={closeNavigation}
          />
          <MenuItem
            label="Tienda"
            Icon={StoreIcon}
            path="/tienda"
            onClick={closeNavigation}
          />
          <MenuItem
            label="Cuenta"
            Icon={AccountBoxIcon}
            path="/cuenta"
            onClick={closeNavigation}
          />
          <MenuItem
            label="Clientes"
            Icon={GroupIcon}
            path="/clientes"
            onClick={closeNavigation}
          />
          <MenuItem
            label="Productos"
            Icon={ComputerIcon}
            path="/productos"
            onClick={closeNavigation}
          />
          <MenuItem
            label="Categorías"
            Icon={CategoryIcon}
            path="/categorias"
            onClick={closeNavigation}
          />
          <div className={classes.navigationSpacer}></div>
          <MenuItem
            label="Cerrar sesión"
            Icon={ExitToAppIcon}
            path="/sign-out"
            onClick={closeNavigation}
          />
        </List>
      </Drawer>
    </div>
  )
}

export default Navigation
