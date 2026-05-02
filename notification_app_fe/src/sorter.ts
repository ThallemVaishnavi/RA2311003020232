import { Log } from '../../logging_middleware/logger';

// Type definitions based on the API response
export interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event' | string;
  Message: string;
  Timestamp: string;
}

/**
 * Sorts notifications based on priority and recency.
 * Weight: Placement > Result > Event
 * Recency: Newer timestamps first
 */
export function getPriorityNotifications(notifications: Notification[], n: number = 10): Notification[] {
  Log("frontend", "info", "utils", `Starting to sort ${notifications.length} notifications to find top ${n}`);

  // Helper to assign numeric weights
  const getWeight = (type: string) => {
    switch (type.toLowerCase()) {
      case 'placement': return 3;
      case 'result': return 2;
      case 'event': return 1;
      default: return 0;
    }
  };

  const sorted = [...notifications].sort((a, b) => {
    const weightA = getWeight(a.Type);
    const weightB = getWeight(b.Type);

    // If weights are different, higher weight comes first
    if (weightA !== weightB) {
      return weightB - weightA; 
    }

    // If weights are the same, newer timestamp comes first
    const timeA = new Date(a.Timestamp).getTime();
    const timeB = new Date(b.Timestamp).getTime();
    return timeB - timeA;
  });

  const topN = sorted.slice(0, n);
  Log("frontend", "info", "utils", `Successfully sorted and extracted top ${n} notifications`);
  
  return topN;
}
