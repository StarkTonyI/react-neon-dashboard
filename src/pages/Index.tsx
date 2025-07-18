import { CyberHeader } from '@/components/CyberHeader';
import { SystemMetrics } from '@/components/SystemMetrics';
import { NetworkActivity } from '@/components/NetworkActivity';
import { TerminalLogs } from '@/components/TerminalLogs';
import { DataMatrix } from '@/components/DataMatrix';
import { SecurityStatus } from '@/components/SecurityStatus';

const Index = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <CyberHeader />
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SystemMetrics />
            <SecurityStatus />
          </div>
          
          {/* Center Column */}
          <div className="space-y-6">
            <NetworkActivity />
            <DataMatrix />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <TerminalLogs />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
