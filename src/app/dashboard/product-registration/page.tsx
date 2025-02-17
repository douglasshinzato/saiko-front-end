'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { api } from '@/services/api'
import { CategorySelect } from '@/components/category-select'

export default function ProductRegistrationForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    barcode: '',
    brand: '',
    name: '',
    category: '',
    description: '',
    price: '',
    stock: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      barcode: formData.barcode,
      brand: formData.brand,
      name: formData.name,
      category: formData.category,
      description: formData.description ? formData.description : '', // Garante que seja string
      price: Number(formData.price), // Garante que seja número
      stock: formData.stock ? Number(formData.stock) : null, // Mantém `null` se não preenchido
    }

    try {
      await api.post('/products', payload)
      alert('Produto cadastrado com sucesso!')

      // Resetar o formulário
      setFormData({
        barcode: '',
        brand: '',
        name: '',
        category: '',
        description: '',
        price: '',
        stock: '',
      })

      router.push('/dashboard') // Redirecionar
    } catch (error: any) {
      console.error('Erro na requisição:', error)
      alert(
        `Erro ao cadastrar o produto: ${JSON.stringify(
          error.response?.data || error.message
        )}`
      )
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="barcode">Código</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <CategorySelect
            value={formData.category}
            onChange={handleCategoryChange}
          />
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>
              <Input
                className="appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [-moz-appearance:textfield]"
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Estoque</Label>
              <Input
                className="appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [-moz-appearance:textfield]"
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleSubmit}>
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
