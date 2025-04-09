"use client"

import { X } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"

interface Entry {
  index: string
  id: string
  name: string
  room: string
  meal: string
  timestamp: string
}

interface EntriesModalProps {
  isOpen: boolean
  onClose: () => void
  entries: Entry[]
}

export function EntriesModal({ isOpen, onClose, entries }: EntriesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>All Cafeteria Entries</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>Complete list of all cafeteria check-ins</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 pr-2 -mr-2">
          <Table>
            <TableHeader className="sticky top-0 bg-background">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Tag ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Meal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(entries || []).map((entry) => (
                <TableRow key={entry.index}>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.room}</TableCell>
                  <TableCell>{entry.timestamp}</TableCell>
                  <TableCell>{entry.meal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
