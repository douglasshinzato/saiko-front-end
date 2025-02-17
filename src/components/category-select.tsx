import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'

const categories = [
  'Anzol',
  'Boné',
  'Bóia',
  'Buff',
  'Calça',
  'Calçado',
  'Camisa',
  'Camiseta',
  'Carretilha',
  'Chapéu',
  'Luva',
  'Suporte',
  'Vara de pesca',
]

interface CategorySelectProps {
  value: string
  onChange: (value: string) => void
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select value={value} onValueChange={onChange} required>
        <SelectTrigger id="category">
          <SelectValue placeholder="Selecione uma categoria" />
        </SelectTrigger>
        <SelectContent>
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
