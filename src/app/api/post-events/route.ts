import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getProviderTokens } from "@/utils/supabase/getProviderTokens";

export async function POST(request: NextRequest) {
  try {
    //retriving providerToken from db
    const { calendarListId, calendarData } = await request.json();
    //console.log(calendarListId, calendarData);
    if (!calendarListId || !calendarData || !Array.isArray(calendarData)) {
      return NextResponse.json(
        { message: "Missing Calendar list ID or Calendar data" },
        { status: 400 }
      );
    }

    const { provider_token, provider_refresh_token } =
      await getProviderTokens();
    //console.log("acess toekn, refresh token ", accessToken, refreshToken);
    //check for tokens
    if (!provider_token || !provider_refresh_token) {
      return NextResponse.json(
        { message: "Invalid session tokens" },
        { status: 401 }
      );
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
      // Create an instance of the Google Tasks API
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });

      // Iterate through the calendarData array and insert each event individually
      for (const event of calendarData) {
        //console.log(event);
        await calendar.events.insert({
          calendarId: calendarListId,
          requestBody: event,
          
        });
      }

      // Return a success message if all tasks are inserted
      return NextResponse.json(
        { message: "All Events inserted successfully" },
        { status: 200 }
      );

      // Get the user's tasks to insert for loop
    } catch (error) {
      console.error(
        "An error occurred during the Event insertion process:",
        error
      );
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("An error occurred with retrieving provider tokens:", error);
    return NextResponse.json(
      { message: "Failed to retrieve provider tokens" },
      { status: 500 }
    );
  }

  //console.log("provider Token data: ", providerTokenData);
}
