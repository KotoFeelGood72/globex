import { Chip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { Transaction, TransactionStatus, TransactionType } from "@/hooks/use-company-transactions";

const statusColorMap: Record<TransactionStatus, "success" | "warning" | "danger"> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

const typeColorMap: Record<TransactionType, "success" | "danger"> = {
  income: "success",
  outcome: "danger",
};

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Дата",
    cell: ({ row }) => {
      return new Date(row.getValue("date")).toLocaleDateString("ru-RU");
    },
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
  {
    accessorKey: "amount",
    header: "Сумма",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
      }).format(amount);

      return formatted;
    },
  },
  {
    accessorKey: "type",
    header: "Тип",
    cell: ({ row }) => {
      const type: TransactionType = row.getValue("type");
      const label = type === "income" ? "Приход" : "Расход";

      return (
        <Chip
          className="capitalize"
          color={typeColorMap[type]}
          size="sm"
          variant="flat"
        >
          {label}
        </Chip>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => {
      const status: TransactionStatus = row.getValue("status");
      const label = 
        status === "completed" 
          ? "Завершена" 
          : status === "pending" 
          ? "В обработке" 
          : "Ошибка";

      return (
        <Chip
          className="capitalize"
          color={statusColorMap[status]}
          size="sm"
          variant="flat"
        >
          {label}
        </Chip>
      );
    },
  },
];
