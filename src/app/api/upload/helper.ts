import { google } from "googleapis";
import { getProviderTokens } from "@/utils/supabase/getProviderTokens";

interface ProviderTokens {
  provider_token: string | null;
  provider_refresh_token: string | null;
}

export const getUserTimeZone = async () => {
  try {
    //retriving providerToken from db
    const { provider_token, provider_refresh_token } =
      await getProviderTokens();
    //console.log("acess toekn, refresh token ", accessToken, refreshToken);
    //check for tokens
    if (!provider_token || !provider_refresh_token) {
      return new Error("Invalid session tokens");
    }

    //loading google secrets from Env
    const clientId = process.env.AUTH_GOOGLE_ID;
    const clientSecret = process.env.AUTH_GOOGLE_SECRET;

    //init oauthclient
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({
      access_token: provider_token,
      refresh_token: provider_refresh_token,
    });

    //Tasks API call.
    try {
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const calendarTimezone = await calendar.calendars.get({
        calendarId: "primary",
      });

      // Return the primary calendar's timezone
      return calendarTimezone.data.timeZone;
    } catch (calendarError) {
      console.error(
        "An error occurred while fetching the calendar's timezone:",
        calendarError
      );
      return new Error("Failed to retrieve the calendar's timezone");
    }
  } catch (error) {
    console.error("An error occurred with retriving provider tokens :", error);
  }
};
