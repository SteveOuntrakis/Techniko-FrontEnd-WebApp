export class AuthenticationService{
    isLoggedIn():boolean {
        
        const token = localStorage.getItem('token');
        return token === 'JWT'
    }   
}