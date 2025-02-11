'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function ProductDetails() {
  const router = useRouter()

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Detalhes do produto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold">Venator ACX</h1>
          <span className="text-lg font-medium text-zinc-400">Marine</span>
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-medium">
            R$ 1.550,00
            <span className="text-lg text-zinc-400 ml-2">crédito em 6x</span>
          </p>
          <p className="text-xl font-medium">
            R$ 1.400,00
            <span className="text-lg text-zinc-400 ml-2">
              crédito em à vista
            </span>
          </p>
          <p className="text-xl font-medium">
            R$ 1.200,00
            <span className="text-lg text-zinc-400 ml-2">
              débito ou pix à vista
            </span>
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2">Especificações:</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Característica</TableHead>
                <TableHead>Especificação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Drag</TableCell>
                <TableCell>7kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Sistema de freio</TableCell>
                <TableCell>MAGLEV</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Rolamentos</TableCell>
                <TableCell>10+1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Capaciade de linha
                </TableCell>
                <TableCell>
                  Nylon 0.30-140 / 0.33-115
                  <br />
                  Multi Vexter X8 0.29-110 / 0.35-70
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Relação de recolhimento
                </TableCell>
                <TableCell>8.1:1</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">IPT</TableCell>
                <TableCell>88cm</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Peso</TableCell>
                <TableCell>168g</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="button" className="w-full">
          Editar
        </Button>
        <Button
          variant={'secondary'}
          type="button"
          className="w-full"
          onClick={() => router.back()}
        >
          Voltar
        </Button>
      </CardFooter>
    </Card>
  )
}
