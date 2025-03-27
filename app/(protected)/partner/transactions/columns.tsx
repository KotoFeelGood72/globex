import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type PartnerTransaction = {
  id: string;
  companyName: string;
  type: "exchange" | "transfer";
  status: "pending" | "completed" | "rejected";
  amount: number;
  currency: string;
  targetAmount: number;
  targetCurrency: string;
  rate: number;
  commission: number;
  createdAt: string;
};

export const columns: ColumnDef<PartnerTransaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "companyName",
    header: "Компания",
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type = row.getValue("type") as PartnerTransaction["type"];
      const typeMap = {
        exchange: "Обмен",
        transfer: "Перевод",
      };

      return <div>{typeMap[type]}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status = row.getValue("status") as PartnerTransaction["status"];
      const statusMap = {
        pending: "На рассмотрении",
        completed: "Завершено",
        rejected: "Отклонено",
      };

      return (
        <Badge variant={status === "completed" ? "success" : status === "rejected" ? "destructive" : "secondary"}>
          {statusMap[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
      const currency = row.getValue("currency") as string;
      return (
        <div>
          {new Intl.NumberFormat("ru-RU", { style: "currency", currency }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "targetAmount",
    header: "Целевая сумма",
    cell: ({ row }) => {
      const amount = row.getValue("targetAmount") as number;
      const currency = row.getValue("targetCurrency") as string;
      return (
        <div>
          {new Intl.NumberFormat("ru-RU", { style: "currency", currency }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "rate",
    header: "Курс",
    cell: ({ row }) => {
      const rate = row.getValue("rate") as number;
      return <div>{rate.toFixed(4)}</div>;
    },
  },
  {
    accessorKey: "commission",
    header: "Комиссия партнера",
    cell: ({ row }) => {
      const commission = row.getValue("commission") as number;
      return <div>{commission}%</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Дата",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleDateString("ru-RU");
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Открыть меню</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Действия</DropdownMenuLabel>
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span>Просмотреть детали</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Экспортировать</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
