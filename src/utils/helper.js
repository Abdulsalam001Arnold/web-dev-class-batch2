

export const protectedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");
  
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (response.status === 401) {
      console.warn("Token invalid, redirecting to login...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  
    return response.json();
  };
  