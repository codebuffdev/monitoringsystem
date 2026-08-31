import React from 'react';
import fallbackReleaseData from '../data/releaseData.json';

const ReleaseContext = React.createContext(fallbackReleaseData);

export function ReleaseProvider({ children }) {
  const [release, setRelease] = React.useState(fallbackReleaseData);

  React.useEffect(() => {
    let active = true;
    fetch('/api/releases', { headers: { Accept: 'application/json' } })
      .then((response) => {
        if (!response.ok) throw new Error('Release API unavailable');
        return response.json();
      })
      .then((data) => {
        if (active && data?.version && data?.downloadUrl) setRelease(data);
      })
      .catch(() => {
        // Keep the bundled release data as a safe fallback.
      });

    return () => { active = false; };
  }, []);

  return <ReleaseContext.Provider value={release}>{children}</ReleaseContext.Provider>;
}

export function useRelease() {
  return React.useContext(ReleaseContext);
}
