import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import type { Notification } from '../sorter';
import { useAppContext } from '../context/AppContext';
import { Log } from '../../../logging_middleware/logger';

interface Props {
  notification: Notification;
}

export const NotificationCard: React.FC<Props> = ({ notification }) => {
  const { viewedIds, markAsViewed } = useAppContext();
  const isViewed = viewedIds.includes(notification.ID);

  const handleClick = () => {
    if (!isViewed) {
      markAsViewed(notification.ID);
      Log("frontend", "info", "component", `User viewed notification ${notification.ID}`);
    }
  };

  const getColor = (type: string) => {
    if (type === 'Placement') return 'success';
    if (type === 'Result') return 'primary';
    return 'default';
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        mb: 2, 
        cursor: 'pointer', 
        backgroundColor: isViewed ? '#f9f9f9' : '#fff',
        borderLeft: isViewed ? '4px solid #ccc' : '4px solid #1976d2',
        boxShadow: isViewed ? 1 : 3,
        transition: '0.2s'
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={notification.Type} color={getColor(notification.Type) as any} size="small" />
          <Typography variant="caption" color="textSecondary">
            {notification.Timestamp}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: isViewed ? 'normal' : 'bold' }}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
};
