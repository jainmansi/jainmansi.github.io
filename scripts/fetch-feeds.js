/**
 * Fetches Substack + Goodreads RSS feeds and writes them as small JSON files
 * into public/data/. Runs at build time (locally and in CI) so the static
 * site can read the data same-origin with no CORS and no API keys.
 *
 * Run: node scripts/fetch-feeds.js
 */
const fs = require('fs');
const path = require('path');

const SUBSTACK_FEED = 'https://jainmansi.substack.com/feed';
const GOODREADS_USER = '142953896';
const GOODREADS_READ = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER}?shelf=read`;
const GOODREADS_CURRENT = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER}?shelf=currently-reading`;

const OUT_DIR = path.join(__dirname, '..', 'public', 'data');

// ---- tiny RSS helpers -------------------------------------------------------

// Split a feed into its <item>...</item> blocks.
function items(xml) {
  return (xml.match(/<item>[\s\S]*?<\/item>/g) || []);
}

// Pull the text of the first <tag>...</tag>, unwrapping CDATA and decoding
// the handful of entities these feeds actually use.
function tag(block, name) {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'));
  if (!m) return '';
  let v = m[1].trim();
  const cdata = v.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) v = cdata[1].trim();
  return decode(v);
}

// Pull an attribute value from a self-closing tag, e.g. <enclosure url="...">.
function attr(block, name, attribute) {
  const m = block.match(new RegExp(`<${name}[^>]*\\b${attribute}="([^"]*)"`, 'i'));
  return m ? decode(m[1]) : '';
}

function decode(s) {
  return s
    .replace(/&#8217;|&#8216;/g, '’')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/<[^>]+>/g, '') // strip any stray html
    .trim();
}

function fmtDate(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

async function get(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (portfolio-feed-fetcher)' },
  });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

// ---- feed parsers -----------------------------------------------------------

async function substack() {
  const xml = await get(SUBSTACK_FEED);
  return items(xml).slice(0, 6).map((b) => ({
    title: tag(b, 'title'),
    subtitle: tag(b, 'description'),
    link: tag(b, 'link'),
    date: fmtDate(tag(b, 'pubDate')),
    image: attr(b, 'enclosure', 'url'),
  }));
}

async function goodreadsShelf(url, limit) {
  const xml = await get(url);
  return items(xml).slice(0, limit).map((b) => ({
    title: tag(b, 'title'),
    author: tag(b, 'author_name'),
    link: tag(b, 'link'),
    image: tag(b, 'book_large_image_url') || tag(b, 'book_image_url'),
    rating: Number(tag(b, 'user_rating')) || 0,
  }));
}

// ---- main -------------------------------------------------------------------

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Each feed is fetched independently; a failure in one shouldn't wipe the
  // other's existing data, so we fall back to whatever is already on disk.
  await write('substack.json', substack, { posts: [] });
  await write('goodreads.json', async () => ({
    current: await goodreadsShelf(GOODREADS_CURRENT, 4),
    read: await goodreadsShelf(GOODREADS_READ, 8),
  }), { current: [], read: [] });
}

async function write(file, producer, empty) {
  const dest = path.join(OUT_DIR, file);
  try {
    const data = await producer();
    const payload = Array.isArray(data) ? { posts: data } : data;
    fs.writeFileSync(dest, JSON.stringify(payload, null, 2));
    console.log(`wrote ${file}`);
  } catch (err) {
    console.error(`failed ${file}: ${err.message}`);
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, JSON.stringify(empty, null, 2));
    process.exitCode = 0; // don't fail the build over a flaky feed
  }
}

main();
