import { readConfig } from "../config";
import { createFeed } from "../lib/db/queries/feeds";
import { getUser, getUsers } from "../lib/db/queries/users";
import { createFeedFollow } from "../lib/db/queries/feedFollows";
import { Feed, User } from "../lib/db/schema";

// Print feed helper
function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

// ────────────────────────────────────────────────
// addfeed <name> <url> - create a new feed
// ────────────────────────────────────────────────
export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <feed_name> <url>`);
  }

  const config = readConfig();
  const currentUser = await getUser(config.currentUserName);
  if (!currentUser) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const [feedName, url] = args;

  // Create feed
  const feed = await createFeed(feedName, url, currentUser.id);
  if (!feed) throw new Error(`Failed to create feed`);

  console.log("Feed created successfully:");
  printFeed(feed, currentUser);

  // ───────────── Auto-follow logic ─────────────
  // Current user automatically follows
  await createFeedFollow(currentUser.id, feed.id).catch(() => {});

  // All other users also follow the feed
  const allUsers = await getUsers();
  for (const user of allUsers) {
    if (user.id !== currentUser.id) {
      await createFeedFollow(user.id, feed.id).catch(() => {});
    }
  }

  console.log("\nAll users are now following this feed automatically.");
}
