import React, { useState } from 'react';
import { BaseResponse } from '../interfaces';

export function CheckName() {
  const [status, setStatus] = useState<'INITIAL' | 'SENDING_DATA' | 'DATA_SENDED' | 'ERROR_SENDING_DATA'>('INITIAL');
  const [value, setValue] = useState<string>('');
  const [validName, setValidName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!value.trim()) {
      setError('Name cannot be empty');
      return;
    }

    // Perform your validation logic here
    // For simplicity, we assume the name is valid if it has at least 5 characters
    if (value.trim().length < 5) {
      setError('Name must be at least 5 characters long');
      return;
    }

    // If name is valid, set it to validName state and reset error
    setValidName(value.trim());
    setError(null);

    try {
      setStatus('SENDING_DATA');
      const response = await fetch('http://localhost:3001/info/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: value,
        })
      });
      if (response.ok) {
        setStatus('DATA_SENDED');
      } else {
        throw new Error('Failed to validate name');
      }
    } catch (error) {
      console.error(error);
      setStatus('ERROR_SENDING_DATA');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {status === 'ERROR_SENDING_DATA' && (
        <div>
          <h2 className="text-2xl font-bold">Error sending data. Please try again.</h2>
          <button onClick={() => setStatus('INITIAL')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Retry</button>
        </div>
      )}

      {status === 'SENDING_DATA' && (
        <div>
          <h2 className="text-2xl font-bold">Validating name...</h2>
        </div>
      )}

      {status === 'INITIAL' && (
        <div>
          <h2 className="text-2xl font-bold">Enter Name to Validate</h2>
          <div className="flex">
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter name"
            />
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Validate
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}

      {status === 'DATA_SENDED' && (
        <div>
          <h2 className="text-2xl font-bold">{validName ? 'Name validated successfully!' : 'Name validation failed'}</h2>
          {validName && (
            <div>
              <p>Valid Name: {validName}</p>
              <button onClick={() => setStatus('INITIAL')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">Validate Another Name</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
