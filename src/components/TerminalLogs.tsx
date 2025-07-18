import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export const TerminalLogs = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const logMessages = [
    "Initializing quantum encryption protocols...",
    "Establishing secure connection to mainframe",
    "Neural network training completed: 98.7% accuracy",
    "Firewall breach detected and neutralized",
    "Analyzing data stream from sector 7G",
    "Cryptocurrency mining optimization active",
    "Satellite uplink established",
    "Biometric scan authenticated",
    "AI module learning patterns...",
    "Data packet transmission successful",
    "Intrusion detection system online",
    "Matrix calculations completed",
    "Quantum computer synchronization active",
    "Blockchain verification in progress",
    "Deep scan of sector completed"
  ];

  useEffect(() => {
    const generateLog = (): LogEntry => {
      const levels: LogEntry['level'][] = ['info', 'warning', 'error', 'success'];
      const now = new Date();
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: now.toLocaleTimeString('en-US', { hour12: false }),
        level: levels[Math.floor(Math.random() * levels.length)],
        message: logMessages[Math.floor(Math.random() * logMessages.length)]
      };
    };

    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs.length >= 12) {
          newLogs.shift();
        }
        newLogs.push(generateLog());
        return newLogs;
      });
    }, 2500);

    // Initialize with some logs
    const initialLogs = Array.from({ length: 6 }, generateLog);
    setLogs(initialLogs);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return 'text-cyber-cyan';
      case 'warning': return 'text-cyber-yellow';
      case 'error': return 'text-cyber-red';
      case 'success': return 'text-cyber-green';
    }
  };

  const getLevelPrefix = (level: LogEntry['level']) => {
    switch (level) {
      case 'info': return '[INFO]';
      case 'warning': return '[WARN]';
      case 'error': return '[ERR]';
      case 'success': return '[OK]';
    }
  };

  return (
    <Card className="terminal-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-5 h-5 text-primary pulse-glow" />
          <h3 className="text-lg font-cyber font-bold glow-text">
            SYSTEM LOGS
          </h3>
        </div>
        
        <div className="bg-black/50 p-4 rounded border border-primary/30 max-h-80 overflow-y-auto">
          <div className="space-y-1 font-mono text-sm">
            {logs.map((log) => (
              <div key={log.id} className="flex gap-3 items-start data-stream">
                <span className="text-muted-foreground text-xs shrink-0 w-20">
                  {log.timestamp}
                </span>
                <span className={`${getLevelColor(log.level)} shrink-0 w-16 text-xs font-bold`}>
                  {getLevelPrefix(log.level)}
                </span>
                <span className="text-foreground/90 leading-tight">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-primary">$</span>
            <span className="text-foreground/70 font-mono text-sm">_</span>
            <div className="w-2 h-4 bg-primary animate-pulse" />
          </div>
        </div>
      </div>
    </Card>
  );
};