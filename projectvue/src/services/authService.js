import axios from 'axios';

class AuthService {
    static async login(username, password) {
        try {
            const response = await axios.post("http://localhost:8000/graphql/", {
                query: `
                    mutation {
                        loginUser(
                            input: {
                                username: "${username}",
                                password: "${password}"
                            }
                        ) {
                            message
                            success
                            user {
                                id
                                username
                                email
                                accessToken
                                refreshToken
                                isSuperuser
                            }
                        }
                    }
                `
            });
            return response;
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    static isAuthenticated() {
        return !!localStorage.getItem("access_token");
    }

    static logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }
}

export default AuthService;
