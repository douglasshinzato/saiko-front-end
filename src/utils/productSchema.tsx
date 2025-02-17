import { z } from 'zod'

export const productSchema = z.object({
  barcode: z.string().min(1, 'O código de barras é obrigatório'),
  brand: z.string().min(1, 'A marca é obrigatória'),
  name: z.string().min(1, 'O nome do produto é obrigatório'),
  category: z.string().min(1, 'A categoria é obrigatória'),
  description: z.string().optional(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Preço inválido (ex: 10.99)'),
})
