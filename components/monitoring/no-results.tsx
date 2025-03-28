"use client"

import { AlertTriangleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface NoResultsProps {
  onReset: () => void
}

export function NoResults({ onReset }: NoResultsProps) {
  return (
    <Card className="md:col-span-2">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertTriangleIcon className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No equipment found</h3>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
        <Button variant="outline" className="mt-4" onClick={onReset}>
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}

