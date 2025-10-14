declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    __MA_FB_INIT__?: boolean;
  }
}
export {};
