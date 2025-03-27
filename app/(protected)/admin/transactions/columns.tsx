"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@/types/data-table";
import { ArrowUpDown } from "lucide-react";
import { Transaction, BadgeVariant } from "@/types/data-table";
import { Column, Row } from "@tanstack/react-table";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: ({ column }: { column: Column<Transaction> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "companyName",
    header: "Компания",
  },
  {
    accessorKey: "partnerName",
    header: "Партнер",
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }: { row: Row<Transaction> }) => {
      const type = row.getValue("type") as Transaction["type"];
      return (
        <Badge variant={type === "incoming" ? "default" : "secondary"}>
          {type === "incoming" ? "Входящий" : "Исходящий"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }: { column: Column<Transaction> }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Сумма
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: Row<Transaction> }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }: { row: Row<Transaction> }) => {
      const status = row.getValue("status") as Transaction["status"];
      const variants: Record<Transaction["status"], BadgeVariant> = {
        completed: "default",
        pending: "secondary",
        failed: "destructive",
      };
      const labels: Record<Transaction["status"], string> = {
        completed: "Выполнен",
        pending: "В обработке",
        failed: "Ошибка",
      };
      return (
        <Badge variant={variants[status]}>
          {labels[status]}
        </Badge>
      );
    },
  },
];
