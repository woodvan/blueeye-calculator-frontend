/* eslint import/prefer-default-export: "off" */

export default class LocalStorageService {
    /**
     * loadState queries the local storage to retrieve and preload
     * the state with customer data before the header is rendered.
     * 
     * @param {string} key String; String; The key for local storage object.
     * @return {object}
     */
    static loadState(key) {
      try {
        const serializedState = localStorage.getItem(key)
        if (serializedState === null) {
          return undefined
        }
        return JSON.parse(serializedState)
      } catch (err) {
        return undefined
      }
    }
  
    /**
     * saveState saves or updates an object in the local storage
     * with relevant customer date after any modification is 
     * detected in the header state.
     *
     * @param {string} key - String; The key for local storage object.
     * @param {object} state - Object; Customer data from the state.
     *
     */
    static saveState(key, state) {
      try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem(key, serializedState)
      } catch (err) {
        // Ignore write errors
      }
    }
  
    static removeState(key) {
      try {
        localStorage.removeItem(key)
      } catch (err) {
        // Ignore write errors
      }
    }
  
    /**
     * clearState clear all the state from local storage
     */
    static clearState() {
      try {
        localStorage.clear()
      } catch (err) {
        // Ignore write errors
      }
    }
  }