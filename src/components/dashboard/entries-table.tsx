"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

interface Entry {
  id: string
  name: string
  room: string
  meal: string
  timestamp: string
}

interface EntriesTableProps {
  title: string
  description: string
  entries: Entry[]
  limit?: number
  showViewAll?: boolean
  onViewAll?: () => void
}

export function EntriesTable({
  title,
  description,
  entries,
  limit,
  showViewAll = false,
  onViewAll,
}: EntriesTableProps) {
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
                <TableCell>{entry.room}</TableCell>
                <TableCell>{entry.timestamp}</TableCell>
                <TableCell>{entry.meal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {showViewAll && (
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={onViewAll}>
            View All Entries
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
