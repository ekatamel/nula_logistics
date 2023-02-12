export type Filter = {
    name: string;
    priceFrom: string;
    priceTo: string;
    dateAddedFrom: string;
    dateAddedTo: string;
};

export enum SearchInputType {
    text = "text",
    number = "number",
}
