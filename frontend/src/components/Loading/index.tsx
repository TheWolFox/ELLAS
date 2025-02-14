import React from 'react';

const Loading = () => {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="w-32 h-32 border-4 border-t-transparent border-gray-700 rounded-full animate-spin"></div>
      </div>
    );
  }

export default Loading;