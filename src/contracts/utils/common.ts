export type AddressType = {
    97: string;
    56: string;
}

export enum CHAIN_ID {
    TESTNET = 97,
    MAINNET = 56,
}

export default function getChainIdFromEnv(): number {
    const env = process.env.NEXT_PUBLIC_CHAIN_ID;
    if (!env) { return 97; }
    return parseInt(env);
}


export const getRPC = () => {
    if (getChainIdFromEnv() === CHAIN_ID.MAINNET)
        return process.env.NEXT_PUBLIC_RPC_MAINNET;
    return process.env.NEXT_PUBLIC_RPC_TESTNET;
}
export const SMART_ADDRESS = {
    CROWD_SALE: { 97: '0x8b00CF02Af8bd80864FbcD9b53ab3dbD6D3977f5', 56: '' },
    NFT: { 97: '0xd3B577699F971A032353D038dF81ebabB27860a4', 56: '' },
    MARKET: { 97: '0xe6cDa6fEFA584276F2d268248Ab991F0B5Ad9558', 56: '' },
    AUCTION: { 97: '0xD86E213749fc230C5B6F8267733B0F16641126F1', 56: '' },
    UDA: { 97: '0x478F8E6D2eCb59fB2445986743a8C2A60220a665', 56: '' },
}