# wissen-angular-coding-challenge-2022-n8xw8s

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/prabhashgupta/wissen-angular-coding-challenge-2022-n8xw8s)



Develop a pseudo Front End Application which would let the users login and display a message..
[Minimum Requirement]  (entry level)
— Design (Try to replicate the wireframe as closely as possible. Ideally pixel perfect)
— Use of Web API to 
Authenticate an User https://reqres.in/api/login 
Pass two parameters in the (POST) request body i.e email and password.
"email": "eve.holt@reqres.in",
               "password": "cityslicka"
 
After Successful User Login, In Api response you will be able to get user details including auth token. you will use this token for calling a secure API to get the list of users.
https://reqres.in/api/unknown

headers: {
'Authorization': 'Bearer <token>',
‘Content-type’:’application/json’
}
Print the list of users in console
