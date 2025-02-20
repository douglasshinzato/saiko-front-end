'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
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

export default function ProductUpdate() {
  const router = useRouter()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    // barcode: '',
    brand: '',
    name: '',
    description: '',
    price: '',
  })

  useEffect(() => {
    if (id) {
      fetchProductData(Array.isArray(id) ? id[0] : id)
    }
  }, [id])

  const fetchProductData = async (id: string) => {
    try {
      const response = await api.get(`/products/${id}`)
      const productData = response.data
      setFormData({
        // barcode: productData.barcode,
        brand: productData.brand,
        name: productData.name,
        description: productData.description,
        price: productData.price.toString(),
      })
    } catch (error) {
      console.error('Error fetching product data:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.put(`/products/${id}`, formData)
      console.log('Product updated successfully')
      router.push('/dashboard') // Redirect to dashboard after successful update
    } catch (error) {
      console.error('Error updating product:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Atualizar produto
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
            </div> */}
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
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
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
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Atualizar Produto
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
