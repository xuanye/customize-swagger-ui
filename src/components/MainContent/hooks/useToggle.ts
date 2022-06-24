import { useCallback, useState } from 'react';

// Hook
// Parameter is the boolean, with default "false" value
export const useToggle = (initialState: boolean = false): [boolean, any] => {
  // Initialize the state
  const [state, setState] = useState<boolean>(initialState);
  // Define and memorize toggler function in case we pass down the component,
  // This function change the boolean value to it's opposite value
  const toggle = useCallback((specState?: boolean): void => {
    if (specState == undefined) {
      setState(state => !state);
    } else {
      setState(specState);
    }
  }, []);
  return [state, toggle];
};
