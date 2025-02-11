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
import Link from 'next/link'

// Sample data (replace with your actual data or API call)
const products = [
  {
    id: 1,
    barcode: '123456',
    brand: 'Marine',
    name: 'Liger AC',
    category: 'Carretilha',
    description: 'Drag de 7 Kg',
    price: 199.99,
    stock: 50,
  },
  {
    id: 2,
    barcode: '234567',
    brand: 'Marine',
    name: 'Venator ACX',
    category: 'Carretilha',
    description: 'Drag de 7 Kg',
    price: 49.99,
    stock: 100,
  },
  {
    id: 3,
    barcode: '345678',
    brand: 'Presa Viva',
    name: 'Calça Desert',
    category: 'Roupas',
    description: 'P - GG',
    price: 79.99,
    stock: 30,
  },
  {
    id: 4,
    barcode: '456789',
    brand: 'Daiwa',
    name: 'Zillion TW HD 1000XH',
    category: 'Carretilha',
    description: 'Carretilha',
    price: 299.99,
    stock: 25,
  },
  {
    id: 5,
    barcode: '567890',
    brand: 'Lumis',
    name: 'Infinity 8.0" 50LBS',
    category: 'Vara de pesca',
    description: 'Vara de pesqueiro',
    price: 39.99,
    stock: 75,
  },
  {
    id: 6,
    barcode: '567890',
    brand: 'Redai',
    name: 'Black Mamba',
    category: 'Vara de pesca',
    description: 'Carbono tubular',
    price: 39.99,
    stock: 75,
  },
  {
    id: 7,
    barcode: '567890',
    brand: 'Gamakatsu',
    name: 'Shine SE',
    category: 'Anzol',
    description: 'Description for Product E',
    price: 39.99,
    stock: 75,
  },
  {
    id: 8,
    barcode: '567890',
    brand: 'Meiho',
    name: 'VS-7080N',
    category: 'Bolsa/Caixa',
    description: 'Maleta',
    price: 39.99,
    stock: 75,
  },
  {
    id: 9,
    barcode: '567890',
    brand: 'Ring Star',
    name: 'Dream Master',
    category: 'Estojo',
    description: 'Estojo para isca soft',
    price: 39.99,
    stock: 75,
  },
  {
    id: 10,
    barcode: '567890',
    brand: 'Megabass',
    name: 'Magnum X80',
    category: 'Isca Artificial',
    description: 'Isca para Tucunaré Azul',
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
    <div className=" flex flex-col gap-4 my-4 sm:my-0">
      <h1 className="font-bold text-3xl">Tabela de produtos</h1>
      <Input
        placeholder="Buscar produto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <div className="hidden sm:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden md:table-cell">Código</TableHead>
              <TableHead className="hidden sm:table-cell">Marca</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="hidden lg:table-cell">Descrição</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="hidden sm:table-cell text-right">
                Estoque
              </TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden md:table-cell">
                    {product.barcode}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.brand}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[200px] truncate">
                    {product.description}
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {product.price.toFixed(2)}
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
                        <DropdownMenuLabel>Opções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href="/dashboard/product-update">Editar</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href="/dashboard/product-details">
                            Detalhes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Opções</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard/product-update">Editar</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard/product-details">Detalhes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-sm font-bold mb-1">{product.name}</p>
              <p className="text-sm text-gray-600 mb-1">
                Código: {product.barcode}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Marca: {product.brand}
              </p>
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
      {filteredProducts.length > 0 && (
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
