export interface IProduct{
    id?: number
    title: string
    price: number
    description: string
    category: string
    rating: {
        rate: number
        count: number
    }
    image: string
}

export interface IUser{
    address: {
        geolocation: {
            lat: string,
            long: string
        },
        city: string,
        street: string,
        number: number,
        zipcode: string
    },
    id?: 1,
    email: string,
    username: string,
    password: string,
    avatar?: string,
    name: {
        firstname: string,
        lastname: string
        patronymic?: string
    },
    phone: string,
    __v: number
}