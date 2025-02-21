"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

async function isAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function getUsers() {
  if (!await isAdmin()) {
    throw new Error("Unauthorized");
  }

  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function updateUserRole(userId: string, role: "ADMIN" | "USER") {
  if (!await isAdmin()) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { 
        role: role
      },
    });
    revalidatePath("/app");
    return user;
  } catch (error) {
    console.error("Failed to update user role:", error);
    throw new Error("Failed to update user role");
  }
}

export async function deleteUser(userId: string) {
  if (!await isAdmin()) {
    throw new Error("Unauthorized");
  }

  try {
    await db.user.delete({
      where: { id: userId },
    });
    revalidatePath("/app");
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }
}
