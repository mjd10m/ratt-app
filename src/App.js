import { ColorModeContext, useMode} from './theme'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {Routes, Route} from 'react-router-dom'

import Dashboard from './pages/dashboard/index'
import Topbar from './pages/global/Topbar'
import Sidebar from './pages/global/Sidebar'
//import CustIntk from './pages/global/CustIntk'

function App() {
  const [theme, colorMode] = useMode()
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar/>
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path="/" element = {<Dashboard/>} />
                {/*<Route path="/customerIntake" element = {<CustIntk/>} />*/}
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
