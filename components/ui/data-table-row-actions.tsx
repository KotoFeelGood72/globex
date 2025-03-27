"use client";

import { Row } from "@tanstack/react-table";
import { Copy, MoreHorizontal, Pen, Eye, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

interface DataTableItem {
  id: string;
  [key: string]: any;
}

export function DataTableRowActions<TData extends DataTableItem>({
  row,
}: DataTableRowActionsProps<TData>) {
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("ID скопирован в буфер обмена");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Открыть меню</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => handleCopy(row.original.id)}>
          <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Копировать ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Просмотр
          <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Редактировать
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
          Удалить
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
