// typings.d.ts
declare module 'react-gauge-component' {
    export interface TickLabels {
      valueConfig?: {
        formatTextValue: (value: any) => string;
        fontSize: number;
      };
    }
  }
  