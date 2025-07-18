import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Shield, Eye, Lock, Unlock } from 'lucide-react';

interface SecurityEvent {
  id: string;
  type: 'intrusion' | 'authentication' | 'firewall' | 'encryption';
  status: 'active' | 'blocked' | 'monitoring';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
}

export const SecurityStatus = () => {
  const [threatLevel, setThreatLevel] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  const locations = [
    'DMZ-001', 'CORE-SRV', 'DB-CLUSTER', 'WEB-TIER', 
    'AUTH-SVC', 'API-GTW', 'LOG-SRV', 'BACKUP-SYS'
  ];

  useEffect(() => {
    // Simulate security events
    const eventInterval = setInterval(() => {
      const eventTypes: SecurityEvent['type'][] = ['intrusion', 'authentication', 'firewall', 'encryption'];
      const statuses: SecurityEvent['status'][] = ['active', 'blocked', 'monitoring'];
      const severities: SecurityEvent['severity'][] = ['low', 'medium', 'high', 'critical'];
      
      const newEvent: SecurityEvent = {
        id: Math.random().toString(36).substr(2, 9),
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        location: locations[Math.floor(Math.random() * locations.length)]
      };

      setEvents(prev => {
        const updated = [newEvent, ...prev];
        return updated.slice(0, 5); // Keep only 5 most recent
      });
    }, 4000);

    // Threat level changes
    const threatInterval = setInterval(() => {
      setThreatLevel(Math.floor(Math.random() * 5) + 1);
    }, 8000);

    // Scanning animation
    const scanInterval = setInterval(() => {
      setIsScanning(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(eventInterval);
      clearInterval(threatInterval);
      clearInterval(scanInterval);
    };
  }, []);

  const getThreatColor = (level: number) => {
    if (level <= 2) return 'text-cyber-green';
    if (level <= 3) return 'text-cyber-yellow';
    return 'text-cyber-red';
  };

  const getThreatLabel = (level: number) => {
    const labels = ['MINIMAL', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'];
    return labels[level - 1] || 'UNKNOWN';
  };

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'low': return 'text-cyber-green';
      case 'medium': return 'text-cyber-yellow';
      case 'high': return 'text-cyber-red';
      case 'critical': return 'text-cyber-red';
    }
  };

  const getStatusIcon = (status: SecurityEvent['status']) => {
    switch (status) {
      case 'active': return <Unlock className="w-3 h-3" />;
      case 'blocked': return <Lock className="w-3 h-3" />;
      case 'monitoring': return <Eye className="w-3 h-3" />;
    }
  };

  return (
    <Card className="terminal-border">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Shield className={`w-5 h-5 ${isScanning ? 'text-cyber-yellow animate-pulse' : 'text-primary'}`} />
          <h3 className="text-lg font-cyber font-bold glow-text">
            SECURITY CENTER
          </h3>
        </div>
        
        <div className="space-y-6">
          {/* Threat Level */}
          <div className="text-center p-4 bg-black/30 rounded border border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">THREAT LEVEL</div>
            <div className={`text-3xl font-bold font-cyber ${getThreatColor(threatLevel)} pulse-glow`}>
              {threatLevel}
            </div>
            <div className={`text-sm font-mono ${getThreatColor(threatLevel)}`}>
              {getThreatLabel(threatLevel)}
            </div>
          </div>

          {/* Security Events */}
          <div>
            <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
              RECENT EVENTS
              {isScanning && (
                <span className="text-cyber-cyan text-xs animate-pulse">SCANNING...</span>
              )}
            </div>
            <div className="space-y-2">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-2 bg-muted/20 rounded border border-primary/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={getSeverityColor(event.severity)}>
                      {getStatusIcon(event.status)}
                    </div>
                    <div className="font-mono text-sm">
                      <div className="text-foreground">{event.type.toUpperCase()}</div>
                      <div className="text-muted-foreground text-xs">{event.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-bold ${getSeverityColor(event.severity)}`}>
                      {event.severity.toUpperCase()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};