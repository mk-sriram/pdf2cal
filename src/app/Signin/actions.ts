"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

// Function to validate email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password
function validatePassword(password: string): boolean {
  // Require at least 8 characters, one uppercase letter, one lowercase letter, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

export async function login(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!validateEmail(email)) {
    redirect("/Signin/error?message=Invalid email format");
  }

  if (!validatePassword(password)) {
    redirect("/Signin/error?message=Invalid password format");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/Signin/error?message=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!validateEmail(email)) {
    redirect("/Signin/error?message=Invalid email format");
  }

  if (!validatePassword(password)) {
    redirect("/Signin/error?message=Invalid password format");
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    redirect("/Signin/error?message=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect("/");
}
