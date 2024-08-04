import { createTokens } from 'tamagui';

const radius = {
  0: 0,
  1: 3,
  2: 5,
  3: 7,
  4: 9,
  true: 9,
  5: 10,
  6: 16,
  7: 19,
  8: 22,
  9: 26,
  10: 34,
  11: 42,
  12: 50,
};

export const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
};

const size = {
  $0: 0,
  '$0.25': 2,
  '$0.5': 4,
  '$0.75': 8,
  $1: 20,
  '$1.5': 24,
  $2: 28,
  '$2.5': 32,
  $3: 36,
  '$3.5': 40,
  $4: 44,
  $true: 44,
  '$4.5': 48,
  $5: 52,
  $6: 64,
  $7: 74,
  $8: 84,
  $9: 94,
  $10: 104,
  $11: 124,
  $12: 144,
  $13: 164,
  $14: 184,
  $15: 204,
  $16: 224,
  $17: 224,
  $18: 244,
  $19: 264,
  $20: 284,
};

type SizeKeysIn = keyof typeof size;
type Sizes = {
  [Key in SizeKeysIn extends `$${infer Key}` ? Key : SizeKeysIn]: number;
};
type SizeKeys = `${keyof Sizes extends `${infer K}` ? K : never}`;

const spaces = Object.entries(size).map(([k, v]) => {
  return [k, sizeToSpace(v)] as const;
});

// a bit odd but keeping backward compat for values >8 while fixing below
function sizeToSpace(v: number) {
  if (v === 0) return 0;
  if (v === 2) return 0.5;
  if (v === 4) return 1;
  if (v === 8) return 1.5;
  if (v <= 16) return Math.round(v * 0.333);
  return Math.floor(v * 0.7 - 12);
}

const spacesNegative = spaces.slice(1).map(([k, v]) => [`-${k.slice(1)}`, -v]);

type SizeKeysWithNegatives =
  | Exclude<`-${SizeKeys extends `$${infer Key}` ? Key : SizeKeys}`, '-0'>
  | SizeKeys;

const space: {
  [Key in SizeKeysWithNegatives]: Key extends keyof Sizes ? Sizes[Key] : number;
} = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative),
} as any;

export const tokens = createTokens({
  color: {
    white: '#fff',
    gray1: '#F1F5F9',
    gray2: '#E2E8F0',
    gray3: '#CBD5E1',
    gray4: '#94A3B8',
    gray5: '#64748B',
    gray6: '#475569',
    gray7: '#334155',
    gray8: '#1E293B',
    gray9: '#121826',
    primary: '#1DAC92',
    primaryHover: '#4ABDA8',
    secondary: '#03314B',
    secondaryHover: '#4A5A82',
    success: '#22C55E',
    warning: '#FACC15',
    error: '#F75555',
    darkgreen: '#228E8E',
    teal: '#2DD4BF',
  },
  // ... see configuration docs for required tokens
  space,
  size,
  radius,
  zIndex,
  icon: {
    sm: 16,
    md: 24,
    lg: 32,
  },
});

const light = {
  background: tokens.color.white,

  backgroundHover: tokens.color.gray3,

  backgroundPress: tokens.color.gray4,

  backgroundFocus: tokens.color.gray5,

  borderColor: tokens.color.gray3,

  borderColorHover: tokens.color.gray6,

  color: tokens.color.gray9,

  colorSecondary: tokens.color.secondary,

  colorHover: tokens.color.secondary,

  colorHoverSecodary: tokens.color.gray9,

  inputField: tokens.color.gray1,

  inputFieldHover: tokens.color.gray2,

  inputFieldPress: tokens.color.gray3,

  inputFieldFocus: tokens.color.gray4,

  inputLabel: tokens.color.gray4,

  inputIcon: tokens.color.gray5,

  empty: tokens.color.gray1,

  selected: tokens.color.secondary,

  button: tokens.color.primary,

  buttonHover: tokens.color.primaryHover,

  buttonDisabled: tokens.color.gray4,

  buttonSecondary: tokens.color.secondary,

  buttonSecondaryHover: tokens.color.secondaryHover,

  buttonSecondaryDisabled: tokens.color.white,
};

type BaseTheme = typeof light;

const dark: BaseTheme = {
  background: tokens.color.gray9,

  backgroundHover: tokens.color.gray8,

  backgroundPress: tokens.color.gray7,

  backgroundFocus: tokens.color.gray7,

  borderColor: tokens.color.gray3,

  borderColorHover: tokens.color.gray4,

  color: tokens.color.white,

  colorSecondary: tokens.color.white,

  colorHover: tokens.color.white,

  colorHoverSecodary: tokens.color.white,

  inputField: tokens.color.gray7,

  inputFieldHover: tokens.color.gray8,

  inputFieldPress: tokens.color.gray8,

  inputFieldFocus: tokens.color.gray8,

  inputLabel: tokens.color.gray4,

  inputIcon: tokens.color.gray5,

  empty: tokens.color.gray5,

  selected: tokens.color.secondary,

  button: tokens.color.primary,

  buttonHover: tokens.color.primaryHover,

  buttonDisabled: tokens.color.gray4,

  buttonSecondary: tokens.color.secondary,

  buttonSecondaryHover: tokens.color.secondaryHover,

  buttonSecondaryDisabled: tokens.color.white,
};
export const allThemes = {
  dark,

  light,
} satisfies { [key: string]: BaseTheme };
