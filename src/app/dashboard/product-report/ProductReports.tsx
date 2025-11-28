'use client'

import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
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
  Package, 
  Search, 
  Edit, 
  AlertTriangle,
  TrendingDown,
  Filter,
  Download,
  RefreshCw,
  Plus,
  Minus,
  BarChart3,
  Loader2
} from 'lucide-react'
import { toast } from "sonner"
import Image from 'next/image'

interface Product {
  _id: string
  name: string
  images: string[]
  generalPrice: {
    currentPrice: number
    prevPrice: number
    discountPercentage: number
  }
  priceVariants: Array<{
    _id: string
    regularPrice: number
    salePrice: number
    quentity: number
    sku: string
  }>
  brand: string
  quentity: number
  category: string
  isFeatured: boolean
  hasOffer: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface ProductsResponse {
  success: boolean
  data: Product[]
  pagination?: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function ProductReports() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'critical'>('low')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newQuantity, setNewQuantity] = useState(0)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(stockFilter !== 'all' && { stock: stockFilter }),
        ...(categoryFilter && { category: categoryFilter }),
        sortBy: 'quentity',
        sortOrder: 'asc'
      })

      const response = await fetch(`/api/v1/product/report?${params}`)
      const data: ProductsResponse = await response.json()

      if (data.success) {
        setProducts(data.data)
      } else {
        toast.error('Failed to fetch products')
      }
    } catch (error) {
      toast.error('Error fetching products')
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, stockFilter, categoryFilter])

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 0) {
      toast.error('Quantity cannot be negative')
      return
    }

    setUpdating(productId)
    try {
      const response = await fetch(`/api/v1/product/status/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quentity: quantity }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Product quantity updated successfully')
        setEditDialogOpen(false)
        fetchProducts() // Refresh the data
      } else {
        toast.error(result.message || 'Failed to update quantity')
      }
    } catch (error) {
      toast.error('Error updating product quantity')
      console.error('Error updating quantity:', error)
    } finally {
      setUpdating(null)
    }
  }

  const handleQuickUpdate = async (productId: string, change: number) => {
    const product = products.find(p => p._id === productId)
    if (!product) return

    const newQuantity = Math.max(0, product.quentity + change)
    await handleUpdateQuantity(productId, newQuantity)
  }

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setNewQuantity(product.quentity)
    setEditDialogOpen(true)
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { variant: "destructive" as const, label: "Out of Stock", icon: <Minus className="h-3 w-3" /> }
    } else if (quantity < 10) {
      return { variant: "destructive" as const, label: "Critical", icon: <AlertTriangle className="h-3 w-3" /> }
    } else if (quantity < 30) {
      return { variant: "default" as const, label: "Low Stock", icon: <TrendingDown className="h-3 w-3" /> }
    } else {
      return { variant: "outline" as const, label: "In Stock", icon: <Package className="h-3 w-3" /> }
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading && products.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Product Reports</h1>
          <p className="text-muted-foreground">
            Monitor and manage product inventory and stock levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchProducts} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className='hidden'>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stockFilter">Stock Status</Label>
              <Select value={stockFilter} onValueChange={(value: 'all' | 'low' | 'critical') => setStockFilter(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="low">Low Stock (&lt; 30)</SelectItem>
                  <SelectItem value="critical">Critical (&lt; 10)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryFilter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  {/* Add more categories as needed */}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="limit">Items per page</Label>
              <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 items</SelectItem>
                  <SelectItem value="20">20 items</SelectItem>
                  <SelectItem value="50">50 items</SelectItem>
                  <SelectItem value="100">100 items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-orange-500">
                  {products.filter(p => p.quentity < 30 && p.quentity > 0).length}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-red-500">
                  {products.filter(p => p.quentity < 10 && p.quentity > 0).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-700">
                  {products.filter(p => p.quentity === 0).length}
                </p>
              </div>
              <Minus className="h-8 w-8 text-red-700" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
          <CardDescription>
            {products.length} products found • Manage stock levels and inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const stockStatus = getStockStatus(product.quentity)
                
                return (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images[0] || '/placeholder-product.jpg'}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{product.name}</p>
                          <p className="text-sm text-muted-foreground truncate">
                            SKU: {product.priceVariants[0]?.sku || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{product.brand}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(product.generalPrice.currentPrice)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${
                          product.quentity === 0 ? 'text-red-700' :
                          product.quentity < 10 ? 'text-red-500' :
                          product.quentity < 30 ? 'text-orange-500' :
                          'text-green-600'
                        }`}>
                          {product.quentity}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickUpdate(product._id, -1)}
                            disabled={updating === product._id || product.quentity <= 0}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickUpdate(product._id, 1)}
                            disabled={updating === product._id}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={stockStatus.variant} className="flex items-center gap-1 w-fit">
                        {stockStatus.icon}
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(product.updatedAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                          disabled={updating === product._id}
                          className="gap-1"
                        >
                          {updating === product._id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Edit className="h-3 w-3" />
                          )}
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {products.length === 0 && !loading && (
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} products
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Quantity Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Product Quantity</DialogTitle>
            <DialogDescription>
              Adjust the stock quantity for {selectedProduct?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Image
                  src={selectedProduct.images[0] || '/placeholder-product.jpg'}
                  alt={selectedProduct.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{selectedProduct.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedProduct.brand}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">Current:</span>
                    <Badge variant={getStockStatus(selectedProduct.quentity).variant}>
                      {selectedProduct.quentity} in stock
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">New Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(parseInt(e.target.value) || 0)}
                  placeholder="Enter new quantity"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setNewQuantity(newQuantity - 1)}
                  disabled={newQuantity <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setNewQuantity(newQuantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => selectedProduct && handleUpdateQuantity(selectedProduct._id, newQuantity)}
              disabled={!selectedProduct || updating === selectedProduct._id}
            >
              {updating === selectedProduct?._id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                'Update Quantity'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}