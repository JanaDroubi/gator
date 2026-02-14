import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";

// إنشاء مستخدم
export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning();
  return result;
}

// الحصول على مستخدم واحد حسب الاسم
export async function getUserByName(name: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.name, name));
  return user;
}

// حذف كل المستخدمين
export async function deleteAllUsers() {
  await db.delete(users).execute();
}

// الحصول على جميع المستخدمين
export async function getUsers() {
  return await db.select().from(users);
}
