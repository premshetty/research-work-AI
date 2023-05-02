import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();

// Configure body parser middleware to parse JSON body
app.use(bodyParser.json());

// Define a POST endpoint to save speech data
app.post('/save-speech', (req, res) => {
    try {
        const { body } = req;
        const jsonData = JSON.stringify(body);
        fs.appendFileSync('speeches.jsonl', `${jsonData}\n`);
        res.status(200).send('Speech saved!');
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

// Start the server listening on port 3000
app.listen(
    'https://premshetty-symmetrical-winner-7rqvx44rxjw2rxwp-3000.preview.app.github.dev',
    () => {
        console.log('Server listening on port 3000');
    }
);
