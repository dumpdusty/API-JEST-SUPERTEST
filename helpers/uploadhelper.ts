import * as supertest from 'supertest'
const request = supertest(process.env.UPLOAD_URL as string)


export function upload(endpoint: string, files: string[]){
    const req = request
      .post(`/upload/${endpoint}`)
      
      files.forEach(file => {
        req.attach(endpoint, file)
      }) 
      return req
  }