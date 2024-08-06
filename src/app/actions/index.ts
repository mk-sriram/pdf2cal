"use server";

import { signIn, signOut } from "@/auth";

export async function SocialLogin(formData : any) {
  const action = formData.get("action");
  const redirect = formData.get("redirect");
  await signIn(action, { redirectTo: redirect });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
