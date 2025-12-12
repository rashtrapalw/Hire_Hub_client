export const getToken = () => localStorage.getItem('token');
export const setToken = (t) => localStorage.setItem('token', t);
export const removeToken = () => localStorage.removeItem('token');
export const setUser = (u) => localStorage.setItem('user', JSON.stringify(u));
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem('user')); } catch(e) { return null }
};
export const logout = () => { removeToken(); localStorage.removeItem('user'); };
