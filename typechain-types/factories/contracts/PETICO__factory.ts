/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { PETICO, PETICOInterface } from "../../contracts/PETICO";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bnb_rate",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "wallet",
        type: "address",
      },
      {
        internalType: "contract IERC20",
        name: "icotoken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BuyTokenByBNB",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newRate",
        type: "uint256",
      },
    ],
    name: "SetBNBRate",
    type: "event",
  },
  {
    inputs: [],
    name: "BNB_rate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_wallet",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTokenByBNB",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "BNBAmount",
        type: "uint256",
      },
    ],
    name: "getTokenAmountBNB",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "new_rate",
        type: "uint256",
      },
    ],
    name: "setBNBRate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620015cb380380620015cb8339818101604052810190620000379190620002b3565b620000576200004b620000e960201b60201c565b620000f160201b60201c565b8260028190555081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050506200030f565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b6000819050919050565b620001cf81620001ba565b8114620001db57600080fd5b50565b600081519050620001ef81620001c4565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200022282620001f5565b9050919050565b620002348162000215565b81146200024057600080fd5b50565b600081519050620002548162000229565b92915050565b60006200026782620001f5565b9050919050565b60006200027b826200025a565b9050919050565b6200028d816200026e565b81146200029957600080fd5b50565b600081519050620002ad8162000282565b92915050565b600080600060608486031215620002cf57620002ce620001b5565b5b6000620002df86828701620001de565b9350506020620002f28682870162000243565b925050604062000305868287016200029c565b9150509250925092565b6112ac806200031f6000396000f3fe6080604052600436106100915760003560e01c8063715018a611610059578063715018a6146101365780638da5cb5b1461014d578063acb03d4314610178578063f2fde38b146101b5578063fc0c546a146101de57610091565b8063157fc821146100965780632be86299146100c157806331927737146100ea5780633ccfd60b146100f4578063610757e41461010b575b600080fd5b3480156100a257600080fd5b506100ab610209565b6040516100b89190610aba565b60405180910390f35b3480156100cd57600080fd5b506100e860048036038101906100e39190610b06565b61020f565b005b6100f2610258565b005b34801561010057600080fd5b506101096104c7565b005b34801561011757600080fd5b50610120610518565b60405161012d9190610b74565b60405180910390f35b34801561014257600080fd5b5061014b61053e565b005b34801561015957600080fd5b50610162610552565b60405161016f9190610bb0565b60405180910390f35b34801561018457600080fd5b5061019f600480360381019061019a9190610b06565b61057b565b6040516101ac9190610aba565b60405180910390f35b3480156101c157600080fd5b506101dc60048036038101906101d79190610bf7565b610592565b005b3480156101ea57600080fd5b506101f3610616565b6040516102009190610c83565b60405180910390f35b60025481565b61021761063c565b806002819055507fb0cc740bbbfcd5af22ee3956c6b44d2d6f499e2a86cb11d915fcce88dca2113a8160405161024d9190610aba565b60405180910390a150565b600034905060006102688261057b565b9050600081116102ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a490610cfb565b60405180910390fd5b80600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016103099190610bb0565b60206040518083038186803b15801561032157600080fd5b505afa158015610335573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103599190610d30565b101561039a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161039190610da9565b60405180910390fd5b813373ffffffffffffffffffffffffffffffffffffffff163110156103f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103eb90610da9565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f1935050505015801561045c573d6000803e3d6000fd5b5061048a600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1633836106ba565b7ff695091b71a5c3ea41510251da89a66470bbcf1ee118f820a1bab8739e29ea5033826040516104bb929190610dc9565b60405180910390a15050565b6104cf61063c565b3373ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610515573d6000803e3d6000fd5b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b61054661063c565b6105506000610740565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60006002548261058b9190610e21565b9050919050565b61059a61063c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561060a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161060190610eed565b60405180910390fd5b61061381610740565b50565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b610644610804565b73ffffffffffffffffffffffffffffffffffffffff16610662610552565b73ffffffffffffffffffffffffffffffffffffffff16146106b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106af90610f59565b60405180910390fd5b565b61073b8363a9059cbb60e01b84846040516024016106d9929190610dc9565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061080c565b505050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600061086e826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166108d39092919063ffffffff16565b90506000815111156108ce578080602001905181019061088e9190610fb1565b6108cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c490611050565b60405180910390fd5b5b505050565b60606108e284846000856108eb565b90509392505050565b606082471015610930576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610927906110e2565b60405180910390fd5b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610959919061117c565b60006040518083038185875af1925050503d8060008114610996576040519150601f19603f3d011682016040523d82523d6000602084013e61099b565b606091505b50915091506109ac878383876109b8565b92505050949350505050565b60608315610a1b57600083511415610a13576109d385610a2e565b610a12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a09906111df565b60405180910390fd5b5b829050610a26565b610a258383610a51565b5b949350505050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600082511115610a645781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a989190611254565b60405180910390fd5b6000819050919050565b610ab481610aa1565b82525050565b6000602082019050610acf6000830184610aab565b92915050565b600080fd5b610ae381610aa1565b8114610aee57600080fd5b50565b600081359050610b0081610ada565b92915050565b600060208284031215610b1c57610b1b610ad5565b5b6000610b2a84828501610af1565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b5e82610b33565b9050919050565b610b6e81610b53565b82525050565b6000602082019050610b896000830184610b65565b92915050565b6000610b9a82610b33565b9050919050565b610baa81610b8f565b82525050565b6000602082019050610bc56000830184610ba1565b92915050565b610bd481610b8f565b8114610bdf57600080fd5b50565b600081359050610bf181610bcb565b92915050565b600060208284031215610c0d57610c0c610ad5565b5b6000610c1b84828501610be2565b91505092915050565b6000819050919050565b6000610c49610c44610c3f84610b33565b610c24565b610b33565b9050919050565b6000610c5b82610c2e565b9050919050565b6000610c6d82610c50565b9050919050565b610c7d81610c62565b82525050565b6000602082019050610c986000830184610c74565b92915050565b600082825260208201905092915050565b7f416d6f756e74206973207a65726f000000000000000000000000000000000000600082015250565b6000610ce5600e83610c9e565b9150610cf082610caf565b602082019050919050565b60006020820190508181036000830152610d1481610cd8565b9050919050565b600081519050610d2a81610ada565b92915050565b600060208284031215610d4657610d45610ad5565b5b6000610d5484828501610d1b565b91505092915050565b7f496e73756666696369656e74206163636f756e742062616c616e636500000000600082015250565b6000610d93601c83610c9e565b9150610d9e82610d5d565b602082019050919050565b60006020820190508181036000830152610dc281610d86565b9050919050565b6000604082019050610dde6000830185610ba1565b610deb6020830184610aab565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610e2c82610aa1565b9150610e3783610aa1565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615610e7057610e6f610df2565b5b828202905092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610ed7602683610c9e565b9150610ee282610e7b565b604082019050919050565b60006020820190508181036000830152610f0681610eca565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610f43602083610c9e565b9150610f4e82610f0d565b602082019050919050565b60006020820190508181036000830152610f7281610f36565b9050919050565b60008115159050919050565b610f8e81610f79565b8114610f9957600080fd5b50565b600081519050610fab81610f85565b92915050565b600060208284031215610fc757610fc6610ad5565b5b6000610fd584828501610f9c565b91505092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e60008201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b600061103a602a83610c9e565b915061104582610fde565b604082019050919050565b600060208201905081810360008301526110698161102d565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f60008201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b60006110cc602683610c9e565b91506110d782611070565b604082019050919050565b600060208201905081810360008301526110fb816110bf565b9050919050565b600081519050919050565b600081905092915050565b60005b8381101561113657808201518184015260208101905061111b565b83811115611145576000848401525b50505050565b600061115682611102565b611160818561110d565b9350611170818560208601611118565b80840191505092915050565b6000611188828461114b565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000600082015250565b60006111c9601d83610c9e565b91506111d482611193565b602082019050919050565b600060208201905081810360008301526111f8816111bc565b9050919050565b600081519050919050565b6000601f19601f8301169050919050565b6000611226826111ff565b6112308185610c9e565b9350611240818560208601611118565b6112498161120a565b840191505092915050565b6000602082019050818103600083015261126e818461121b565b90509291505056fea264697066735822122011272464cb92de9b3d2faee368a579a4d2358e033e3b0572ebe017172c30e71a64736f6c63430008090033";

type PETICOConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PETICOConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PETICO__factory extends ContractFactory {
  constructor(...args: PETICOConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    bnb_rate: PromiseOrValue<BigNumberish>,
    wallet: PromiseOrValue<string>,
    icotoken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PETICO> {
    return super.deploy(
      bnb_rate,
      wallet,
      icotoken,
      overrides || {}
    ) as Promise<PETICO>;
  }
  override getDeployTransaction(
    bnb_rate: PromiseOrValue<BigNumberish>,
    wallet: PromiseOrValue<string>,
    icotoken: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      bnb_rate,
      wallet,
      icotoken,
      overrides || {}
    );
  }
  override attach(address: string): PETICO {
    return super.attach(address) as PETICO;
  }
  override connect(signer: Signer): PETICO__factory {
    return super.connect(signer) as PETICO__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PETICOInterface {
    return new utils.Interface(_abi) as PETICOInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): PETICO {
    return new Contract(address, _abi, signerOrProvider) as PETICO;
  }
}
