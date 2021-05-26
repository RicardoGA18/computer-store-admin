import React from 'react'
import DashBoardView from './views/DashBoardView'
import { CssBaseline } from '@material-ui/core'
import AppState from './store/App/AppState'
import Observer from './views/Observer'

function App() {
  return (
    <>
      <AppState>
        <Observer>
          <CssBaseline />
          <DashBoardView />
        </Observer>
      </AppState>
    </>
  )
}

export default App

