import { ColorModeContext, useMode} from './theme'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {Routes, Route, useLocation} from 'react-router-dom'

import Dashboard from './pages/dashboard/index'
import Topbar from './pages/global/Topbar'
import Sidebar from './pages/global/Sidebar'
import CustIntk from './pages/custIntake'
import SignIn from './pages/login'

function App() {
  const [theme, colorMode] = useMode()
  const location = useLocation(); // Get current route

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
          {location.pathname !== '/login' && <Sidebar />}
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path="/" element = {<Dashboard/>} />
                <Route path="/customerIntake" element = {<CustIntk/>} />
                <Route path="/login" element = {<SignIn/>} />
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
