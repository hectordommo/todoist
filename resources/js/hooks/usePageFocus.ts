import React, { useEffect } from 'react'

const usePageFocus = (onFocus) => {

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('User is back on the page');
        onFocus()
        // Perform any actions you want when the user comes back
      } else {
        console.log('User has left the page');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}

export default usePageFocus
