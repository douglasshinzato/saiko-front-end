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
import { Alert, AlertDescription } from '@/components/ui/alert'
import { api } from '@/services/api'
import { updateProductSchema } from '@/utils/productSchema'

export default function ProductUpdate() {
  const router = useRouter()
  const { id } = useParams()

  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    description: '',
    price: '',
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

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
        brand: productData.brand,
        name: productData.name,
        description: productData.description,
        price: productData.price,
      })
    } catch (error) {
      console.error('Erro ao buscar produto:', error)
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
    setErrors({})

    const parsed = updateProductSchema.safeParse(formData)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      parsed.error.errors.forEach((err: any) => {
        fieldErrors[err.path[0]] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    try {
      await api.put(`/products/${id}`, parsed.data)
      alert('Produto atualizado com sucesso!')
      router.push('/dashboard')
    } catch (error: any) {
      if (error.response) {
        const responseData = error.response.data
        if (responseData.details && Array.isArray(responseData.details)) {
          const formattedErrors: { [key: string]: string } = {}
          responseData.details.forEach((err: any) => {
            formattedErrors[err.field] = err.message
          })
          setErrors(formattedErrors)
          return
        }
        alert(responseData.error || 'Erro inesperado')
      } else {
        alert(error.message || 'Ocorreu um erro desconhecido.')
      }
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
          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do produto</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
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
              id="price"
              name="price"
              type="text"
              value={formData.price}
              onChange={handleChange}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
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
