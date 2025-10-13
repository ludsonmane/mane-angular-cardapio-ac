// Tipagem global para window.MA — use UMA vez no projeto
export {};

declare global {
  interface Window {
    MA?: {
      accept?: () => void;
      deny?: () => void;
      setUnit?: (slug: string) => void;
      runIfConsented?: () => void;
      fireNow?: () => void; // opcional para debug
    };
  }
}
