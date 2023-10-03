export interface IProduct {
    _id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: {
      rate?: number;
      count?: number;
    };
    image?: string;
    addImg?: string[];
    chars?: Characteristic[];
  }
  
  export interface Characteristic {
    title: string;
    value: string;
  }

export interface IOrder {
    _id?: string;
    customer?: string;
    items: ICartItem[];
    timestamp: string;
    totalprice: number;
    status: string;
}

  export interface ICartItem {
    id: string;
    quantity: number;
    price: number;
  }

export interface IUser{
    address?: {
        geolocation?: {
            lat?: string,
            long?: string
        },
        city?: string,
        street?: string,
        number?: number,
        zipcode?: string
    },
    _id?: string,
    email?: string,
    username?: string,
    password?: string,
    avatar?: string,
    name?: {
        firstname?: string,
        lastname?: string,
        patronymic?: string
    },
    phone?: string,
    __v?: number,
    role?: string,
    birthdate?: string,
    fav?: string[],
}

export interface ICategory{
    _id?: string,
    title: string,
    parent?: string,
    children?: string[],
}

export interface ISliderData{
    _id: string | undefined, 
    title: string, 
    image: string | undefined, 
    content: string
}

export interface IArticle{
    id: number | undefined, 
    title: string, 
    image: string | undefined, 
    content: string
}
