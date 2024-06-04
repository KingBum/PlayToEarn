export interface IWalletInfo {
    address: string,
    bnb: string | undefined,
    token: string | undefined
}

export interface IRate {
    bnbRate: number;
}

export enum TOKEN {
    BNB = 'BNB',
    USDT = 'USDT'
}

export interface IPackage {
    key: string,
    name: string,
    amount: number,
    icon: string,
    bg: string,
    token: TOKEN,
}

export interface IMenu {
    name: string;
    url: string;
}

export interface IAttribute {
    trait_type: string;
    value: string | number;
}

export interface INftItem {
    id: number;
    name?: string;
    description?: string;
    image: string;
    attributes?: IAttribute[];
    //Listing
    price?: number;
    author?: string;
}


export enum Clarity {
    "Uncommon",
    "Common",
    "Rare",
    "Epic",
}
export type ActionType = "LIST" | "UNLIST" | "TRANSFER" | "AUCTION";


export interface IAuctionInfo extends INftItem {
    auctionId: number;
    auctioneer: string;
    tokenId: number;
    initialPrice: number;
    previousBidder: string;
    lastBid: number;
    lastBidder: string;
    startTime: number;
    endTime: number;
    completed: boolean;
    active: boolean;
}

export interface IUser {
    gameBalance: number;
    name: string;
    avatar: string;
    address: string;
}
