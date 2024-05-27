// components/Toast.tsx
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
  bgColor?: string;
}

const Toast: React.FC<ToastProps> = ({ message, onClose, bgColor }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyle: React.CSSProperties = {
    backgroundColor: bgColor || 'transparent',
  };

  return (
    <div className="relative">
      {visible && (
        <div
          id="toast-bottom-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-white divide-x divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
          role="alert"
          style={toastStyle}
        >
          <div className="text-sm font-normal text-white font-bold">{message}</div>
        </div>
      )}
    </div>
  );
};

export default Toast;
