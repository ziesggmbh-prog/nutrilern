// Clear all possible browser caches
if (typeof window !== 'undefined') {
  // Clear localStorage
  window.localStorage.clear();
  
  // Clear sessionStorage  
  window.sessionStorage.clear();
  
  // Force reload without cache
  window.location.reload(true);
}