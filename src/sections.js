import { useEffect, useRef, useState } from 'react';
import { newTab } from './icons';

const asset = (p) => `${process.env.PUBLIC_URL}${p}`;

// Load a JSON file from /public/data at runtime (same-origin, no CORS).
function useData(file, fallback) {
  const [data, setData] = useState(fallback);
  useEffect(() => {
    let alive = true;
    fetch(asset(`/data/${file}`))
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [file]);
  return data;
}

// Numbered magazine section header (kept in sync with App.js MagHead).
function MagHead({ title }) {
  return (
    <div className="mag-head">
      <h2 className="mag-title">{title}</h2>
      <span className="mag-rule" />
    </div>
  );
}

// Fade + rise a section into view the first time it's scrolled to.
function Reveal({ children, className = '', id }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section id={id} ref={ref} className={`section ${className} reveal ${shown ? 'reveal-in' : ''}`}>
      {children}
    </section>
  );
}

function PostCard({ post, featured }) {
  return (
    <a
      className={featured ? "post-feature" : "post-card"}
      href={post.link}
      target="_blank"
      rel="noreferrer"
    >
      {post.image && (
        <div className="post-thumb" style={{ backgroundImage: `url("${post.image}")` }} />
      )}
      <div className="post-body">
        <div className="post-date">{post.date}</div>
        <div className="post-title">{post.title}</div>
        <div className="post-subtitle">{post.subtitle}</div>
        {featured && <span className="post-more">Read the post {newTab}</span>}
      </div>
    </a>
  );
}

export function Writing() {
  const { posts } = useData('substack.json', { posts: [] });
  if (!posts.length) return null;
  const [featured, ...rest] = posts;
  return (
    <Reveal id="writing">
      <MagHead title="Writing" />
      <div className="section-sub">
        Recent posts from{' '}
        <a href="https://jainmansi.substack.com" target="_blank" rel="noreferrer">
          Et cetera, et cetera
        </a>
      </div>
      <PostCard post={featured} featured />
      {rest.length > 0 && (
        <div className="post-grid">
          {rest.map((p) => (
            <PostCard key={p.link} post={p} />
          ))}
        </div>
      )}
      <div className="section-cta">
        <a href="https://jainmansi.substack.com" target="_blank" rel="noreferrer">
          Read more on Substack {newTab}
        </a>
      </div>
    </Reveal>
  );
}

function Book({ book }) {
  return (
    <a className="book" href={book.link} target="_blank" rel="noreferrer" title={`${book.title} — ${book.author}`}>
      {book.image ? (
        <img className="book-cover" src={book.image} alt={book.title} loading="lazy" />
      ) : (
        <div className="book-cover book-cover--empty">{book.title}</div>
      )}
      <div className="book-meta">
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>
      </div>
    </a>
  );
}

export function Reading() {
  const { current, read } = useData('goodreads.json', { current: [], read: [] });
  if (!current.length && !read.length) return null;
  return (
    <Reveal id="reading" className="reading-section">
      <MagHead title="Reading" />
      {current.length > 0 && (
        <>
          <div className="shelf-label">Currently reading</div>
          <div className="shelf">
            {current.map((b) => (
              <Book key={b.link} book={b} />
            ))}
          </div>
        </>
      )}
      {read.length > 0 && (
        <>
          <div className="shelf-label">Recently finished</div>
          <div className="shelf">
            {read.map((b) => (
              <Book key={b.link} book={b} />
            ))}
          </div>
        </>
      )}
      <div className="section-cta">
        <a
          href="https://www.goodreads.com/user/show/142953896-mansi-jain"
          target="_blank"
          rel="noreferrer"
        >
          Full bookshelf on Goodreads {newTab}
        </a>
      </div>
    </Reveal>
  );
}
