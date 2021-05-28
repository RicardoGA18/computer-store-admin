import React from 'react'
import DashBoardView from './views/DashBoardView'
import { CssBaseline } from '@material-ui/core'
import AppState from './store/App/AppState'
import Observer from './views/Observer'
import { SnackbarProvider } from 'notistack'

function App() {
  return (
    <>
      <AppState>
        <SnackbarProvider hideIconVariant={false} autoHideDuration={2500} anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
          <Observer>
            <CssBaseline />
            <DashBoardView />
          </Observer>
        </SnackbarProvider>
      </AppState>
    </>
  )
}

export default App

