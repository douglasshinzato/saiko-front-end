import { z } from 'zod'

export const createProductSchema = z.object({
  // barcode: z.string().min(1, 'O código de barras é obrigatório'),
  brand: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  price: z.string().nonempty('O preço é obrigatório'),
})

export const updateProductSchema = z
  .object({
    brand: z.string().min(1, 'A marca é obrigatória'),
    name: z.string().min(1, 'O nome do produto é obrigatório'),
    category: z.string().min(1, 'A categoria é obrigatória').optional(),
    description: z.string().optional(),
    price: z.string().min(1, 'O preço é obrigatório'),
  })
  .strict()
