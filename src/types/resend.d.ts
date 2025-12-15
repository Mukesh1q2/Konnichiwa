// Simple resend stub for TypeScript
declare module 'resend' {
  interface ResendEmailData {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    attachments?: any[];
  }

  interface ResendResponse {
    id: string;
    error?: any;
  }

  export class Resend {
    constructor(apiKey: string);
    emails: {
      send(data: ResendEmailData): Promise<ResendResponse>;
    };
  }
}