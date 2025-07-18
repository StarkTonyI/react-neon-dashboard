import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Database } from 'lucide-react';

export const DataMatrix = () => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });

  const characters = '0123456789ABCDEF!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    // Initialize matrix
    const rows = 12;
    const cols = 16;
    const initialMatrix = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 
        characters[Math.floor(Math.random() * characters.length)]
      )
    );
    setMatrix(initialMatrix);

    // Update matrix periodically
    const matrixInterval = setInterval(() => {
      setMatrix(prev => 
        prev.map(row => 
          row.map(() => 
            Math.random() > 0.8 
              ? characters[Math.floor(Math.random() * characters.length)]
              : row[Math.floor(Math.random() * row.length)]
          )
        )
      );
    }, 500);

    // Move active cell
    const cellInterval = setInterval(() => {
      setActiveCell(prev => ({
        row: Math.floor(Math.random() * rows),
        col: Math.floor(Math.random() * cols)
      }));
    }, 800);

    return () => {
      clearInterval(matrixInterval);
      clearInterval(cellInterval);
    };
  }, []);

  return (
    <Card className="terminal-border scan-line">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Database className="w-5 h-5 text-primary pulse-glow" />
          <h3 className="text-lg font-cyber font-bold glow-text">
            DATA MATRIX
          </h3>
        </div>
        
        <div className="bg-black/50 p-4 rounded border border-primary/30 overflow-hidden">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(16, 1fr)` }}>
            {matrix.map((row, rowIndex) =>
              row.map((char, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    w-6 h-6 flex items-center justify-center text-xs font-mono
                    transition-all duration-300
                    ${activeCell.row === rowIndex && activeCell.col === colIndex
                      ? 'bg-primary text-primary-foreground glow-text'
                      : 'text-cyber-green/60 hover:text-cyber-green'
                    }
                  `}
                >
                  {char}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between text-xs font-mono text-muted-foreground">
          <span>ACTIVE CELL: [{String(activeCell.row).padStart(2, '0')},{String(activeCell.col).padStart(2, '0')}]</span>
          <span className="text-cyber-cyan">ENCRYPTION: AES-256</span>
        </div>
      </div>
    </Card>
  );
};