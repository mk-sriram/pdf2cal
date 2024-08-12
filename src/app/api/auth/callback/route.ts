export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { Session } from "@supabase/supabase-js";
function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function deleteCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        //console.log(event, "  ", session);

        if (session && session.provider_token) {
          // Store provider_token and provider_refresh_token in the database
          const { data, error } = await supabase.from("provider_tokens").upsert(
            {
              user_id: session.user.id,
              provider: session.user.app_metadata?.provider, // This will be inserted/updated
              provider_token: session.provider_token,
              provider_refresh_token: session.provider_refresh_token || null,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" } // Only conflict on user_id
          );

          if (error) {
            console.error("Error storing provider tokens:", error);
          } else {
            console.log("Provider tokens stored/updated successfully.");
          }
        }

        if (event === "SIGNED_OUT" && session) {
          // Remove the provider tokens from the database
          const { error } = await supabase
            .from("provider_tokens")
            .delete()
            .match({
              user_id: session.user.id,
              provider: session.user.app_metadata.provider, // assuming provider is available in app_metadata
            });

          if (error) {
            console.error("Error deleting provider tokens:", error);
          } else {
            console.log("Provider tokens deleted successfully.");
          }
        }
      }
    );

    //console.log("server side: ", data);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
