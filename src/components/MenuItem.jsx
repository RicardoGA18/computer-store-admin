import React , { useEffect , useState} from 'react'
import clsx from 'clsx'
import { Link , useLocation } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import useStyles from './styles'

function MenuItem({ label , Icon , path , onClick}) {
  const classes = useStyles()
  const [active, setActive] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if(path === '/sign-out'){
      setActive(true)
      return
    }
    if(location.pathname !== '/' && path === '/'){
      setActive(false)
      return
    }
    setActive(location.pathname.includes(path))
  },[location])

  return (
    <ListItem onClick={onClick} component={path === '/sign-out' ? 'li' : Link} to={path === '/sign-out' ? null : path} button className={clsx(classes.menuItem, active && classes.menuItemActive)}>
      <ListItemIcon>
        <Icon style={{ fontSize: 25 , color: active ? '#1DDECE' : '#454545' }} className={classes.menuItemIcon} />
      </ListItemIcon>
      <ListItemText
        primary={label}
        classes={{ primary: active ? classes.isPrimary : classes.isWhite }}
        primaryTypographyProps={{ variant: "body2" }}
      />
    </ListItem>
  )
}

export default MenuItem
