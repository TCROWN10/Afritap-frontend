
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Users } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
// import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import AIBusiness from '@/components/AIBusiness';
import TeamSection from '@/components/TeamSection';
import About from '@/components/About';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
          <Features />
        <HowItWorks />
        <section id="services">
          <Stats />
          <AIBusiness />
        </section>
         {/* Vendor Network Promotion Section */}
         <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-1/2 space-y-6 animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Connect With Our <span className="text-[#2E7D32]">Vendors Network</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Discover local merchants, build relationships, and expand your business through our growing community of verified vendors across Africa.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                Free visibility and networking opportunities for all platform users, encouraging B2B trade and ecommerce                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/vendor-network">
                    <Button className="bg-[#2E7D32] hover:bg-green-700 text-white gap-2">
                      <Search className="h-5 w-5" />
                      Find Vendors
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-[#2E7D32] text-[#2E7D32] gap-2">
                    <Users className="h-5 w-5" />
                    Join Community
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-green-50 dark:bg-green-900/20 p-8 rounded-xl animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "300+ Vendors", description: "Across 12 countries" },
                    { title: "Local Connections", description: "Find businesses near you" },
                    { title: "AfriTap Verified", description: "Trusted payment partners" },
                    { title: "Business Growth", description: "Expand your network" },
                  ].map((item, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                      <h3 className="font-bold text-[#2E7D32] dark:text-green-400">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <TeamSection />
        {/* <Testimonials /> */}
        <section id="about">
        <About />
        </section>
        <section id="contact">
          <CTA />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
