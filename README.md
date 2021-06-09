Write tests for the function `checkPassword`, which takes the string` password` and returns `true` for the valid password, and` false` for invalide.  

Requirements for the valid password:
- accepts only letters of the Latin alphabet `Aa-Zz`;
- at least 8 characters inclusive;
- maximum 16 characters inclusive;
- contains at least 1 digit, 1 special character, 1 uppercase letter.

Requirements for the valid email:
- username could be 1-64 characters inclusive: Latin (Aa-Zz), numbers, some special characters (`+`, `-`,` _`);
- hostname could be 1-63 characters inclusive: Latin (Aa-Zz), numbers, some special characters (`+`, `-`,` _`);
- domain could be 1-63 characters inclusive: Latin (Aa-Zz), numbers, some special characters (`+`, `-`,` _`);
- max length 75 characters inclusive.

The function does not check the uniqueness of the email.  

Examples:
```js
validateRegisterForm('test@mail.com', 'P@ssword1!') === { code: 200, message: 'Email and password are valid.', }
validateRegisterForm('test@mail.com', 'P@ssword') === { code: 422, message: 'Password is invalid.', }
validateRegisterForm('test@com', 'P@ssword1') === { code: 422, message: 'Email is invalid.', }
```

`Hint`: focus on the most priority and realistic cases, do not focus on edge cases.  

[Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md)

Read more about [Jest expectations](https://jestjs.io/uk/docs/expect)