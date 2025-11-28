"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Trash2,
  History,
  Calculator,
  Divide,
  X,
  Minus,
  Plus,
  Percent,
  Equal,
  Square,
  Radical,
} from "lucide-react";

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: number;
}

export default function CalculatorMain() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("calculatorHistory");
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);

        // Validate that parsedHistory is an array
        if (Array.isArray(parsedHistory)) {
          // Filter out entries older than 60 days
          const sixtyDaysAgo = Date.now() - 60 * 24 * 60 * 60 * 1000;
          const filteredHistory = parsedHistory.filter(
            (item: CalculationHistory) => {
              return item.timestamp > sixtyDaysAgo;
            }
          );
          setHistory(filteredHistory);
        } else {
          console.error("Invalid history format in localStorage");
        }
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save history to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("calculatorHistory", JSON.stringify(history));
      } catch (error) {
        console.error("Failed to save history to localStorage", error);
      }
    }
  }, [history, isLoading]);

  const handleButtonClick = (value: string) => {
    setError("");
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
    setError("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      if (!input) return;

      // Replace visual symbols with JavaScript operators
      let expression = input
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-")
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());

      // Handle percentage calculations
      if (expression.includes("%")) {
        const parts = expression.split("%");
        if (parts.length === 2 && parts[1] === "") {
          // If percentage is at the end, calculate percentage of previous result
          const prevResult = result ? parseFloat(result) : 0;
          expression = `(${parts[0]}/100)*${prevResult}`;
        } else {
          expression = expression.replace(/%/g, "/100");
        }
      }

      // Handle square and square root
      expression = expression.replace(/²/g, "**2");
      expression = expression.replace(/√\(([^)]+)\)/g, "Math.sqrt($1)");

      // Evaluate the expression safely
      const evalResult = Function(`"use strict"; return (${expression})`)();

      if (isNaN(evalResult) || !isFinite(evalResult)) {
        throw new Error("Invalid calculation");
      }

      const formattedResult = parseFloat(evalResult.toPrecision(12)).toString();

      setResult(formattedResult);

      // Add to history
      const newHistoryItem: CalculationHistory = {
        expression: input,
        result: formattedResult,
        timestamp: Date.now(),
      };

      setHistory((prev) => [newHistoryItem, ...prev]);
    } catch (error) {
      setError("Invalid expression");
      console.error("Calculation error:", error);
    }
  };

  const handleSquare = () => {
    if (input) {
      setInput((prev) => `(${prev})²`);
    } else if (result) {
      setInput(`(${result})²`);
    }
  };

  const handleSquareRoot = () => {
    if (input) {
      setInput((prev) => `√(${prev})`);
    } else if (result) {
      setInput(`√(${result})`);
    }
  };

  const handleUseResult = () => {
    if (result) {
      setInput(result);
      setResult("");
    }
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("calculatorHistory");
    } catch (error) {
      console.error("Failed to clear history from localStorage", error);
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading calculator...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-3 mx-auto">
      <Card className="flex-1">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6" />
              <CardTitle>Calculator</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              <Label htmlFor="history-toggle" className="text-sm">
                History
              </Label>
              <Switch
                id="history-toggle"
                checked={showHistory}
                onCheckedChange={setShowHistory}
              />
            </div>
          </div>
          <CardDescription>
            Perform calculations with history tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {/* Display */}
            <div className="flex flex-col gap-2 p-4 bg-muted rounded-lg">
              <div className="h-6 text-right text-sm text-muted-foreground overflow-hidden">
                {input}
              </div>
              <div className="h-8 text-2xl font-semibold text-right overflow-hidden">
                {error || result}
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" onClick={handleClear}>
                C
              </Button>
              <Button variant="outline" onClick={handleBackspace}>
                ⌫
              </Button>
              <Button variant="outline" onClick={handleSquare}>
                <Square className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleSquareRoot}>
                <Radical className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => handleButtonClick("7")}>
                7
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("8")}>
                8
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("9")}>
                9
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("÷")}>
                <Divide className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => handleButtonClick("4")}>
                4
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("5")}>
                5
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("6")}>
                6
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("×")}>
                <X className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => handleButtonClick("1")}>
                1
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("2")}>
                2
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("3")}>
                3
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("−")}>
                <Minus className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => handleButtonClick("0")}>
                0
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick(".")}>
                .
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("%")}>
                <Percent className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick("+")}>
                <Plus className="h-4 w-4" />
              </Button>

              <Button variant="outline" onClick={() => handleButtonClick("(")}>
                (
              </Button>
              <Button variant="outline" onClick={() => handleButtonClick(")")}>
                )
              </Button>
              <Button variant="outline" onClick={handleUseResult}>
                Ans
              </Button>
              <Button onClick={handleCalculate}>
                <Equal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showHistory && (
        <Card className="flex-1 max-w-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5" />
                <CardTitle>History</CardTitle>
              </div>
              {history.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <CardDescription>
              Calculations are saved for 60 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {history.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No calculation history yet
              </div>
            ) : (
              <ScrollArea className="h-[380px] pr-4">
                <div className="space-y-4">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-3 bg-muted rounded-lg"
                    >
                      <div className="flex justify-between items-start">
                        <div className="font-medium">{item.expression}</div>
                        <div className="font-semibold">= {item.result}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
