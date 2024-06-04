const express = require('express');
const router = express.Router();
const { User } = require('../models')
const dotenv = require("dotenv").config()
const { ethers } = require('ethers');
const {abiToken, abiNft, contractNftAddress, contractTokenAddress } = require("../config/index")

const {verifyToken} = require('../controllers/authMiddleware');

const provider = new ethers.JsonRpcProvider('https://bsc-testnet-dataseed.bnbchain.org');
const privateKey = process.env.PRIVATE_KEY;

const singer = new ethers.Wallet(privateKey, provider);
const contractToken = new ethers.Contract(contractTokenAddress, abiToken, singer);
const contractNft = new ethers.Contract(contractNftAddress, abiNft, singer);

// Get User
router.get('/', verifyToken, async (req, res) => {
    try {
        // Lấy thông tin người dùng từ cơ sở dữ liệu dựa trên ID
        const user = await User.findById(req.userId);

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const {password, ...others} = user._doc
        res.status(200).json(
            others
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Update User In4
router.put('/', verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Transfer token vs balance
router.post('/transfer', verifyToken, async (req, res) => {
    
    try {
        const { amount } = req.body;

        // // Kiểm tra xem số dư của người dùng có đủ để chuyển không
        // const userBalance = await contract.balanceOf(singer.address)
        
        // if (userBalance < amount) {
        //     return res.status(400).json({ error: 'Insufficient balance' });
        // }

        // // Thực hiện giao dịch chuyển token
        // const transaction = await contract.transfer(vaultAddress, ethers.parseEther(amount));
        // await transaction.wait();

        // Cập nhật số dư tiền game của người dùng
        const updatedUser = await User.findByIdAndUpdate(req.userId, { $inc: { gameBalance: amount } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Tokens transferred successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/convert', verifyToken, async (req, res) => {
    try {
        const { to,amount } = req.body;

        // Kiểm tra xem số dư tiền game của người dùng có đủ để chuyển không
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.gameBalance < amount) {
            return res.status(400).json({ error: 'Insufficient game balance' });
        }

        // Cập nhật số dư tiền game của người dùng
        const updatedUser = await User.findByIdAndUpdate(req.userId, { $inc: { gameBalance: -amount } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        //Chuyển token
        const transaction = await contractToken.transfer(to, ethers.parseEther(amount));
        await transaction.wait();

        res.status(200).json({ message: 'Tokens converted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/mint', verifyToken, async (req, res) => {
    try {
        const { level, time, to } = req.body;

        // Kiểm tra time < 45s và level >= 5
        if (time < 45 && level >= 5) {
            // Hàm random lấy số ngẫu nhiên từ 1 đến 5
            const getRandomNumber = (min, max) => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };

            // Mint token
            const randomValue = getRandomNumber(1, 5);
            const transaction = await contractNft.mint(to, randomValue);
            await transaction.wait();

            res.status(200).json({ message: 'Mint Token successfully' });
        } else {
            res.status(400).json({ error: 'Invalid level or time' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;