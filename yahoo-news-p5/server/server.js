const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');

const app = express();
const parser = new RSSParser();
const PORT = 3000;

app.use(cors());

app.get('/news', async (req, res) => {
  try {
    const feed = await parser.parseURL('https://news.yahoo.co.jp/rss/topics/top-picks.xml');
    const titles = feed.items.map(item => item.title);
    res.json(titles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
