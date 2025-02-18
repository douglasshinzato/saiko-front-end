'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { productSchema } from '@/utils/productSchema'
import { api } from '@/services/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CategorySelect } from '@/components/category-select'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function ProductRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    // barcode: '',
    brand: '',
    name: '',
    category: '',
    description: '',
    price: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [categoryError, setCategoryError] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, category: value }))
    setCategoryError(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.category) {
      setCategoryError(true)
      return
    }

    // 🔹 Validar os dados com Zod antes de enviar
    const parsed = productSchema.safeParse(formData)

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    // Se passou na validação, transforma os dados corretamente
    const payload = {
      ...parsed.data,
      price: Number(parsed.data.price), // Converte para número
    }

    try {
      await api.post('/products', payload)
      alert('Produto cadastrado com sucesso!')
      setFormData({
        // barcode: '',
        brand: '',
        name: '',
        category: '',
        description: '',
        price: '',
      })
      // router.push('/dashboard')
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error || 'Erro inesperado')
      } else if (error.message) {
        alert(error.message)
      } else {
        alert('Ocorreu um erro desconhecido.')
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Cadastro de produto
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            {/* className="grid grid-cols-2 gap-4" */}
            {/* <div className="space-y-2">
              <Label htmlFor="barcode">Código</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                required
              />
              {errors.barcode && (
                <p className="text-red-500 text-sm">{errors.barcode}</p>
              )}
            </div> */}
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                // required
              />
              {errors.brand && (
                <p className="text-red-500 text-sm">{errors.brand}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              // required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <CategorySelect
            value={formData.category}
            onChange={handleCategoryChange}
          />
          {categoryError && (
            <Alert variant="destructive">
              <AlertDescription>
                Por favor, selecione uma categoria.
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              className="appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [-moz-appearance:textfield]"
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              // required
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Cadastrar Produto
          </Button>
          <Button
            variant="secondary"
            type="button"
            className="w-full"
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
