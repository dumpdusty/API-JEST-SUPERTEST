import * as supertest from 'supertest'
const request = supertest('https://practice-react.sdetunicorns.com/api/test')


export function upload(endpoint: string, files: string[]){
    const req = request
      .post(`/upload/${endpoint}`)
      
      files.forEach(file => {
        req.attach(endpoint, file)
      }) 
      return req
  }