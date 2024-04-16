
const chance = require('chance').Chance()
import { Tour, TourMin } from "./interface";

let tourRandomName = "tour_" + chance.word();
export const diffArray = ["easy", "medium", "difficult"];

function randomNum(max: number) {
  return Math.floor(Math.random() * max);
}

function randomDifficulty() {
  return diffArray[randomNum(3)];
}
const randomDifLvl = randomDifficulty();

function createRandomCoordinates() {
    return [chance.latitude(), chance.longitude()]
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
export const randomTourBody = createRandomTour()

export const randomRequiredTourBody = createRequiredRandomTour()
