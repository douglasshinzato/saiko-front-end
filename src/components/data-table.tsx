'use client'

import * as React from 'react'
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Sample data (replace with your actual data or API call)
const products = [
  {
    id: 1,
    barcode: '123456',
    brand: 'Marine',
    name: 'Liger AC',
    description: 'Carretilha',
    price: 199.99,
    stock: 50,
  },
  {
    id: 2,
    barcode: '234567',
    brand: 'Marine',
    name: 'Venator ACX',
    description: 'Carretilha',
    price: 49.99,
    stock: 100,
  },
  {
    id: 3,
    barcode: '345678',
    brand: 'Presa Viva',
    name: 'Calça que vira bermuda',
    description: 'P - GG',
    price: 79.99,
    stock: 30,
  },
  {
    id: 4,
    barcode: '456789',
    brand: 'Daiwa',
    name: 'Zillion TW HD 1000XH',
    description: 'Carretilha',
    price: 299.99,
    stock: 25,
  },
  {
    id: 5,
    barcode: '567890',
    brand: 'Lumis',
    name: 'Infinity 8.0" 50LBS',
    description: 'Vara de pesqueiro',
    price: 39.99,
    stock: 75,
  },
  {
    id: 6,
    barcode: '567890',
    brand: 'BrandB',
    name: 'Product E',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  {
    id: 7,
    barcode: '567890',
    brand: 'BrandB',
    name: 'Product E',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  {
    id: 8,
    barcode: '567890',
    brand: 'BrandB',
    name: 'Product E',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  {
    id: 9,
    barcode: '567890',
    brand: 'BrandB',
    name: 'Product E',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  {
    id: 10,
    barcode: '567890',
    brand: 'BrandB',
    name: 'Product E',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  // Add more products as needed
]

export function DataTable() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  return (
    <div className="w-full flex flex-col gap-4 my-4 sm:my-0">
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />

      <div className="hidden sm:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="hidden md:table-cell">Barcode</TableHead>
              <TableHead className="hidden sm:table-cell">Brand</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden lg:table-cell">
                Description
              </TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="hidden sm:table-cell text-right">
                Stock
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.barcode}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {product.brand}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                  {product.description}
                </TableCell>
                <TableCell className="text-right">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right">
                  {product.stock}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card view */}
      <div className="flex flex-col gap-2 sm:hidden">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="rounded-lg border p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{product.brand}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm font-bold mb-1">{product.name}</p>
            <p className="text-sm text-gray-600 mb-1">
              Barcode: {product.barcode}
            </p>
            <p className="text-sm text-gray-600 mb-1">Brand: {product.brand}</p>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm font-medium">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">
                Estoque: {product.stock}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
