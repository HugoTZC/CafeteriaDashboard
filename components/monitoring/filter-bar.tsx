"use client"

import { FilterIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface FilterBarProps {
  showOnlyIssues: boolean
  setShowOnlyIssues: (value: boolean) => void
  filterStatus: string
  setFilterStatus: (value: string) => void
}

export function FilterBar({ showOnlyIssues, setShowOnlyIssues, filterStatus, setFilterStatus }: FilterBarProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <FilterIcon className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Filters</h3>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-issues" checked={showOnlyIssues} onCheckedChange={setShowOnlyIssues} />
              <Label htmlFor="show-issues">Show only issues</Label>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="connected">Connected</SelectItem>
                <SelectItem value="disconnected">Disconnected</SelectItem>
                <SelectItem value="powered_off">Powered Off</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

