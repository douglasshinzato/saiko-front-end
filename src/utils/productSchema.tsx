import { z } from 'zod'

export const productSchema = z.object({
  // barcode: z.string().min(1, 'O código de barras é obrigatório'),
  brand: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().optional(),
  price: z.string(),
})
