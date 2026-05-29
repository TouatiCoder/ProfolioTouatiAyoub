import React from 'react';

export default function StatsBar() {
  const stats = [
    { id: 1, name: 'مشاريع ناجحة تم إطلاقها', value: '+45' },
    { id: 2, name: 'رضا العملاء في خدمات B2B', value: '100%' },
    { id: 3, name: 'أيام كمتوسط لتسليم الواجهات', value: '14' },
    { id: 4, name: 'دول مغاربية نغطيها خدماتياً', value: '4' },
  ];

  return (
    <div className="bg-slate-900 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 text-center lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-2">
              <dt className="text-sm sm:text-base leading-7 text-slate-400">{stat.name}</dt>
              <dd className="order-first text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}