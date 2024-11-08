import chainConfig from '@/chainConfig';
import type { Theme } from '@/recoil/settings/types';
import { defaultTheme, isThemeSupported, themeDictionary } from '@/styles';

const { themes } = chainConfig();

// ================================
// CONSTANTS
// ================================
export const THEME_LIST: Theme[] = themes.themeList;

export const THEME_DICTIONARY = themeDictionary;

export const getThemeTemplate = (theme: Theme, fontFamily: string, buttonFontFamily: string) => {
  if (isThemeSupported(theme)) {
    THEME_DICTIONARY[theme].typography = { ...THEME_DICTIONARY[theme].typography, fontFamily };
    return THEME_DICTIONARY[theme];
  }
  defaultTheme.typography = { ...defaultTheme.typography, fontFamily };
  if (defaultTheme?.components?.MuiButtonBase) {
    defaultTheme.components.MuiButtonBase = {
      ...defaultTheme.components.MuiButtonBase,
      styleOverrides: {
        ...defaultTheme.components.MuiButtonBase.styleOverrides,
        root: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...defaultTheme.components.MuiButtonBase.styleOverrides?.root,
          fontFamily: buttonFontFamily,
        },
      },
    };
  }

  return defaultTheme;
};

export const DATE_LIST = ['locale', 'utc'];

export const TIME_FORMAT_LIST = ['12-hour', '24-hour'];

export const TX_LIST = ['compact', 'detailed'];
