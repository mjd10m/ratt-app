import { jwtDecode } from 'jwt-decode';


class AuthService {
  getProfile() {
    const isValid = this.loggedIn()
    if(isValid) {
      return jwtDecode(this.getToken());
    } else {
      return null
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  logout() {
    // Clear user token and profile data from localStorage
    // axios.defaults.headers.common["Authorization"] = null;
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
  getSignupToken() {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    if (token) {
      return token
    } else {
      return '1234'
    }
  }
}

export default new AuthService();