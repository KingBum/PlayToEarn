import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
    await Config.initConfig();
    const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();
    console.log('deploy from address: ', deployer.address);

    // const PetToken = await ethers.getContractFactory("PetToken");
    // const petToken = await PetToken.deploy();
    // console.log('PetToken address: ', petToken.address);
    // Config.setConfig(network + '.PetToken', petToken.address);

    // const Bank = await ethers.getContractFactory("Bank");
    // const bank = await Bank.deploy();
    // console.log('Bank address: ', bank.address);
    // Config.setConfig(network + '.Bank', bank.address);


    const PETICO = await ethers.getContractFactory("PETICO");
    const petico = await PETICO.deploy(100000,'0x3f75b37F3553e890fB81087ee47df3F883ee451b', '0x478F8E6D2eCb59fB2445986743a8C2A60220a665');
    console.log('PETICO address: ', petico.address);
    Config.setConfig(network + '.PETICO', petico.address);

    
    // const Pet = await ethers.getContractFactory("Pet");
    // const pet = await Pet.deploy();
    // console.log('Pet address: ', pet.address);
    // Config.setConfig(network + '.Pet', pet.address);


    const PetShopee = await ethers.getContractFactory("PetShopee");
    const petshopee = await PetShopee.deploy("0x478F8E6D2eCb59fB2445986743a8C2A60220a665", "0xd3B577699F971A032353D038dF81ebabB27860a4");
    console.log('PetShopee deployed at: ', petshopee.address);
    Config.setConfig(network + '.PetShopee', petshopee.address);

    const Auction = await ethers.getContractFactory("Auction");
    const auction = await Auction.deploy("0x478F8E6D2eCb59fB2445986743a8C2A60220a665", "0xd3B577699F971A032353D038dF81ebabB27860a4");
    console.log('Auction deployed at: ', auction.address);
    Config.setConfig(network + '.Auction', auction.address);

    // await Config.updateConfig();
    
}

main().then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
});