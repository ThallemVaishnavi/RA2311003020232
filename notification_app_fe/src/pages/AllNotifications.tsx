import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { Log } from '../../../logging_middleware/logger';
import type { Notification } from '../sorter';
import { NotificationCard } from '../components/NotificationCard';

export const AllNotifications: React.FC = () => {
  const { token } = useAppContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');

  const fetchNotifs = async () => {
    if (!token) return;
    setLoading(true);
    Log("frontend", "info", "page", `Fetching all notifications page ${page}`);
    try {
      let url = `http://20.207.122.201/evaluation-service/notifications?page=${page}&limit=10`;
      if (typeFilter) url += `&notification_type=${typeFilter}`;

      const res = await fetch(url, { headers: { "Authorization": `Bearer ${token}` } });
      const data = await res.json();
      setNotifications(data.notifications || []);
      Log("frontend", "info", "api", "Successfully fetched all notifications");
    } catch (err) {
      Log("frontend", "error", "api", "Failed to fetch notifications");
    }
    setLoading(false);
  };

  useEffect(() => { fetchNotifs(); }, [page, typeFilter, token]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Notifications</Typography>
      
      <Box display="flex" gap={2} mb={3}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter Type</InputLabel>
          <Select value={typeFilter} label="Filter Type" onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
        
        <Button variant="outlined" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev Page</Button>
        <Typography sx={{ alignSelf: 'center' }}>Page {page}</Typography>
        <Button variant="outlined" onClick={() => setPage(p => p + 1)}>Next Page</Button>
      </Box>

      {loading ? <CircularProgress /> : notifications.map(n => <NotificationCard key={n.ID} notification={n} />)}
    </Container>
  );
};
