import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Cpu, Zap, Globe } from 'lucide-react';

export const CyberHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
      setUptime(prev => prev + 1);
    }, 1000);

    const statusInterval = setInterval(() => {
      const statuses = ['OPERATIONAL', 'MONITORING', 'ANALYZING', 'SECURE'];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="terminal-border cyber-grid">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-8 h-8 text-primary pulse-glow" />
              <div>
                <h1 className="text-2xl font-cyber font-bold glow-text">
                  CYBER COMMAND
                </h1>
                <div className="text-sm text-muted-foreground font-mono">
                  Neural Interface v2.47.9
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">SYSTEM STATUS</div>
              <div className="text-cyber-green font-mono font-bold flicker">
                {systemStatus}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">UPTIME</div>
              <div className="text-cyber-cyan font-mono font-bold">
                {formatUptime(uptime)}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-muted-foreground">TIMESTAMP</div>
              <div className="text-cyber-yellow font-mono font-bold">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyber-green animate-pulse" />
              <Zap className="w-5 h-5 text-cyber-yellow animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};