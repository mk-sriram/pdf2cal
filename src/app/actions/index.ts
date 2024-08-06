"use server";

import { signIn, signOut } from "@/auth";

export async function SocialSignIn(formData: any) {
  const action = formData.get("action");
  const redirect = formData.get("redirect");
  await signIn(action, { redirectTo: redirect });
}

export async function SignOut() {
  console.log("SIGNGING OUT");
  await signOut({ redirectTo: "/" });
}
