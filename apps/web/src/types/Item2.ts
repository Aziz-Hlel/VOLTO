

export type Item = {
    id: string;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
    subCategory: string;

}


export type SubCategory = {
    id: string;
    title: string;
    items: Item[]
}


export type Category = {
    id: string;
    title: string;
    subCategory: SubCategory[]
}

type menu = {
    categories: Category[]
}