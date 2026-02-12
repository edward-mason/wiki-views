import React from 'react';
import { ProcessedStats } from '../types';
import ViewsChart from './ViewsChart';
import { Eye, Calendar, ExternalLink } from 'lucide-react';

interface StatsCardProps {
  stats: ProcessedStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const formattedTotal = new Intl.NumberFormat('en-US').format(stats.totalViews);
  
  // Calculate average monthly views
  const averageMonthly = stats.history.length > 0 
    ? Math.round(stats.totalViews / stats.history.length) 
    : 0;

  const formattedAverage = new Intl.NumberFormat('en-US').format(averageMonthly);

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in-up">
      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
              <span className="bg-slate-100 px-2 py-0.5 rounded">Wikipedia Article</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 break-words">
              {stats.articleTitle}
            </h2>
            <a 
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(stats.articleTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 mt-2 text-sm font-medium transition-colors"
            >
              View on Wikipedia <ExternalLink size={14} />
            </a>
          </div>
          
          <div className="bg-brand-50 rounded-2xl p-4 md:p-6 min-w-[200px] border border-brand-100">
            <div className="flex items-center gap-2 text-brand-600 mb-2">
              <Eye size={20} />
              <span className="font-semibold text-sm uppercase tracking-wide">Lifetime Views</span>
            </div>
            <div className="text-3xl md:text-4xl font-black text-brand-900">
              {formattedTotal}
            </div>
            <div className="text-brand-600/80 text-xs mt-1 font-medium">
              Since July 2015
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Calendar size={16} />
                    <span className="text-xs font-semibold uppercase">Months Tracked</span>
                </div>
                <div className="text-xl font-bold text-slate-800">
                    {stats.history.length}
                </div>
            </div>
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Eye size={16} />
                    <span className="text-xs font-semibold uppercase">Avg. Monthly Views</span>
                </div>
                <div className="text-xl font-bold text-slate-800">
                    {formattedAverage}
                </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Eye size={16} />
                    <span className="text-xs font-semibold uppercase">Peak Month</span>
                </div>
                <div className="text-xl font-bold text-slate-800">
                    {stats.history.length > 0 
                        ? new Intl.NumberFormat('en-US').format(Math.max(...stats.history.map(h => h.views)))
                        : 0}
                </div>
            </div>
        </div>

        <div className="border-t border-slate-100 pt-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Views History</h3>
            <ViewsChart data={stats.history} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;