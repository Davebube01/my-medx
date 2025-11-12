import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import React from 'react';

interface MetricProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ElementType; // 👈 change this
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: ColorType
  onClick?: () => void; // 👈 this ensures it returns void
}

type ColorType = 'primary' | 'secondary' | 'warning' | 'error' | 'success';

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon, // 👈 destructure as a component
  trend,
  trendValue,
  color = 'primary',
  onClick
}: MetricProps) {
  const getColorClasses = (colorType: ColorType) => {
    const colors = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-green-600 text-white',
      warning: 'bg-orange-400 text-gray-800',
      error: 'bg-red-800 text-error-foreground',
      success: 'bg-teal-600 text-white'
    };
    return colors?.[colorType] || colors?.primary;
  };

  const getTrendColor = (trendType: string) => {
    if (trendType === 'up') return 'text-green-600';
    if (trendType === 'down') return 'text-red-400';
    return 'text-text-secondary';
  };

  return (
    <div
      className={`bg-white border border-border rounded-lg p-6  shadow-md ${
        onClick ? 'cursor-pointer hover:border-primary/20' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-1 text-gray-400">{title}</p>
          <p className="text-3xl font-bold mb-2 text-gray-800">{value}</p>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}

          {trend && trendValue && (
            <div className="flex items-center mt-2">
              {trend === 'up' ? (
                <TrendingUp size={16} className={`${getTrendColor(trend)} text-green-600`}/>
              ) : trend === 'down' ? (
                <TrendingDown size={16} className={`${getTrendColor(trend)} text-red-600`} />
              ) : (
                <Minus size={16} className={getTrendColor(trend)} />
              )}
              <span className={`text-sm ml-1 text-gray-400 ${getTrendColor(trend)}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>

        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(
            color
          )}`}
        >
          {/* 👇 use the Icon as a component */}
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
