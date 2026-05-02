import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from '@mui/material';
import { AppProvider, useAppContext } from './context/AppContext';
import { AllNotifications } from './pages/AllNotifications';
import { PriorityInbox } from './pages/PriorityInbox';

const Nav: React.FC = () => {
  const { token, setToken } = useAppContext();
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Campus Notifs - T.Vaishnavi (RA2311003020232)</Typography>
        <Button color="inherit" component={Link} to="/">All</Button>
        <Button color="inherit" component={Link} to="/priority">Priority Inbox</Button>
        <Box ml={2}>
          <TextField 
            size="small" 
            placeholder="Access Token" 
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
