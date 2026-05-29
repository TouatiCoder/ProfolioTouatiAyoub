import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="bg-blue-600 py-20 relative overflow-hidden">
      {/* تأثيرات خلفية */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white sm:text-5xl mb-6">
          هل أنت مستعد لنقل أعمالك التقنية للمستوى التالي؟
        </h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          دعنا نناقش فكرة مشروعك، سواء كان منصة تجارة إلكترونية، نظام SaaS معقد، أو واجهة مستخدم تفاعلية. الرد مضمون خلال 24 ساعة.
        </p>
        
        <a 
          href="https://wa.me/212710755666" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-slate-50 hover:scale-105 transition-all duration-300"
        >
          <MessageCircle size={24} className="text-green-500" />
          تواصل معي عبر الواتساب الآن
        </a>
      </div>
    </section>
  );
}