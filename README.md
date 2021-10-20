Write tests for the function `validateRegisterForm`, which takes two strings `password` and `email`, and returns an object with a response that contain status code and message.

If all entered data is valid object contains status code `200` and message `Email and password are valid.`.  
If entered email is invalid object contains status code `422` and message `Email is invalid.`.  
If entered password is invalid object contains status code `422` and message `Password is invalid.`.  
If entered password and email are invalid object contains status code `500` and message `Password and email are invalid.`.  

Requirements for the valid password:
- accepts letters `Aa-Zz, Aa-Яя`;
- at least 8 characters inclusive;
- maximum 16 characters inclusive;
- contains at least 1 digit, 1 special character, 1 uppercase letter.

Requirements for the valid email:
- English letters(Aa-Zz).
- Digits.
- Characters: ! # $ % & ' * + - / = ? ^ _ ` { } ~
- Character `.` ( period, dot or fullstop) provided that it is not the first or last character and it will not come one after the other.
- @ is required
- top Level domain can not start with dot `.` 
- top level domain can not start with dot `.`
- an email should not be start with `.`
- double dots are not allowed

The function does not check the uniqueness of the email and length of email (it made by another functions).  

Examples:
```js
validateRegisterForm('test@mail.com', 'P@ssword1!') === { code: 200, message: 'Email and password are valid.', }
validateRegisterForm('test@mail.com', 'P@ssword') === { code: 422, message: 'Password is invalid.', }
validateRegisterForm('test@com', 'P@ssword1') === { code: 422, message: 'Email is invalid.', }
validateRegisterForm('test@com', 'ssword1') === { code: 500, message: 'Password and email are invalid.', }
```

`Hint`: focus on the most priority and realistic cases, do not focus on edge cases.  

[Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md)

Read more about [Jest expectations](https://jestjs.io/uk/docs/expect)
