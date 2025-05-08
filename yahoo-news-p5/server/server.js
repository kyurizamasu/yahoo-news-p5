const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');

const app = express();
const parser = new RSSParser();
const PORT = 3000;

app.use(cors());

// ✅ ここで複数カテゴリのRSSを指定
const feedUrls = [
  'https://news.yahoo.co.jp/rss/topics/top-picks.xml',
  'https://news.yahoo.co.jp/rss/topics/business.xml',
  'https://news.yahoo.co.jp/rss/topics/it.xml',
  'https://news.yahoo.co.jp/rss/topics/world.xml',
  'https://news.yahoo.co.jp/rss/topics/science.xml',
  'https://news.yahoo.co.jp/rss/topics/sports.xml'
];

app.get('/news', async (req, res) => {
  try {
    let allTitles = [];
    for (const url of feedUrls) {
      const feed = await parser.parseURL(url);
      const titles = feed.items.map(item => item.title);
      allTitles = allTitles.concat(titles);
    }

    // 重複を排除し、最大50件まで返す
    res.json(allTitles.slice(0, 50));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.get('/news', async (req, res) => {
  try {
    let allTitles = [];
    for (const url of feedUrls) {
      console.log(`🔄 Fetching: ${url}`); // ←追加！
      const feed = await parser.parseURL(url);
      const titles = feed.items.map(item => item.title);
      allTitles = allTitles.concat(titles);
    }
    console.log(`✅ Total headlines: ${allTitles.length}`); // ←追加！
    res.json(allTitles.slice(0, 50));
  } catch (err) {
    console.error('❌ RSS取得失敗:', err); // ←詳細ログ
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});
