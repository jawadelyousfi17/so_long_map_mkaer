import { createRoot } from 'react-dom/client'
import '@fontsource/inter';
import App from './App.jsx'
import { CssVarsProvider } from '@mui/joy';

createRoot(document.getElementById('root')).render(
  <CssVarsProvider>
    <App />
  </CssVarsProvider>,
)
