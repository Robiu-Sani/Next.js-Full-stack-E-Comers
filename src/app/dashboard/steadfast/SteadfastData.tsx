'use client'

import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Wallet, 
  Search, 
  Package, 
  Truck, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  BarChart3,
  Loader2
} from 'lucide-react'
import { toast } from "sonner"

interface BalanceData {
  status: number
  current_balance: number
}

interface StatusData {
  status: number
  delivery_status: string
}

interface SteadfastResponse {
  success: boolean
  data?: BalanceData | StatusData
  message?: string
}

const DELIVERY_STATUS_CONFIG: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline" | "success", label: string, icon: React.ReactNode } } = {
  pending: { 
    variant: "outline", 
    label: "Pending", 
    icon: <Clock className="h-3 w-3" />
  },
  delivered_approval_pending: { 
    variant: "secondary", 
    label: "Delivered - Approval Pending", 
    icon: <CheckCircle className="h-3 w-3" />
  },
  partial_delivered_approval_pending: { 
    variant: "secondary", 
    label: "Partial Delivered - Approval Pending", 
    icon: <CheckCircle className="h-3 w-3" />
  },
  cancelled_approval_pending: { 
    variant: "destructive", 
    label: "Cancelled - Approval Pending", 
    icon: <XCircle className="h-3 w-3" />
  },
  unknown_approval_pending: { 
    variant: "outline", 
    label: "Unknown - Approval Pending", 
    icon: <AlertCircle className="h-3 w-3" />
  },
  delivered: { 
    variant: "success", 
    label: "Delivered", 
    icon: <CheckCircle className="h-3 w-3" />
  },
  partial_delivered: { 
    variant: "success", 
    label: "Partial Delivered", 
    icon: <CheckCircle className="h-3 w-3" />
  },
  cancelled: { 
    variant: "destructive", 
    label: "Cancelled", 
    icon: <XCircle className="h-3 w-3" />
  },
  hold: { 
    variant: "outline", 
    label: "Hold", 
    icon: <Clock className="h-3 w-3" />
  },
  in_review: { 
    variant: "secondary", 
    label: "In Review", 
    icon: <Package className="h-3 w-3" />
  },
  unknown: { 
    variant: "outline", 
    label: "Unknown", 
    icon: <AlertCircle className="h-3 w-3" />
  }
}

export default function SteadfastData() {
  const [activeTab, setActiveTab] = useState('balance')
  const [loading, setLoading] = useState(false)
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null)
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [searchType, setSearchType] = useState<'trackingCode' | 'invoice' | 'consignmentId'>('trackingCode')
  const [searchValue, setSearchValue] = useState('')
  const [searchHistory, setSearchHistory] = useState<Array<{type: string, value: string, status: string, timestamp: string}>>([])

  const fetchBalance = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/v1/steadfast?action=balance`)
      const result: SteadfastResponse = await response.json()

      if (result.success && result.data) {
        setBalanceData(result.data as BalanceData)
        toast.success('Balance fetched successfully')
      } else {
        toast.error(result.message || 'Failed to fetch balance')
      }
    } catch (error) {
      toast.error('Error fetching balance data')
      console.error('Error fetching balance:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStatus = async () => {
    if (!searchValue.trim()) {
      toast.error('Please enter a search value')
      return
    }

    try {
      setLoading(true)
      let url = ''
      
      switch (searchType) {
        case 'trackingCode':
          url = `/api/v1/steadfast?action=status&trackingCode=${encodeURIComponent(searchValue)}`
          break
        case 'invoice':
          url = `/api/v1/steadfast?action=status&invoice=${encodeURIComponent(searchValue)}`
          break
        case 'consignmentId':
          url = `/api/v1/steadfast?action=status&consignmentId=${encodeURIComponent(searchValue)}`
          break
      }

      const response = await fetch(url)
      const result: SteadfastResponse = await response.json()

      if (result.success && result.data) {
        const statusResult = result.data as StatusData
        setStatusData(statusResult)
        
        // Add to search history
        setSearchHistory(prev => [{
          type: searchType,
          value: searchValue,
          status: statusResult.delivery_status,
          timestamp: new Date().toLocaleString()
        }, ...prev.slice(0, 9)]) // Keep last 10 searches
        
        toast.success('Status fetched successfully')
      } else {
        toast.error(result.message || 'Failed to fetch status')
      }
    } catch (error) {
      toast.error('Error fetching status data')
      console.error('Error fetching status:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const config = DELIVERY_STATUS_CONFIG[status] || { 
      variant: "outline" as const, 
      label: status, 
      icon: <AlertCircle className="h-3 w-3" />
    }
    
    return (
      <Badge  className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    toast.success('Search history cleared')
  }

  useEffect(() => {
    if (activeTab === 'balance') {
      fetchBalance()
    }
  }, [activeTab])

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Steadfast Courier</h1>
          <p className="text-muted-foreground">
            Manage and track Steadfast courier operations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={activeTab === 'balance' ? fetchBalance : fetchStatus} 
            variant="outline" 
            className="gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Account Balance
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Track Status
          </TabsTrigger>
        </TabsList>

        {/* Balance Tab */}
        <TabsContent value="balance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Current Balance
              </CardTitle>
              <CardDescription>
                Your current Steadfast courier account balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : balanceData ? (
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
                    <div className="text-4xl font-bold">
                      {formatCurrency(balanceData.current_balance)}
                    </div>
                    <p className="text-blue-100 mt-2">Available Balance</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(balanceData.current_balance)}
                        </div>
                        <p className="text-sm text-muted-foreground">Current Balance</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-blue-600">
                          Active
                        </div>
                        <p className="text-sm text-muted-foreground">Account Status</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-orange-600">
                          Steadfast
                        </div>
                        <p className="text-sm text-muted-foreground">Courier Service</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold">No Balance Data</h3>
                  <p className="text-muted-foreground">
                    Unable to fetch balance information. Please try again.
                  </p>
                  <Button onClick={fetchBalance} className="mt-4">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retry
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Track Delivery Status
              </CardTitle>
              <CardDescription>
                Check the current status of your Steadfast courier shipments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="searchType">Search By</Label>
                    <Select value={searchType} onValueChange={(value: 'trackingCode' | 'invoice' | 'consignmentId') => setSearchType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trackingCode">Tracking Code</SelectItem>
                        <SelectItem value="invoice">Invoice ID</SelectItem>
                        <SelectItem value="consignmentId">Consignment ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="searchValue">
                      {searchType === 'trackingCode' && 'Tracking Code'}
                      {searchType === 'invoice' && 'Invoice ID'}
                      {searchType === 'consignmentId' && 'Consignment ID'}
                    </Label>
                    <Input
                      id="searchValue"
                      placeholder={
                        searchType === 'trackingCode' ? 'Enter tracking code...' :
                        searchType === 'invoice' ? 'Enter invoice ID...' :
                        'Enter consignment ID...'
                      }
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && fetchStatus()}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={fetchStatus} 
                      disabled={loading || !searchValue.trim()}
                      className="w-full"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      Search
                    </Button>
                  </div>
                </div>

                {/* Status Result */}
                {statusData && (
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Delivery Status</h4>
                          <p className="text-sm text-muted-foreground">
                            {searchType}: {searchValue}
                          </p>
                        </div>
                        {getStatusBadge(statusData.delivery_status)}
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Status Code:</span>{' '}
                          <Badge variant="outline">{statusData.status}</Badge>
                        </div>
                        <div>
                          <span className="font-medium">Last Updated:</span>{' '}
                          <span>{new Date().toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* No Results */}
                {!statusData && !loading && (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No Status Data</h3>
                    <p className="text-muted-foreground">
                      Enter a tracking code, invoice ID, or consignment ID to check status
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Search History
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={clearSearchHistory}>
                    Clear History
                  </Button>
                </div>
                <CardDescription>
                  Recent status checks (last 10 searches)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchHistory.map((search, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium capitalize">
                          {search.type.replace(/([A-Z])/g, ' $1').trim()}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {search.value}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(search.status)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {search.timestamp}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Status Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Status Legend
          </CardTitle>
          <CardDescription>
            Understanding Steadfast delivery statuses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(DELIVERY_STATUS_CONFIG).map(([status, config]) => (
              <div key={status} className="flex items-center gap-2 p-2 border rounded-lg">
                <Badge  className="flex items-center gap-1">
                  {config.icon}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{config.label}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {status.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}