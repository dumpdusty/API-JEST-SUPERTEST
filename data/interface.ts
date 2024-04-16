export interface User{
    name: string
    email: string
    password: string
    passwordConfirm: string
}

export interface Tour{
        name: string,
        duration: number,
        description: string,
        maxGroupSize: number,
        summary: string,
        difficulty: string,
        price: number,
        rating: number,
        imageCover: string,
        ratingsAverage: number,
        guides: any,
        startDates:Date,
        location: {
            latitude: number,
            longitude: number,
            description: string,
            address: string
        },
        startLocation: {
            type: string,
            coordinates: any
        }
    }

    export interface TourMin{
        name: string,
        duration: number,
        maxGroupSize: number,
        difficulty: string,
        price: number,
        summary: string,
        imageCover: string,
        startLocation: {
            type: string,
            coordinates: any
        }
    }