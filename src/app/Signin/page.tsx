"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
const page = () => {
  const supabase = createClient();

  const handleSignIn = async () => {
    console.log("SIGNING IN BUTTON GOOGLE CLICKED");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes:
          "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/tasks",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `https://www.pdf2calendar.com/api/auth/callback`,
      },
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 bg-white w-[100%] ">
      <div className="max-w-md ">
        <div className="p-8 rounded-2xl bg-white drop-shadow-xl  h-[40%]">
          <h2 className="text-gray-800 text-center text-2xl font-bold">
            Sign in
          </h2>

          <div className="space-x-6 flex justify-center mt-8 ">
            <button
              aria-label="Sign in with Google"
              className="flex items-center bg-white border border-button-border-light rounded-full p-0.5 pr-4 shadow-[rgba(0,_0,_0,_0.15)_0px_3px_8px] transition-all transform active:scale-[0.98] hover:scale-[1.009]"
              onClick={handleSignIn}
            >
              <div className="flex items-center justify-center bg-white w-12 h-9 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
              </div>
              <span className="text-md text-gray-800 tracking-wider">
                Sign in with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
