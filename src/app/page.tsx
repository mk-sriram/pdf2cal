import ActionArea from "@/components/ActionArea/ActionArea";
import FaqSection from "@/components/FaqSection/FaqSection";
import PageIllustration from "@/components/page-illustration";
import HomeSection from "@/components/HomeSection/HomeSection";
import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection/DemoSection";
const page = () => {
  return (
    <div className="overflow-hidden">
      <PageIllustration />
      <Navbar />
      <div className="float-in  ">
        <HomeSection />
      </div>
      <div className="float-in float-in-action">
        <ActionArea />
      </div>
      <div className="float-in float-in-action">
        <DemoSection />
      </div>

      <FaqSection />
    </div>
  );
};

export default page;
