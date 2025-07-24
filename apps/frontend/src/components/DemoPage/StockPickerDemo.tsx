import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Fake stock data
const stock = {
  symbol: "AAPL",
  company: "Apple Inc.",
  industry: "Consumer Electronics",
  sector: "Technology",
  pe: 28.5, // P/E Ratio
  ps: 7.2,  // P/S Ratio
  dividendYield: 0.55, // %
};

function getColorForPERatio(pe: number) {
  if (pe < 15) return "text-green-600";
  if (pe < 30) return "text-yellow-600";
  return "text-red-600";
}
function getColorForPSRatio(ps: number) {
  if (ps < 3) return "text-green-600";
  if (ps < 10) return "text-yellow-600";
  return "text-red-600";
}
function getColorForDividendYield(dy: number) {
  if (dy > 2) return "text-green-600";
  if (dy > 0.5) return "text-yellow-600";
  return "text-red-600";
}

export default function GenerateDemo() {
  return (
    <div className="flex h-[600px] w-full max-w-4xl rounded-xl border bg-background shadow-lg overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-muted border-r flex flex-col p-4 gap-4">
        <div className="font-bold text-lg mb-6">Stock Analyzer</div>
        <nav className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start">Overview</Button>
          <Button variant="ghost" className="justify-start">Fundamentals</Button>
          <Button variant="ghost" className="justify-start">Valuation</Button>
          <Button variant="ghost" className="justify-start">Dividends</Button>
        </nav>
        <div className="mt-auto">
          <Button variant="outline" size="sm" className="w-full">Log out</Button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b bg-background/80">
          <div className="text-xl font-semibold">{stock.symbol} - {stock.company}</div>
          <Button size="sm" className="rounded-full">Analyze</Button>
        </header>
        {/* Content */}
        <div className="flex-1 p-8 bg-muted/40 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">Industry</div>
              <div className="text-2xl font-bold mt-1">{stock.industry}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">Sector</div>
              <div className="text-2xl font-bold mt-1">{stock.sector}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">Symbol</div>
              <div className="text-2xl font-bold mt-1">{stock.symbol}</div>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">P/E Ratio</div>
              <div className={`text-2xl font-bold mt-1 ${getColorForPERatio(stock.pe)}`}>{stock.pe}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">P/S Ratio</div>
              <div className={`text-2xl font-bold mt-1 ${getColorForPSRatio(stock.ps)}`}>{stock.ps}</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-lg font-semibold">Dividend Yield</div>
              <div className={`text-2xl font-bold mt-1 ${getColorForDividendYield(stock.dividendYield)}`}>{stock.dividendYield}%</div>
            </Card>
          </div>
          <Card className="p-6 mt-4">
            <div className="font-semibold mb-2">Recent Activity</div>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Dividend declared: $0.24/share</li>
              <li>Q2 earnings beat expectations</li>
              <li>Stock split announced</li>
              <li>New product launch in pipeline</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
} 