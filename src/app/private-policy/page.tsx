import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col   items-center justify-center">
      <a
        href="/"
        className="btn px-7 rounded-full bg-[#0b7dffd4] text-white  hover:bg-[#6dc1fc] transition-all transform active:scale-[0.98] hover:scale-[1.01] mt-8"
      >
        {" "}
        Back{" "}
      </a>
      <div className="flex flex-col bg-white text-gray-800 p-6 md:p-12 md:w-[50rem] sm:w-[30rem] items-center justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-4 text-center">
          Last updated: August 13, 2024
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          Your privacy is important to us. It is PDF2Cal’s policy to respect
          your privacy regarding any information we may collect from you across
          our website, and other sites we own and operate.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we're collecting it
          and how it will be used.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          You can sign up with your Google account, allowing your PDF2Cal
          account image to be prefilled with your public profile picture and
          providing access to send data to your Google Calendar and Google
          Tasks.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          We only retain collected information for as long as necessary to
          provide you with your requested service. What data we store, we'll
          protect within commercially acceptable means to prevent loss and
          theft, as well as unauthorised access, disclosure, copying, use or
          modification.{" "}
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          We don't share any personally identifying information publicly or with
          third-parties, except when required to by law.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          We act in the capacity of a data controller and a data processor with
          regard to the personal data processed through PDF2Cal and the services
          in terms of the applicable data protection laws, including the EU
          General Data Protection Regulation (GDPR).
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          Our website may link to external sites that are not operated by us.
          Please be aware that we have no control over the content and practices
          of these sites, and cannot accept responsibility or liability for
          their respective privacy policies.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          We do not knowingly collect any personal information from children
          under the age of 13. If you are a parent or guardian and you are aware
          that your child has provided us with personal information, please
          contact us so that we can take necessary actions.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          You are free to refuse our request for your personal information, with
          the understanding that we may be unable to provide you with some of
          your desired services.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          {" "}
          Your continued use of our website will be regarded as acceptance of
          our practices around privacy and personal information. If you have any
          questions about how we handle user data and personal information, feel
          free to contact us.
        </p>
        <p className="leading-relaxed mb-4 text-center">
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
      </div>
    </div>
  );
};

export default page;
