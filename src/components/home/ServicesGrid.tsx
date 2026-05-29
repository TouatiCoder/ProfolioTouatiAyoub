import React from 'react';
import { Layout, Database, Bot, Zap } from 'lucide-react';

export default function ServicesGrid() {
  const services = [
    {
      title: 'تطوير منصات SaaS مخصصة',
      description: 'بناء أنظمة إدارة التوصيل، المنصات اللوجستية، وتطبيقات الويب المعقدة المتوافقة مع احتياجات شركتك.',
      icon: <Database className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'أتمتة المهام واستخراج البيانات',
      description: 'سكريبتات بايثون متطورة لجلب البيانات (Web Scraping) وأتمتة العمليات التسويقية لزيادة الإنتاجية.',
      icon: <Bot className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'برمجة واجهات فائقة السرعة',
      description: 'تطوير مواقع الشركات وتطبيقات الويب باستخدام React.js لضمان أداء صاروخي وتجربة مستخدم لا تُنسى.',
      icon: <Layout className="h-8 w-8 text-blue-600" />,
    },
    {
      title: 'تحسين محركات البحث التقني (SEO)',
      description: 'تهيئة بنيتك البرمجية لتتصدر نتائج جوجل في السوق المغاربي، وجلب عملاء محتملين بشكل مجاني.',
      icon: <Zap className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            حلول برمجية مصممة للشركات الطموحة
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            نتجاوز مجرد كتابة الأكواد، نحن نبني أنظمة تقنية تحل مشاكل الأعمال وتزيد من أرباحك في الأسواق المغاربية.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}