import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  token: string;
  setToken: (t: string) => void;
  viewedIds: string[];
  markAsViewed: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || 'QkbpxH');
  const [viewedIds, setViewedIds] = useState<string[]>(
    JSON.parse(localStorage.getItem('viewed_notifications') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('access_token', token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem('viewed_notifications', JSON.stringify(viewedIds));
  }, [viewedIds]);

  const markAsViewed = (id: string) => {
    if (!viewedIds.includes(id)) {
      setViewedIds([...viewedIds, id]);
    }
  };

  return (
    <AppContext.Provider value={{ token, setToken, viewedIds, markAsViewed }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
