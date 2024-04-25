import * as supertest from 'supertest'
const uploadReq = supertest('https://practice-react.sdetunicorns.com/api/test')


export function upload(endpoint: string, files: string[]){
    const req = uploadReq
      .post(`/upload/${endpoint}`)
      
      files.forEach(file => {
        req.attach(endpoint, file)
      }) 
      return req
  }