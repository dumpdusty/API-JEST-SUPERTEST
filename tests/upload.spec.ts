import * as supertest from 'supertest'
import { upload } from '../helpers/uploadhelper'
const request = supertest('https://practice-react.sdetunicorns.com/api/test')


describe('UPLOAD', () => {
    let res: any
    describe('upload single document', () => {
        beforeAll(async() => {
            res = await upload('single', ['./image/panda-1.jpg'])        
        })

        it('verify response status code', () => {        
            expect(res.statusCode).toBe(200)
        })

        it('verify response filename', () => {
            expect(res.body.filename).toBe('panda-1.jpg')
        });
    });
    describe('upload multiple documents', () => {
        beforeAll(async() => {
            const files: string[] = ['./image/panda-1.jpg', './image/panda-2.jpg']
            res = await upload('multiple',files)
        })

        it('verify response status code', async() => {
            expect(res.statusCode).toBe(200)            
        });
        
        it('verify response contains array', async() => {
            expect(Array.isArray(res.body)).toBe(true)   
        });

    });

    
    
    // it.skip('upload miltiple documents', async() => {
    //     const files: string[] = ['./image/panda-1.jpg', './image/panda-2.jpg']
    //     const req = request.post('/upload/miltiple')

    //     for(const file of files){
    //         req.attach('multiple', file)
    //     }
    //     return new Promise ((resolve, reject) => {
    //         req.end((err, res) => {
    //             if(err){
    //                 reject(err)
    //             }else{
    //                 console.log('Upload successfully', res.body);
    //                 expect(res.status).toBe(200)
    //                 resolve(res)
                    
    //             }

    //         })
    //     })
    // });
})