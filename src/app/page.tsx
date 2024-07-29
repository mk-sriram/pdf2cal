import FaqSection from "@/components/FaqSection/faqSection";
import Footer from "@/components/Footer/Footer";
import HomeSection from "@/components/HomeSection/HomeSection";
import Navbar from "@/components/Navbar";
import Link from "next/link";
const page = () => {
  return (
    <>
      <Navbar />
      <HomeSection />
      <FaqSection />
      <Footer />
    </>
  );
};

export default page;
