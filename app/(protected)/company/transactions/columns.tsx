"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/data-table-row-actions";
import { Transaction } from "@/types";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать строку"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("id")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сумма" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.getValue("currency") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {amount.toLocaleString()} {currency}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Целевая сумма" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("targetAmount") as number;
      const currency = row.getValue("targetCurrency") as string;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {amount.toLocaleString()} {currency}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Курс" />
    ),
    cell: ({ row }) => {
      const rate = row.getValue("rate") as number;
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate">
            {rate.toFixed(4)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          variant={
            status === "completed" 
              ? "default" 
              : status === "pending" 
                ? "secondary" 
                : "destructive"
          }
        >
          {status === "completed" 
            ? "Завершена" 
            : status === "pending" 
              ? "В обработке" 
              : "Ошибка"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Тип" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant="outline">
          {type === "incoming" ? "Входящая" : "Исходящая"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
