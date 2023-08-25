const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const galleryPath = path.join(process.cwd(), 'randomphotos', 'gallery');

    try {
        // Read the file names in the gallery directory
        const fileNames = fs.readdirSync(galleryPath);

        // Shuffle the file names
        const shuffledFileNames = shuffleArray(fileNames);

        // Construct the JSON response
        const jsonResponse = shuffledFileNames.map(fileName => ({
            url: `https://img.wotemo.com/randomphotos/gallery/${fileName}`
        }));

        // Send the JSON response
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(jsonResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
