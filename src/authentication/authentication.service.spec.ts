import { AuthenticationService } from "./authentication.service";

describe('AuthenticationService',()=>{
    let authenticationService: AuthenticationService;
    
    beforeEach(()=>{
        authenticationService = new AuthenticationService();
    });

    it('returns true when user is logged in',()=>{

        localStorage.setItem('token','JWT');

        expect(authenticationService.isLoggedIn()).toBeTruthy();

    });

    afterEach(()=>{
        localStorage.removeItem('token');
    });
});









// //creates a group of tests
// describe('AuthenticationService',()=>{
    
//     beforeAll(()=>{});

//     beforeEach(()=>{});

//     // creates a single test
//     it('should be created',()=>{
//         expect(true).toBeTruthy();

//     });

//     it('should be false',()=>{
//         expect(false).toBeFalsy();

//     });

//     afterEach(()=>{});
//     afterAll(()=>{});

// });