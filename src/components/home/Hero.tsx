import React from 'react';
import { ArrowLeft, Code } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* خلفية جمالية خفيفة لا تستهلك موارد */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50/80 px-4 py-2 text-sm font-semibold text-blue-700 ring-1 ring-inset ring-blue-700/10 backdrop-blur-sm">
              <Code size={16} />
              شريكك التقني لتطوير برمجيات الشركات في المغرب العربي
            </span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.2]">
            نبني المنصات الرقمية التي 
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              تضاعف نمو أعمالك
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl mx-auto sm:text-xl">
            نطور حلول SaaS اللوجستية، وأتمتة العمليات B2B، ونصمم واجهات تفاعلية فائقة السرعة لتحويل زوارك إلى عملاء مخلصين، معتمدين على أحدث التقنيات.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-slate-800 hover:shadow-xl transition-all duration-300"
            >
              اطلب استشارة برمجية مجانية
              <ArrowLeft size={20} />
            </a>
            <a
              href="#portfolio"
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 transition-all duration-300"
            >
              تصفح مشاريعنا الناجحة
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}