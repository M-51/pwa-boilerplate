const express = require('express');
const fs = require('fs');
const { promisify } = require('util');

const app = express();

app.use('/static', express.static('server/static'));
app.use('/', express.static('server/worker'));
app.set('views', 'server/views');
app.set('view engine', 'ejs');

const readFile = promisify(fs.readFile);
async function getJson(file) {
    const data = await readFile(`server/json/${file}.json`, { encoding: 'utf8' });
    return JSON.parse(data);
}

app.get('/api/', (req, res) => {
    getJson('home').then((json) => {
        res.json(json);
    }, () => {
        res.status(404).end();
    });
});
app.get('/api/:json', (req, res) => {
    getJson(req.params.json).then((json) => {
        res.json(json);
    }, () => {
        res.status(404).end();
    });
});

app.get('/', (req, res) => {
    getJson('home').then((json) => {
        res.render('base', json);
    }, () => {
        res.status(404).end();
    });
});

app.get('/:page', (req, res) => {
    getJson(req.params.page).then((json) => {
        res.render('base', json);
    }, () => {
        res.status(404).end();
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'));
