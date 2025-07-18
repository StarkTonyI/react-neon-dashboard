import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export const SystemMetrics = () => {
  const [metrics, setMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    disk: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.random() * 100,
        memory: 40 + Math.random() * 40,
        network: Math.random() * 100,
        disk: 20 + Math.random() * 30,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const MetricBar = ({ 
    label, 
    value, 
    color, 
    unit = '%' 
  }: { 
    label: string; 
    value: number; 
    color: string; 
    unit?: string; 
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-cyber text-muted-foreground">{label}</span>
        <span className={`text-sm font-mono font-bold ${color}`}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-sm overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-out rounded-sm ${color.replace('text-', 'bg-')}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card className="terminal-border scan-line">
      <div className="p-6">
        <h3 className="text-lg font-cyber font-bold glow-text mb-6">
          SYSTEM METRICS
        </h3>
        <div className="space-y-4">
          <MetricBar label="CPU USAGE" value={metrics.cpu} color="text-cyber-green" />
          <MetricBar label="MEMORY" value={metrics.memory} color="text-cyber-cyan" />
          <MetricBar label="NETWORK I/O" value={metrics.network} color="text-cyber-yellow" />
          <MetricBar label="DISK USAGE" value={metrics.disk} color="text-cyber-blue" />
        </div>
      </div>
    </Card>
  );
};