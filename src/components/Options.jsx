import React from 'react';

const Options = ({ type, placeholder }) => {
  if (type === 'text') {
    return (
      <input
        type="text"
        placeholder={placeholder || "Text answer here"}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        disabled
      />
    );
  }

  if (type === 'date') {
    return (
      <input
        type="date"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        disabled
      />
    );
  }

  if (type === 'file') {
    return (
      <input
        type="file"
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        disabled
      />
    );
  }

  return null;
};

export default Options;