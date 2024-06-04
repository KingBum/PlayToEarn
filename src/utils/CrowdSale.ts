import { TransactionResponse, ethers } from "ethers";
import { _numberToEth, _toNumber, handleTransactionResponse } from ".";

// Hàm độc lập để lấy tỷ giá BNB
export const getBnbRate = async (contract: ethers.Contract): Promise<number> => {
    let rate = await contract.BNB_rate();
    //@ts-ignore
    return _toNumber(rate);
};

// Hàm độc lập để lấy tỷ giá USDT
export const getUsdtRate = async (contract: ethers.Contract): Promise<number> => {
    const rate = await contract.USDT_rate();
    //@ts-ignore
    return _toNumber(rate);
};

// Hàm độc lập để mua token bằng BNB
export const buyTokenByBNB = async (contract: ethers.Contract, amount: number) => {
    const rate = await getBnbRate(contract);
    const tx: TransactionResponse = await contract.buyTokenByBNB({
        //@ts-ignore
        ..._option,
        value: _numberToEth(amount / rate),
    });
    return handleTransactionResponse(tx);
};

// Hàm độc lập để mua token bằng USDT
export const buyTokenByUSDT = async (contract: ethers.Contract, amount: number) => {
    const rate = await getUsdtRate(contract);
    const tx: TransactionResponse = await contract.buyTokenByUSDT(
        _numberToEth(amount / rate),
        //@ts-ignore
        _option
    );
    return handleTransactionResponse(tx);
};
