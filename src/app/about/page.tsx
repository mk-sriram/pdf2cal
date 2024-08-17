import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <a
        href="/"
        className="btn px-7 rounded-full bg-[#0b7dffd4] text-white hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01] mt-8"
      >
        Back
      </a>
      <div className="flex flex-col bg-white text-gray-800 p-6 md:p-12 md:w-[50rem] sm:w-[30rem] items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Google Oauth2 Homepage</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Last updated: August 17, 2024
        </p>
        <div className="leading-relaxed mb-4 text-center">
          <h2 className="text-xl font-semibold mb-2">
            Accurately represents your app's identity:
          </h2>
          <p className="mb-4">
            PDF2Calendar is a web application that simplifies the process of
            managing your academic or work schedules. It converts PDF schedules
            and images into calendar events, seamlessly integrating them with
            Google Calendar.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            What will this app do with user data?
          </h2>
          <p className="mb-4">
            PDF2Calendar processes the uploaded schedules to extract relevant
            information such as dates, times, and event titles. The extracted
            data is then used to generate calendar invites or tasks. The app
            collects minimal user data necessary for authentication and for
            managing the conversion process, including name, email, and access
            tokens for calendar APIs.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            How does this app enhance user functionality?
          </h2>
          <p className="mb-4">
            PDF2Calendar enhances user productivity by automating the tedious
            task of manually entering events into calendars. Users can simply
            upload their class or work schedules, and the app will convert them
            into actionable calendar events, saving time and reducing the
            likelihood of scheduling errors. It also allows for easy integration
            with popular calendar platforms, ensuring that users stay organized
            and on top of their tasks.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Describe the content, context, or connection to the app:
          </h2>
          <p className="mb-4">
            PDF2Calendar is built using Next.js, TailwindCSS, Supabase for
            authentication, and PostgreSQL for the database. It leverages the
            Google Generative AI (Gemini) for extracting schedule information
            from PDFs and images. The project was initiated by the developer to
            address the common problem of managing multiple schedules
            effectively and is deployed at{" "}
            <a
              href="https://www.pdf2calendar.com"
              className="text-blue-600 hover:underline"
            >
              pdf2calendar.com
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mb-2">
            Google OAuth2 Limited Use Disclosure:
          </h2>
          <p className="mb-4">
            PDF2Calendar adheres to Google's API Services User Data Policy,
            including the Limited Use requirements. It only requests the scopes
            necessary for converting schedules into calendar events and does not
            modify or update existing events without user consent.
          </p>

          <h2 className="text-xl font-semibold mb-2">Copyright:</h2>
          <p>
            If you have a copyright complaint, please tell me and include the
            PDF2Calendar page that contains the alleged content, identification
            of the work claimed to have been infringed, including the name and
            reply email address of the copyright holder/representative, an
            assertion that the use of the material is not authorized, and an
            assertion that you are the copyright holder/representative.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
