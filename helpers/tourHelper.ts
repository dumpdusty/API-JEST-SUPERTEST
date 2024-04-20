import 'dotenv/config'
import * as supertest from "supertest";
const request = supertest(process.env.BASE_URL as string);
const chance = require('chance').Chance()
import { Tour, TourMin } from "../data/interface";


// let tourRandomName = "tour_" + chance.word();  // create unique name
export const diffArray = ["easy", "medium", "difficult"];

function randomNum(max: number) {
  return Math.floor(Math.random() * max);
}

function randomDifficulty() {
  return diffArray[randomNum(3)];
}
const randomDifLvl = randomDifficulty();

function createRandomCoordinates() {
    return [chance.latitude({min: -30, max: 70}), chance.longitude({min: -30, max: 70})]
}

const randomCoordinates = createRandomCoordinates()



export function createRandomTour(name = chance.word({length:12})): Tour {
  return {
    name: name,
    duration: randomNum(10),
    description: `The best travel to ${name}`,
    maxGroupSize: randomNum(12),
    summary: `You will stay in ${name} for ${randomNum(30)} days`,
    difficulty: randomDifLvl,
    price: chance.integer({ min: 100, max: 500 }),
    rating: chance.integer({ min: 1, max: 5}),
    imageCover: "image.jpg",
    ratingsAverage: chance.floating({ min: 1, max: 5, fixed: 2 }),
    guides: [],
    startDates: new Date(),
    location: {
      latitude: chance.latitude(),
      longitude: chance.longitude(),
      description:' Baku, Azerbaijan',
      address: chance.address(),
    },
    startLocation: {
      type: 'Point',
      coordinates: randomCoordinates,
    },
  };
}


export function createRequiredRandomTour(name = chance.word({length:12})): TourMin {
    return {
      name: name,
      duration: randomNum(10),
      maxGroupSize: randomNum(12),
      difficulty: randomDifLvl,
      price: chance.integer({ min: 100, max: 500 }),
      summary: `You will stay in ${name} for ${randomNum(30)} days`,
      imageCover: "image.jpg",
      startLocation: {
        type: 'Point',
        coordinates: randomCoordinates,
      },
    };
  }


export function tourCreate(cookie: any, data: any){
  return request
  .post("/tours")
  .set("Cookie", cookie)
  .send(data);
}

export function tourGetAll(cookie: any){
  return request.get('/tours').set("Cookie", cookie)
}

export function tourDelete(cookie: any, tourId: string){
  return request.delete(`/tours/${tourId}`).set("Cookie", cookie);
}