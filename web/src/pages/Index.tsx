import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ReservationDemo from "@/components/ReservationDemo";
import WhatsappIntegration from "@/components/WhatsappIntegration";
import AdminDashboard from "@/components/AdminDashboard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <ReservationDemo />
      <WhatsappIntegration />
      <AdminDashboard />
      <Footer />
    </div>
  );
};

export default Index;
