interface UmamiTrackPayload {
  website?: string;
  hostname?: string;
  language?: string;
  referrer?: string;
  screen?: string;
  title?: string;
  url?: string;
}

interface UmamiEventData {
  [key: string]: string | number | boolean;
}

interface Umami {
  track(event?: string, data?: UmamiEventData): void;
  track(payload?: UmamiTrackPayload): void;
  identify(data: UmamiEventData): void;
}

declare global {
  interface Window {
    umami: Umami;
  }
}

export {};
