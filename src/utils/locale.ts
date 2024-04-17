import { TCurrencyCode } from './currency';

type TLocale = 'en-US' | 'en-GB' | 'ja-JP' | 'pt-BR';

export function getLocaleFromCode(currencyCode: TCurrencyCode): TLocale {
  const localeMap: { [key in TCurrencyCode]: TLocale } = {
    BRL: 'pt-BR',
    USD: 'en-US',
    CAD: 'en-US',
    AUD: 'en-US',
    NZD: 'en-US',
    EUR: 'en-GB',
    GBP: 'en-GB',
    CHF: 'en-GB',
    SEK: 'en-GB',
    NOK: 'en-GB',
    JPY: 'ja-JP',
  };

  return localeMap[currencyCode] || 'en-US';
}
