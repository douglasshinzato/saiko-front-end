import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

const categories = [
  'Acessórios',
  'Anzol',
  'Bóia',
  'Bolsa',
  'Boné',
  'Caixa',
  'Calça',
  'Calçado',
  'Camisa',
  'Camiseta',
  'Carretilha',
  'Chapéu',
  'Estojo',
  'Garateia',
  'Isca artificial',
  'Luva',
  'Mochila',
  'Molinete',
  'Outros',
  'Suporte',
  'Vara de pesca',
].sort() // Ordena as categorias em ordem alfabética

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger id="category">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px]">
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
