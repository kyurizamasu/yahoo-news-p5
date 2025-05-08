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
      console.log(`🔄 フィード取得開始: ${url}`);
      const feed = await parser.parseURL(url);
      console.log(`✅ 件数: ${feed.items.length} from ${feed.title}`);
      const titles = feed.items.map(item => item.title);
      allTitles = allTitles.concat(titles);
    }
    console.log(`🎉 合計見出し数: ${allTitles.length}`);
    res.json(allTitles.slice(0, 50));
  } catch (err) {
    console.error('❌ RSS取得失敗:', err);
    res.status(500).json({ error: 'Failed to fetch RSS' });
  }
});



app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
