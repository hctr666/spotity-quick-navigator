/**
 * @module contexts
 */
import { createContext, useContext } from 'react';

/**
 * Set up AppContext
 */
export const AppContext = createContext();

/**
 * Access AppContext
 *
 * @returns {Object}
 */
export const useAppContext = () => useContext(AppContext);
