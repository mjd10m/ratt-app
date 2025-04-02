import { ColorModeContext, useMode} from './theme'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {Routes, Route, useLocation} from 'react-router-dom'
import {UserProvider} from './context/UserContext'

import Dashboard from './pages/dashboard/index'
import Topbar from './pages/global/Topbar'
import Sidebar from './pages/global/Sidebar'
import CustIntk from './pages/custIntake'
import SignIn from './pages/login'
import SignUp from './pages/signup'
import Admin from './pages/admin'
import ProtectedRoute from './components/protectedRoute'

function App() {
  const [theme, colorMode] = useMode()
  const location = useLocation(); // Get current route

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
          <UserProvider>
          {location.pathname !== '/login' && location.pathname !== '/signup' && <Sidebar />}
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path="/login" element = {<SignIn/>} />
                <Route path="/signup" element = {<SignUp/>} />
                <Route allowedRoles={['admin']} element={<ProtectedRoute/>}>
                  <Route path="/" element = {<Dashboard/>} />
                  <Route path="/customerIntake" element = {<CustIntk/>} />
                  <Route path="/admin" element = {<Admin/>} />
                </Route>
              </Routes>
            </main>
          </UserProvider>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
