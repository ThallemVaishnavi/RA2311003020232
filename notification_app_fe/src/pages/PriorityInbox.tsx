import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { Log } from '../../../logging_middleware/logger';
import type { Notification } from '../sorter';
import { getPriorityNotifications } from '../sorter';
import { NotificationCard } from '../components/NotificationCard';

export const PriorityInbox: React.FC = () => {
  const { token } = useAppContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);

  const fetchPriority = async () => {
    if (!token) return;
    setLoading(true);
    Log("frontend", "info", "page", `Fetching priority inbox with limit ${limit}`);
    try {
      // Fetch a larger chunk to sort from
      const res = await fetch(`http://20.207.122.201/evaluation-service/notifications?limit=50`, { 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      const data = await res.json();
      
      const topN = getPriorityNotifications(data.notifications || [], limit);
      setNotifications(topN);
      Log("frontend", "info", "api", "Successfully loaded priority inbox");
    } catch (err) {
      Log("frontend", "error", "api", "Failed to fetch priority inbox");
    }
    setLoading(false);
  };

  useEffect(() => { fetchPriority(); }, [limit, token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Priority Inbox</Typography>
      
      <Box display="flex" gap={2} mb={3} alignItems="center">
        <TextField 
          label="Top 'N' Notifications" 
          type="number" 
          size="small" 
          value={limit} 
          onChange={(e) => setLimit(Number(e.target.value))} 
        />
        <Button variant="contained" onClick={fetchPriority}>Refresh</Button>
      </Box>

      {loading ? <CircularProgress /> : notifications.map(n => <NotificationCard key={n.ID} notification={n} />)}
    </Container>
  );
};
