import { IWalletInfo } from "@/_types_"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ethers } from "ethers";

export interface AccountState {
  wallet?: IWalletInfo;
  web3Provider?: ethers.BrowserProvider;
  token?: string;
}

const initialState: AccountState = {}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setWeb3Provider: (state, action: PayloadAction<ethers.BrowserProvider>) => {      
      state.web3Provider = action.payload;
    },
    setWalletInfo: (state, action: PayloadAction<IWalletInfo>) => {
      state.wallet = action.payload;
    },  
    setToken: (state, action: PayloadAction<string>) => { // Action để lưu token JWT
      state.token = action.payload;
    },
  },
})

export const { setWalletInfo, setWeb3Provider, setToken } = accountSlice.actions;
export default accountSlice.reducer;