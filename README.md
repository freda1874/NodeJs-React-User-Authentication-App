# User-Authentication-Project

figma design: https://www.figma.com/design/6z69pcKwY53LLTAJu3ZvRy/LoginUIConcept-(Community)?node-id=0-1&t=ihNdwPGUaibTp92q-1

### Changes to the Front End

Use Vite for fast development and Tailwind CSS for responsive web styling.

### install dependencies:

Run the following command to install the necessary dependencies:

npm install

Start the Development Server:

npm run dev

default location changed to
http://localhost:5173/

### Project Logic

1.Register Page
http://localhost:5173/

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/a5df4c9f-d752-4754-a9f9-9da20b47dc50)

2.verify email

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/da2d467e-e681-425f-b23c-bd08d6dd8a09)

3.Login Page:
http://localhost:5173/login

Users can log in using their credentials.

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/56ba80ee-fae9-444b-bc70-9d035886df07

4.Forget Password:
4.1 Clicking "Forget Password" triggers a modal to enter the email.

After entering the email, click "verify" to initiate the password reset process.

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/d30ef946-4221-43df-9928-1b01af195eaa)

Upon receiving the email, click the reset password link.
Redirects to the reset password page where users can set a new password:

4.2 Password Reset:
http://localhost:5173/reset-password/:token

![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/51baf86c-c587-444d-9b8c-9cafaf7cefed)

Successful password reset redirects back to the **login page**.

5.Landing
Once logged in, if you are an "Admin", you will see:
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/4b90e55d-7b70-4750-99af-c63008153c92)
Once logged in, if you are not an "Admin", you will see:
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/f0c97fef-94c8-475b-8cd4-6f47e7864d53)
if you are not logged in and you find this page, you will see:
![image](https://github.com/Iseul-park/User-Authentication-Project/assets/85437054/279e6179-9354-473f-a13b-a728269a2510)

![image](https://github.com/user-attachments/assets/63449c82-43be-41d7-b91e-fab42ffe1b86)
