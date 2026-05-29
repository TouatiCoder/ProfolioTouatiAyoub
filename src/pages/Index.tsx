import React, { lazy, Suspense } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import StatsBar from '../components/home/StatsBar';
import ServicesGrid from '../components/home/ServicesGrid';

// تحميل المكونات السفلية بذكاء (Lazy Load) لعدم إثقال المتصفح
const Process = lazy(() => import('../components/home/Process'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const FAQ = lazy(() => import('../components/home/FAQ'));
const ContactCTA = lazy(() => import('../components/home/ContactCTA'));

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased" dir="rtl">
      <Header />
      
      <main>
        {/* المكونات الأساسية التي يجب أن تظهر فوراً */}
        <Hero />
        <StatsBar />
        <ServicesGrid />

        {/* المكونات التي يتم تحميلها أثناء تمرير المستخدم للأسفل */}
        <Suspense fallback={<div className="h-64 animate-pulse bg-slate-100 w-full flex items-center justify-center">جاري التحميل...</div>}>
          <Process />
          <Testimonials />
          <FAQ />
          <ContactCTA />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}