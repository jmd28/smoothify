'use client';
import { createContext, useState } from 'react';

export const tokenContext = createContext();

export default function TokenContextProvider(props) {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <tokenContext.Provider value={{ accessToken, setAccessToken }}>
      {props.children}
    </tokenContext.Provider>
  );
}
