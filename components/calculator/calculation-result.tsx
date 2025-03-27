'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DetailedCalculationResult } from '@/types/calculator';
import { Copy } from 'lucide-react';

interface CalculationResultProps {
  result: DetailedCalculationResult;
}

export function CalculationResult({ result }: CalculationResultProps) {
  const { toast } = useToast();

  const generateMarkdownTable = () => {
    const table = [
      '| Показатель | Значение |',
      '|------------|----------|',
      `| Клиент | ${result.client} |`,
      `| Дата | ${new Date(result.date).toLocaleDateString('ru-RU')} |`,
      `| Сумма инвойса | ${result.invoiceAmount.toFixed(2)} ${result.currency} |`,
      `| Курс фиксации | ${result.fixationRate.toFixed(4)} |`,
      `| Сумма поступления | ${result.incomingAmount.toFixed(2)} RUB |`,
      `| Сумма по контракту | ${result.contractAmount.toFixed(2)} RUB |`,
      `| Курсовая разница | ${result.exchangeDifference.toFixed(2)} RUB |`,
      '',
      '| Комиссии | Значение |',
      '|------------|----------|',
      `| За конвертацию | ${result.conversionCommission.toFixed(2)} RUB |`,
      `| Субагента | ${result.subagentCommission.toFixed(2)} RUB |`,
      `| Банковская | ${result.bankCommission.toFixed(2)} RUB |`,
      '',
      '| Вознаграждения | Значение |',
      '|---------------|----------|',
      `| Партнер (${result.partnerRate}%) | ${result.partnerCommission.toFixed(2)} RUB |`,
      `| К выплате партнеру | ${result.paidPartnerFees.toFixed(2)} RUB |`,
      `| Платформа (${result.platformRate}%) | ${result.platformCommission.toFixed(2)} RUB |`,
      `| К выплате платформе | ${result.paidPlatformFees.toFixed(2)} RUB |`,
      '',
      '| Налоги | Значение |',
      '|---------|----------|',
      `| НДС (12%) | ${result.vat.toFixed(2)} RUB |`,
      `| НсП (2%) | ${result.nsp.toFixed(2)} RUB |`,
      `| Налог на прибыль | ${result.incomeTax.toFixed(2)} RUB |`,
      '',
      '| Итоговые показатели | Значение |',
      '|---------------------|----------|',
      `| EBIT | ${result.ebit.toFixed(2)} RUB |`,
      `| Чистая прибыль | ${result.netProfit.toFixed(2)} RUB |`,
      `| USDT эквивалент | ${result.usdtEquivalent.toFixed(2)} USDT |`,
      `| FIAT результат | ${result.fiatResult.toFixed(2)} ${result.currency} |`,
    ].join('\n');

    return table;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMarkdownTable());
    toast({
      title: 'Скопировано',
      description: 'Результаты расчета скопированы в буфер обмена в формате Markdown',
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex justify-end mb-4">
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-2" />
            Копировать как Markdown
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Основная информация */}
          <div className="space-y-2">
            <h4 className="font-medium">Основная информация</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Клиент:</div>
              <div className="font-medium">{result.client}</div>
              <div>Дата:</div>
              <div className="font-medium">
                {new Date(result.date).toLocaleDateString('ru-RU')}
              </div>
              <div>Сумма инвойса:</div>
              <div className="font-medium">
                {result.invoiceAmount.toFixed(2)} {result.currency}
              </div>
            </div>
          </div>

          {/* Курсы */}
          <div className="space-y-2">
            <h4 className="font-medium">Курсы валют</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Курс фиксации:</div>
              <div className="font-medium">{result.fixationRate.toFixed(4)}</div>
              <div>USDT/RUB:</div>
              <div className="font-medium">{result.usdtRate.toFixed(4)}</div>
              <div>FIAT/USDT:</div>
              <div className="font-medium">{result.fiatUsdtRate.toFixed(4)}</div>
              <div>Кросс-курс:</div>
              <div className="font-medium">{result.crossRate.toFixed(4)}</div>
            </div>
          </div>

          {/* Суммы */}
          <div className="space-y-2">
            <h4 className="font-medium">Суммы</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Поступление:</div>
              <div className="font-medium">{result.incomingAmount.toFixed(2)} RUB</div>
              <div>По контракту:</div>
              <div className="font-medium">{result.contractAmount.toFixed(2)} RUB</div>
              <div>Разница:</div>
              <div className="font-medium">{result.exchangeDifference.toFixed(2)} RUB</div>
            </div>
          </div>

          {/* Комиссии */}
          <div className="space-y-2">
            <h4 className="font-medium">Комиссии</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>За конвертацию:</div>
              <div className="font-medium">{result.conversionCommission.toFixed(2)} RUB</div>
              <div>Субагента:</div>
              <div className="font-medium">{result.subagentCommission.toFixed(2)} RUB</div>
              <div>Банковская:</div>
              <div className="font-medium">{result.bankCommission.toFixed(2)} RUB</div>
            </div>
          </div>

          {/* Вознаграждения */}
          <div className="space-y-2">
            <h4 className="font-medium">Вознаграждения</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Партнер ({result.partnerRate}%):</div>
              <div className="font-medium">{result.partnerCommission.toFixed(2)} RUB</div>
              <div>К выплате:</div>
              <div className="font-medium">{result.paidPartnerFees.toFixed(2)} RUB</div>
              <div>Платформа ({result.platformRate}%):</div>
              <div className="font-medium">{result.platformCommission.toFixed(2)} RUB</div>
              <div>К выплате:</div>
              <div className="font-medium">{result.paidPlatformFees.toFixed(2)} RUB</div>
            </div>
          </div>

          {/* Налоги */}
          <div className="space-y-2">
            <h4 className="font-medium">Налоги</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>НДС (12%):</div>
              <div className="font-medium">{result.vat.toFixed(2)} RUB</div>
              <div>НсП (2%):</div>
              <div className="font-medium">{result.nsp.toFixed(2)} RUB</div>
              <div>Налог на прибыль:</div>
              <div className="font-medium">{result.incomeTax.toFixed(2)} RUB</div>
            </div>
          </div>

          {/* Итоги */}
          <div className="space-y-2">
            <h4 className="font-medium">Итоговые показатели</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>EBIT:</div>
              <div className="font-medium">{result.ebit.toFixed(2)} RUB</div>
              <div>Чистая прибыль:</div>
              <div className="font-medium">{result.netProfit.toFixed(2)} RUB</div>
              <div>USDT эквивалент:</div>
              <div className="font-medium">{result.usdtEquivalent.toFixed(2)} USDT</div>
              <div>FIAT результат:</div>
              <div className="font-medium">{result.fiatResult.toFixed(2)} {result.currency}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
