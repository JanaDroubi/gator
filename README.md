# 🐊 Gator CLI – RSS Feed Aggregator

<div align="center">

**Your terminal's personal RSS newsroom**  
Follow, fetch, and browse feeds – all without leaving the command line.

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-8A2BE2?style=for-the-badge&logo=postgresql&logoColor=white)](https://orm.drizzle.team)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

**Multi-user • Continuous background fetching • CLI-first • Boot.dev certified**

</div>

---

## ✨ Features

- 👥 **Multi-user support** – Each user has their own feed following
- 📡 **Follow any RSS feed** – Just paste the URL
- 🔄 **Continuous background aggregation** – Configurable fetch intervals
- 📚 **Browse recent posts** – See what's new from feeds you follow
- 🗄️ **PostgreSQL + Drizzle ORM** – Type-safe database operations
- 🎯 **Many-to-many feed-follow system** – Users can share feeds, follow independently
- ⏱️ **Safe fetching** – Respects server load with configurable delays

---

## 🚀 Quick Start

### 1. Clone & install

```bash
git clone https://github.com/JanaDroubi/gator.git
cd gator
npm install
```

### 2. Setup PostgreSQL

```bash
# Start PostgreSQL locally
psql -U postgres

# Create database
CREATE DATABASE gator;

# Connect to it
\c gator

# Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

# Exit
\q
```

### 3. Configure

Create `config.json` in the root:

```json
{
  "dbUrl": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable"
}
```

### 4. Initialize database

```bash
npm run db:generate
npm run db:migrate
```

---

## 📖 CLI Commands

### 🔄 Database management
```bash
# Reset everything (users, feeds, posts)
npx tsx src/index.ts reset
```

### 👤 User management
```bash
# Register a new user
npx tsx src/index.ts register jana

# List users (coming soon)
```

### 📰 Feed management
```bash
# Add a new feed (auto-follows for current user)
npx tsx src/index.ts addfeed "TechCrunch" "https://techcrunch.com/feed/"

# Follow an existing feed
npx tsx src/index.ts follow "https://techcrunch.com/feed/"

# See all feeds you follow
npx tsx src/index.ts following

# Unfollow a feed (coming soon)
```

### 🔁 Aggregation
```bash
# Fetch posts every 5 minutes
npx tsx src/index.ts agg 5m

# Fetch every 30 seconds
npx tsx src/index.ts agg 30s

# Fetch once (coming soon)
```

Press `Ctrl+C` to stop the aggregator.

### 📖 Browsing
```bash
# Show 5 most recent posts
npx tsx src/index.ts browse 5

# Show 10 most recent posts
npx tsx src/index.ts browse 10

# Default: 2 posts
npx tsx src/index.ts browse
```

---

## 🧪 Recommended Feeds for Testing

| Feed | URL |
|------|-----|
| **TechCrunch** | `https://techcrunch.com/feed/` |
| **Hacker News** | `https://news.ycombinator.com/rss` |
| **Boot.dev Blog** | `https://blog.boot.dev/index.xml` |
| **Ars Technica** | `https://feeds.arstechnica.com/arstechnica/index` |
| **Smashing Magazine** | `https://www.smashingmagazine.com/feed/` |

---

## 📦 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Runtime | Node.js 20+ | JavaScript runtime |
| Language | TypeScript 5 | Type safety |
| CLI | Commander (optional) | Command parsing |
| Database | PostgreSQL 14+ | Persistent storage |
| ORM | Drizzle ORM | Type-safe queries |
| RSS Parser | `rss-parser` | Feed fetching |
| Migration | Drizzle Kit | Schema versioning |

---

## 📁 Project Structure

```
gator/
├── src/
│   ├── index.ts           # CLI entry point
│   ├── commands/          # Command implementations
│   │   ├── register.ts
│   │   ├── addfeed.ts
│   │   ├── follow.ts
│   │   ├── following.ts
│   │   ├── agg.ts
│   │   ├── browse.ts
│   │   └── reset.ts
│   ├── db/                # Database layer
│   │   ├── schema.ts      # Drizzle schema
│   │   └── client.ts      # DB connection
│   ├── models/             # Business logic
│   │   ├── user.ts
│   │   ├── feed.ts
│   │   └── post.ts
│   ├── rss/               # RSS fetching
│   │   └── parser.ts
│   └── utils/             # Helpers
│       ├── config.ts
│       └── time.ts
├── migrations/            # Drizzle migrations
├── config.json            # User config
├── drizzle.config.ts      # Drizzle config
├── package.json
└── README.md
```

---

## 🔧 Development

```bash
# Run in dev mode with hot reload
npm run dev

# Generate migrations (after schema changes)
npm run db:generate

# Apply migrations
npm run db:migrate

# Build for production
npm run build

# Run production build
npm run start
```



---

## 📝 Environment Variables / Config

| Key | Required | Description | Example |
|-----|----------|-------------|---------|
| `dbUrl` | ✅ | PostgreSQL connection string | `postgres://postgres:postgres@localhost:5432/gator?sslmode=disable` |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📜 License

MIT © [Jana Droubi](https://github.com/JanaDroubi)

---
