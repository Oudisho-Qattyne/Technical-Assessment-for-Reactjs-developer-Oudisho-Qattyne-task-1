import { useState, useEffect } from 'react';

interface TimeAgoProps {
  date: string | Date;
  className?: string;
  refreshInterval?: number; 
}

const TimeAgo = ({ date, className = '', refreshInterval = 60000 }: TimeAgoProps) => {
  const [timeAgo, setTimeAgo] = useState('');
  
  const calculateTimeAgo = () => {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 0) {
      return 'in the future';
    }
    

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];
    

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      
      if (count >= 1) {
        if (count === 1) {
          return `${count} ${interval.label} ago`;
        }
        return `${count} ${interval.label}s ago`;
      }
    }
    
    return 'just now';
  };
  
  useEffect(() => {
    setTimeAgo(calculateTimeAgo());
    
    if (refreshInterval > 0) {
      const intervalId = setInterval(() => {
        setTimeAgo(calculateTimeAgo());
      }, refreshInterval);
      
      return () => clearInterval(intervalId);
    }
  }, [date, refreshInterval]);
  
  return (
    <span className={className} title={new Date(date).toLocaleString()}>
      {timeAgo}
    </span>
  );
};

export default TimeAgo;