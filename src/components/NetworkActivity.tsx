import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Wifi, Shield, AlertTriangle } from 'lucide-react';

interface Connection {
  id: string;
  ip: string;
  status: 'secure' | 'warning' | 'danger';
  port: number;
  protocol: string;
}

export const NetworkActivity = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Simulate network connections
    const generateConnection = (): Connection => ({
      id: Math.random().toString(36).substr(2, 9),
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      status: ['secure', 'warning', 'danger'][Math.floor(Math.random() * 3)] as Connection['status'],
      port: Math.floor(Math.random() * 65535),
      protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS'][Math.floor(Math.random() * 4)],
    });

    const interval = setInterval(() => {
      setConnections(prev => {
        const newConnections = [...prev];
        if (newConnections.length >= 6) {
          newConnections.shift();
        }
        newConnections.push(generateConnection());
        return newConnections;
      });
    }, 3000);

    // Scanning animation
    const scanInterval = setInterval(() => {
      setScanProgress(prev => (prev + 10) % 100);
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(scanInterval);
    };
  }, []);

  const getStatusColor = (status: Connection['status']) => {
    switch (status) {
      case 'secure': return 'text-cyber-green';
      case 'warning': return 'text-cyber-yellow';
      case 'danger': return 'text-cyber-red';
    }
  };

  const getStatusIcon = (status: Connection['status']) => {
    switch (status) {
      case 'secure': return <Shield className="w-4 h-4" />;
      case 'warning': return <Wifi className="w-4 h-4" />;
      case 'danger': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <Card className="terminal-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Wifi className="w-5 h-5 text-primary pulse-glow" />
          <h3 className="text-lg font-cyber font-bold glow-text">
            NETWORK MONITOR
          </h3>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm font-mono mb-2">
            <span className="text-muted-foreground">SCANNING...</span>
            <span className="text-cyber-cyan">{scanProgress}%</span>
          </div>
          <div className="h-1 bg-muted rounded overflow-hidden">
            <div 
              className="h-full bg-cyber-cyan transition-all duration-200"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 max-h-48 overflow-y-auto">
          {connections.map((conn) => (
            <div 
              key={conn.id}
              className="flex items-center justify-between p-2 bg-muted/30 rounded border border-primary/20 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={getStatusColor(conn.status)}>
                  {getStatusIcon(conn.status)}
                </div>
                <div className="font-mono text-sm">
                  <div className="text-foreground">{conn.ip}:{conn.port}</div>
                  <div className="text-muted-foreground text-xs">{conn.protocol}</div>
                </div>
              </div>
              <div className={`text-xs font-bold ${getStatusColor(conn.status)} flicker`}>
                {conn.status.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};