"use server";

import { signIn, signOut } from "@/lib/auth";

export async function SocialSignIn(formData: any) {
  const action = formData.get("action");

  await signIn(action, { redirectTo: "/" });
}

