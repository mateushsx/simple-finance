import { getLocaleFromCode } from './locale';

export type TCurrencyCode =
  | 'USD'
  | 'EUR'
  | 'JPY'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'SEK'
  | 'NOK'
  | 'BRL';

export function formatCurrency(
  value: number,
  currencyCode: TCurrencyCode
): string {
  const locale = getLocaleFromCode(currencyCode);
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  });

  return formatter.format(value);
}
