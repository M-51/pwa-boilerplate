const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static('server/static'));
app.use('/', express.static('server/worker'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/index.html'));
});
app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, './html/page1.html'));
});
app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, './html/page2.html'));
});

app.get('/api/', (req, res) => {
    res.json({ content: 'index content', title: 'index', path: '/' });
});
app.get('/api/page1', (req, res) => {
    res.json({ content: 'page 1 content', title: 'page 1', path: '/page1' });
});
app.get('/api/page2', (req, res) => {
    res.json({ content: 'page 2 content', title: 'page2', path: '/page2' });
});

app.listen(3000, () => console.log('Listening on port 3000!'));
