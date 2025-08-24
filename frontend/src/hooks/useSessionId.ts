import { useState, useEffect } from 'react';

export const useSessionId = () => {
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Get existing session ID or create a new one
    let existingSessionId = localStorage.getItem('rmapp_session_id');
    
    if (!existingSessionId) {
      // Generate a new session ID
      existingSessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('rmapp_session_id', existingSessionId);
    }
    
    setSessionId(existingSessionId);
  }, []);

  const resetSession = () => {
    const newSessionId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('rmapp_session_id', newSessionId);
    setSessionId(newSessionId);
  };

  return {
    sessionId,
    resetSession,
  };
};
