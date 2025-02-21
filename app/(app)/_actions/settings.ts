"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUserName(userId: string, name: string) {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { 
        name: name
      },
    });
    revalidatePath("/app");
    return user;
  } catch (error) {
    console.error("Failed to update user name:", error);
    throw new Error("Failed to update user name");
  }
}
