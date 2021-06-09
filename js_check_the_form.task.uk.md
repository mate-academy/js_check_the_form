Write tests for the `validateRegisterForm` function, which accepts the strings `email` and `password`, and validates the email and password, and returns an object with a status code and a message with the result of the check.

Валідним вважається пароль, який відповідає всім вимогам:
- приймає лише літери латинського алфавіту `Aa-Zz`;
- мінімум 8 символів включно;
- максимум 16 символів включно;
- містить щонайменше 1 цифру, 1 спеціяльний символ, 1 букву у верхньому регістрі.  

Валідною вважається пошта, яка відповідає всім вимогам:
- username пошти має бути від 1 до 64 символів включно: латиниця (Aa-Zz), цифри, деякі спеціяльні символи (`+`, `-`, `_`);
- hostname має бути від 1 до 63 символа включно: латиниця (Aa-Zz), цифри, деякі спеціяльні символи (`+`, `-`, `_`);
- domain має бути від 1 до 63 символів включно: латиниця (Aa-Zz), цифри, деякі спеціяльні символи (`+`, `-`, `_`);
- загальна довжина не більше 75 символів включно.

Функція не перевіряє унікальність електронної пошти.  

Приклади:
```js
validateRegisterForm('test@mail.com', 'P@ssword1!') === { code: 200, message: 'Email and password are valid.', }
validateRegisterForm('test@mail.com', 'P@ssword') === { code: 422, message: 'Password is invalid.', }
validateRegisterForm('test@com', 'P@ssword1') === { code: 422, message: 'Email is invalid.', }
```

[Guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md)

Read more about [Jest expectations](https://jestjs.io/uk/docs/expect)