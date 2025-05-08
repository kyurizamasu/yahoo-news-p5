const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const parser = new RSSParser();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ クライアントを静的ファイルとして配信
app.use(express.static(path.join(__dirname, '..', 'client')));

// ✅ APIエンドポイント
const feedUrls = [
  'https://news.yahoo.co.jp/rss/topics/top-picks.xml',
  'https://news.yahoo.co.jp/rss/topics/business.xml',
  'https://news.yahoo.co.jp/rss/topics/it.xml',
  'https://news.yahoo.co.jp/rss/topics/world.xml',
  'https://news.yahoo.co.jp/rss/topics/science.xml',
  'https://news.yahoo.co.jp/rss/topics/sports.xml'
];

app.get('/api/news', async (req, res) => {
  try {
    let allTitles = [];
    for (const url of feedUrls) {
      const feed = await parser.parseURL(url);
      const titles = feed.items.map(item => item.title);
      allTitles = allTitles.concat(titles);
    }
    res.json({ headlines: allTitles.slice(0, 50) });
  } catch (err) {
    console.error('❌ RSS取得失敗:', err);
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});

// ✅ すべてのルートでindex.htmlを返す（クライアントサイドルーティング対応）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
