import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");

import { User } from '../data/interface'
const chance = require('chance').Chance()


const requestSdet = supertest("https://practice-react.sdetunicorns.com/api/test");

export function createRandomUserBody(password = chance.string({length: 16})): User{
  return {
      name: chance.name(),
      email: chance.email({domain: "example.com"}),
      password: password,
      passwordConfirm: password
  }
}



export function createUser(data: string | object | undefined){
    return request
    .post("/users/signup")
    .send(data)
}

export async function loginUser(email:string, password: string){
    return await request
    .post("/users/login")
    .send({
      email,
      password,
    })
} 

export function getAllUsers(cookie: any){
  return request.get("/users").set("Cookie", cookie);
}


// export async function loginUserTest(user: {
//   email: string, 
//   password: string
// }): Promise<any>{
//     return await request
//     .post("/users/login")
//     .send({email: user.email,password: user.password})
// }


export async function deleteUser(cookie: any){
    return await request
      .delete('/users/deleteMe')
      .set('Cookie', cookie)
}

// export async function deleteUserTest(response: {headers: {[x: string]: any}}){
//   return await request
//     .delete('/users/deleteMe')
//     .set('Cookie', response.headers['set-cookie'])
// }



export function upload(endpoint: string, files: string[]){
  const req = requestSdet
    .post(`/upload/${endpoint}`)
    
    files.forEach(file => {
      req.attach(endpoint, file)
    }) 
    return req
}

