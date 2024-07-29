import ActionArea from "@/components/ActionArea/ActionArea";
import FaqSection from "@/components/FaqSection/FaqSection";
import Footer from "@/components/Footer/Footer";
import HomeSection from "@/components/HomeSection/HomeSection";
import Navbar from "@/components/Navbar";
import Link from "next/link";
const page = () => {
  return (
    <>
      <Navbar />
      <HomeSection />
      <ActionArea />
      <FaqSection />
      <Footer/>
    </>
  );
};

export default page;
