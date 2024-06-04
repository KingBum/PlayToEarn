const fs = require('fs');
const path = require('path');

// Đường dẫn tới thư mục chứa các tệp ảnh
const folderPath = 'D:/ProjectDATN/Tu/CollectionNFT';

// // Đọc danh sách các tệp trong thư mục
// fs.readdir(folderPath, (err, files) => {
//     if (err) {
//         console.error('Error reading directory:', err);
//         return;
//     }

//     // Lặp qua từng tệp trong danh sách
//     files.forEach((file, index) => {
//         // Lấy phần mở rộng của tệp
//         const ext = path.extname(file);
//         // Tạo tên mới cho tệp dựa trên số thứ tự (bắt đầu từ 1)
//         const newFileName = `${index + 1}${ext}`;
//         // Tạo đường dẫn mới cho tệp
//         const newPath = path.join(folderPath, newFileName);
//         // Đổi tên tệp
//         fs.rename(path.join(folderPath, file), newPath, (err) => {
//             if (err) {
//                 console.error(`Error renaming ${file}:`, err);
//             } else {
//                 console.log(`Renamed ${file} to ${newFileName}`);
//             }
//         });
//     });
// });


// Function to generate a random integer within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random string of given length
const arrayName = [
    "Luna", "Milo", "Bella", "Max", "Daisy", "Charlie", "Lucy", "Rocky",
    "Molly", "Tucker", "Sadie", "Duke", "Zoe", "Bear", "Lily", "Jack",
    "Ruby", "Cooper", "Rosie", "Bentley", "Abby", "Oliver", "Sophie", "Harley",
    "Chloe", "Gus", "Zoey", "Sam", "Penny", "Finn", "Maya", "Oscar"
];

// Array of possible trait_type values
const traitTypes = ["Uncommon", "Common", "Epic", "Rare", "Special"];

// Function to generate a random JSON object similar to the sample
function generateRandomJSONObject(index) {
    const name = arrayName[index];
    const description = `${name}is a delightful little hero with a heart as sweet as its name. This tiny creature brings joy and warmth wherever it goes. ${name} is known for its unwavering loyalty and the ability to spread positivity in the most enchanting ways. Its small stature hides a mighty spirit, making ${name} an unexpected but cherished hero.`;
    const image = `https://plum-wooden-rattlesnake-570.mypinata.cloud/ipfs/QmWAuzvRGTCbQF15HtvT6bGv7HiiU3PaXF9FpirJALgCJf/${index + 1}.png`;
    const attributes = [
        { "display_type": "string", "trait_type": "Size", "value": "Petite" },
        { "display_type": "string", "trait_type": "Personality", "value": "Cheerful" },
        { "display_type": "string", "trait_type": "Rarity", "value": traitTypes[getRandomInt(0, traitTypes.length - 1)] },
        { "display_type": "number", "trait_type": "Power", "value": getRandomInt(1, 10), "max_value": 10 },
        { "display_type": "number", "trait_type": "Speed", "value": getRandomInt(1, 10), "max_value": 10 },
        { "display_type": "boost_percentage", "trait_type": "Control", "value": getRandomInt(1, 100) },
        { "trait_type": "Original", "value": Math.random() < 0.5 ? "True" : "False" },
        { "trait_type": "Upgradable", "value": Math.random() < 0.5 ? "True" : "False" }
    ];
    return { name, description, image, attributes };
}

// Function to create a JSON file with random content
function createRandomJSONFile(index) {
    const content = JSON.stringify(generateRandomJSONObject(index), null, 4);
    const fileName = `${index + 1}.json`;
    const filePath = path.join(__dirname, fileName);

    fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(`Error writing file ${fileName}: ${err}`);
        } else {
            console.log(`File ${fileName} created successfully.`);
        }
    });
}

// Create 32 JSON files
for (let i = 0; i < 32; i++) {
    createRandomJSONFile(i);
}
