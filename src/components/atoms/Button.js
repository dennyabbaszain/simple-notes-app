import React from 'react';

export const Button = ({ action, title, isLoading, isUpdate, className }) => {
  if (isLoading) {
    return <button className='btn disable'>Loading... </button>;
  }
  if (isUpdate) {
    return (
      <button onClick={action} className={className}>
        {title}
      </button>
    );
  }

  return (
    <button onClick={action} className={`btn ${className}`}>
      {title}
    </button>
  );
};
