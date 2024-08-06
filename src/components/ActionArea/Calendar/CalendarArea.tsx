"use server";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

const CalendarArea = async (calendarobj: any) => {
  const router = useRouter();

  const sendtoCalendar = async () => {};
  const session = await auth();
  return (
    <div>
      {!session ? (
        <button
          className="btn px-4 rounded-full outline-[#0b7dffd4] text-grey-800 hover:bg-[#6dc1fc] mt-3"
          onClick={() => router.push("/Signin")}
        >
          Connect your Calendar!
        </button>
      ) : (
        <button
          className="btn px-4 rounded-full outline-[#0b7dffd4] text-grey-800 hover:bg-[#6dc1fc] mt-3"
          onClick={sendtoCalendar}
        >
          Send to Calendar 🪄
        </button>
      )}
    </div>
  );
};

export default CalendarArea;
