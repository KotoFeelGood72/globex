export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("ru-RU").format(value);
}

export function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount) + ' ' + currency;
}

export function formatLargeNumber(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} млрд`;
  }
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} млн`;
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(1)} тыс`;
  }
  return formatNumber(value);
}

export function formatShortMoney(amount: number, currency: string): string {
  const absAmount = Math.abs(amount);
  let formattedAmount: string;

  if (absAmount >= 1_000_000_000) {
    formattedAmount = (absAmount / 1_000_000_000).toFixed(2) + ' млрд';
  } else if (absAmount >= 1_000_000) {
    formattedAmount = (absAmount / 1_000_000).toFixed(2) + ' млн';
  } else if (absAmount >= 1_000) {
    formattedAmount = (absAmount / 1_000).toFixed(2) + ' тыс';
  } else {
    formattedAmount = absAmount.toFixed(2);
  }

  return `${formattedAmount} ${currency}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('ru-RU');
}

export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
