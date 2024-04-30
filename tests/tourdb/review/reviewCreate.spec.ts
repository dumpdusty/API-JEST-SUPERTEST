import * as userHelper from "../../../helpers/userHelper";
import * as tourHelper from "../../../helpers/tourHelper";
import * as reviewHelper from "../../../helpers/reviewHelper";

import * as supertest from "supertest";
const request = supertest(process.env.BASE_URL as string);

describe('REVIEW_v_2', () => {
    let res,  data: any = [], userId, tourId, randomReviewBody, randomUserBody
    data.push(process.env.COOKIE)
    beforeAll(async () => {

        const randomUserBody = userHelper.createRandomUserBody()
        userId = (await userHelper.createUser(randomUserBody)).body.data.user._id;
        console.log(userId, 'USER ID');
        
        
        const randomTourBody = tourHelper.createRandomTour();
        tourId = (await tourHelper.tourCreate(data, randomTourBody)).body.data.data._id;
        // console.log(tourId, 'TOUR ID');
        
        randomReviewBody = reviewHelper.createRandomReviewBody(tourId, userId)
        // console.log(randomReviewBody, 'RANDOM REVIEW BODY');
        
    })
    
    it('create review', async() => {

        res = await reviewHelper.createReview(data, randomReviewBody)

        console.log(res.body, 'REVIEW-RESPONSE');
        

        expect(res.statusCode).toEqual(201)
        expect(res.body.status).toBe('success')
    });
});