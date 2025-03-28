import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Entry {
  id: string
  name: string
  tagId: string
  timestamp: string
  meal: string
}

interface EntriesTableProps {
  title: string
  description: string
  entries: Entry[]
  limit?: number
  showViewAll?: boolean
}

export function EntriesTable({ title, description, entries, limit, showViewAll = false }: EntriesTableProps) {
  const displayEntries = limit ? entries.slice(0, limit) : entries

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Tag ID</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Meal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.name}</TableCell>
                <TableCell>{entry.tagId}</TableCell>
                <TableCell>{entry.timestamp}</TableCell>
                <TableCell>{entry.meal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {showViewAll && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            View All Entries
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

