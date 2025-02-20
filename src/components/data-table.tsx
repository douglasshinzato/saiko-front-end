'use client'

import React, { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/services/api'

interface Product {
  id: string
  barcode: string
  name: string
  description: string
  price: number
  brand: string
  category: string
}

export function DataTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product
    direction: 'ascending' | 'descending'
  } | null>(null)
  const itemsPerPage = 5

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/products')
        setProducts(response.data)
      } catch (error: unknown) {
        console.error('Erro ao buscar produtos:', error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter((product) =>
    Object.values(product).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedProducts = React.useMemo(() => {
    const sortableProducts = [...filteredProducts]
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableProducts
  }, [filteredProducts, sortConfig])

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const requestSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
    setCurrentPage(1) // Reset to first page when sorting
  }

  return (
    <div className="flex flex-col gap-4 my-4 sm:my-0">
      <h1 className="font-bold text-3xl">Tabela de produtos</h1>
      <Input
        placeholder="Buscar produto..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
          setCurrentPage(1) // Reset to first page when searching
        }}
        className="w-full"
      />

      <div className="hidden sm:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell">Marca</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => requestSort('name')}
                  className="w-full justify-start font-medium text-left flex items-center"
                >
                  Nome
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden lg:table-cell">Descrição</TableHead>
              <TableHead className="text-right">Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    {product.brand}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                    {product.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(product.price))}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <p className="text-lg font-medium text-gray-600">
                    Produto não encontrado
                  </p>
                  <p className="text-sm text-gray-500">
                    Tente buscar por outro termo ou verifique se o produto está
                    cadastrado.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile card view */}
      <div className="flex flex-col gap-2 sm:hidden">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div key={product.id} className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{product.brand}</span>
              </div>
              <p className="text-sm font-bold mb-1">{product.name}</p>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(Number(product.price))}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border p-4 text-center py-8">
            <p className="text-lg font-medium text-gray-600">
              Produto não encontrado
            </p>
            <p className="text-sm text-gray-500">
              Tente buscar por outro termo ou verifique se o produto está
              cadastrado.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {sortedProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
