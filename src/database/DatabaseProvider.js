// src/DatabaseProvider.js
import React, { createContext, useContext } from 'react'
import { database } from '.'

const DatabaseContext = createContext(database)

export const DatabaseProvider = ({ children }) => (
  <DatabaseContext.Provider value={database}>
    {children}
  </DatabaseContext.Provider>
)

export const useDatabase = () => useContext(DatabaseContext)
