import 'dotenv/config'
import * as supertest from "supertest";
const request = supertest(process.env.BASE_URL as string);

const chance = require('chance').Chance()


export function createRandomReviewBody(tourId, userId){
    return {
        review: chance.sentence({ words: 2 }),
        tour: tourId,
        user: userId
        
    }
}

export function createReview(cookie: any, data: any){
    return request
    .post('/reviews')
    .set("Cookie", cookie)
    .send(data);
}