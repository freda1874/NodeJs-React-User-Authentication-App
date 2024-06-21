# User-Authentication-Project

figma design: https://www.figma.com/design/6z69pcKwY53LLTAJu3ZvRy/LoginUIConcept-(Community)?node-id=0-1&t=ihNdwPGUaibTp92q-1 

Hi, I have uploaded the frontend code for the project. The following updates and pages are included:

### Pages

1. **Register Page (`Register.js`)**
2. **Login Page (`Login.js`)**
3. **Reset Password Page (`ResetPassword.js`)**
4. **Landing Page (`Landing.js`)**
5. **Landing VIP Page (`LandingVIP.js`)**

### Workflow

The application workflow includes the following steps:

1. **Register** - Users can create a new account on the Register page.
2. **Verify Code** - After registration, users receive a verification code that they need to enter to verify their account.
3. **Login** - Once the account is verified, users can log in using their credentials.
4. **Reset Password** - If users forget their password, they can reset it using the Reset Password page.
5. **Landing or Landing VIP** - Based on the user's email, after logging in, they will be directed to either the regular Landing page or the VIP Landing page:
   - If the email contains "vip", the user is redirected to the `LandingVIP` page.
   - Otherwise, the user is redirected to the `Landing` page.
 
### Flow Implemented: 

Registration -> Verification Code -> Login -> Reset Password -> Landing or Landing VIP
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/2a998178-a386-4a5e-8281-af8223eb7eed)
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/80dc1896-1b30-4fa0-b46b-8062b0c34170)
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/d0e79897-6787-4524-bf27-453471833a8e)
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/d1cd4161-4069-4d6f-98db-b8ff83b0d908)
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/61e63634-ff4a-4a51-863b-c73ed0eed0b7)
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/ec8f6497-6142-43d1-8209-538e8edc6881)

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/169954007/873006a8-634e-4997-9a88-b135a8337a4c)





**Notes:**
The current implementation includes the basic skeleton and simple frontend logic.
The frontend is not yet connected to the backend.
The interface is still a work in progress, with placeholder images and elements to give a general idea of the design.
Feel free to check out the code and provide any feedback or suggestions.
 
