/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, AlertCircle } from "lucide-react";

const CustomerChecker = () => {
  const [phone, setPhone] = useState(""); // Phone number state
  const [responseData, setResponseData] = useState<any>(null); // API response state
  const [error, setError] = useState<string | null>(null); // Error state
  const apiKey = "ktlY9kJCbKJukmakVNtvpgHpZ3Tm83vPBtmAKfHWCDyhn9wlas7G0OUIUXWS"; // Your API key
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCheck = async () => {
    if (!phone.trim()) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setIsLoading(true);
      setProgress(30);

      const response = await fetch(
        `https://bdcourier.com/api/courier-check?phone=${phone}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setProgress(70);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResponseData(data); // Set the API response data
      setError(null); // Clear any previous errors

      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again."); // Set error message
      setResponseData(null); // Clear previous data on error
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="flex justify-center  p-4">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-center">
            Check customer information by phone number
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Enter a phone number to check customer information from our
              system.
            </div>

            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter customer phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleCheck}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Search className="h-4 w-4" />
                Check Customer
              </Button>
            </div>

            {isLoading && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-xs text-center text-muted-foreground">
                  Checking customer information...
                </p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {responseData?.courierData && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Courier Data</h3>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Courier Name</TableHead>
                      <TableHead>Total Parcels</TableHead>
                      <TableHead>Successful Parcels</TableHead>
                      <TableHead>Cancelled Parcels</TableHead>
                      <TableHead>Success Ratio (%)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(responseData.courierData).map(
                      ([courier, details]: [string, any]) =>
                        courier !== "summary" ? (
                          <TableRow key={courier}>
                            <TableCell className="font-medium capitalize">
                              {courier}
                            </TableCell>
                            <TableCell>{details.total_parcel}</TableCell>
                            <TableCell>{details.success_parcel}</TableCell>
                            <TableCell>{details.cancelled_parcel}</TableCell>
                            <TableCell>{details.success_ratio}%</TableCell>
                          </TableRow>
                        ) : null
                    )}
                  </TableBody>
                </Table>

                <div className="text-sm">
                  <h4 className="font-medium mb-2">Summary</h4>
                  <p>
                    Total Parcels:{" "}
                    <strong>
                      {responseData.courierData.summary.total_parcel}
                    </strong>
                    , Successful:{" "}
                    <strong>
                      {responseData.courierData.summary.success_parcel}
                    </strong>
                    ,{" "}
                    <span className="text-destructive">
                      Cancelled:{" "}
                      <strong>
                        {responseData.courierData.summary.cancelled_parcel}
                      </strong>
                    </span>
                    ,{" "}
                    <span className="text-green-600">
                      Success Ratio:{" "}
                      <strong>
                        {responseData.courierData.summary.success_ratio}%
                      </strong>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerChecker;
