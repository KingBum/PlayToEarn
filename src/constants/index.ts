import { IMenu, IPackage, TOKEN } from "@/_types_";

export const packages: IPackage[] = [
  {
    key: 'bnb-01',
    name: 'BNB PACKAGE 01',
    amount: 1000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-02',
    name: 'BNB PACKAGE 02',
    amount: 2000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-03',
    name: 'BNB PACKAGE 03',
    amount: 3000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },
  
]

export const menus: IMenu[] = [
  {name: 'Invest', url: '/'},
  {name: 'Market', url: '/market'},
  { name: 'P2P', url: '/p2p' },
  { name: 'Auction', url: '/auction' },
  {name: 'Game', url: '/game'},
]