import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled(motion.div)`
  background: ${props => {
    switch (props.type) {
      case 'success': return '#4CAF50';
      case 'error': return '#f44336';
      case 'warning': return '#ff9800';
      case 'info': return '#2196F3';
      default: return '#333';
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  min-width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  margin-left: 1rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const notificationIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

export default function Notification() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <NotificationContainer>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Message>
              <Icon>{notificationIcons[notification.type]}</Icon>
              {notification.message}
            </Message>
            <CloseButton onClick={() => removeNotification(notification.id)}>
              ×
            </CloseButton>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
} 