
# 🐊 Gator CLI

Gator is a command-line RSS feed aggregator that lets you follow feeds, fetch posts, and browse them—all from your terminal. It’s perfect for developers and power users who want to track multiple feeds efficiently without leaving the CLI.

---

## Features

* Follow any RSS feed by URL.
* Store feeds in a database with user-specific following.
* Aggregate posts from all followed feeds.
* Browse recent posts from the feeds you follow.
* Continuous background fetching with configurable intervals.
* Handles multiple users with a many-to-many feed-follow system.

---

## Requirements

* Node.js >= 20
* PostgreSQL >= 14
* npm (or yarn)

---

## Installation

```bash
git clone https://github.com/JanaDroubi/gator.git
cd gator
npm install
```

---

## Database Setup

1. Start PostgreSQL locally.
2. Create a database called `gator`:

```bash
psql -U postgres
CREATE DATABASE gator;
\q
```

3. Ensure `pgcrypto` extension is installed for UUID generation:

```bash
psql -U postgres -d gator
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
\q
```

---

## Configuration

Create a `config.json` in the root directory:

```json
{
  "dbUrl": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable"
}
```

---

## CLI Usage

### Reset the database

```bash
npx tsx src/index.ts reset
```

### Register a user

```bash
npx tsx src/index.ts register <username>
```

### Add a feed

```bash
npx tsx src/index.ts addfeed "Feed Name" "https://example.com/rss"
```

Automatically follows the feed for the user adding it.

### Follow an existing feed

```bash
npx tsx src/index.ts follow "https://example.com/rss"
```

### See feeds you follow

```bash
npx tsx src/index.ts following
```

### Aggregate posts from feeds (continuous loop)

```bash
npx tsx src/index.ts agg 1m
```

* Fetches posts from your followed feeds every `1m` (1 minute).
* Supports durations like `1s`, `5m`, `1h`.
* Stop with `Ctrl+C`.

### Browse recent posts

```bash
npx tsx src/index.ts browse 5
```

* Shows the latest 5 posts (default: 2) from feeds you follow.

---

## Recommended Feeds for Testing

* TechCrunch: `https://techcrunch.com/feed/`
* Hacker News: `https://news.ycombinator.com/rss`
* Boot.dev Blog: `https://blog.boot.dev/index.xml`

---

## Development

* Tables are managed with Drizzle ORM.
* Feed follows are stored in a many-to-many relationship for multi-user support.
* Posts are stored in the `posts` table with published timestamps.
* Aggregator runs in a safe loop to avoid overloading servers.

---

## Contributing

1. Fork the repo.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT © [Jana Droubi](https://github.com/JanaDroubi)

