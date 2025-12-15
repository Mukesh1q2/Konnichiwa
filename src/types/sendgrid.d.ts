// Simple SendGrid stub for TypeScript
declare module '@sendgrid/mail' {
  interface SendGridEmail {
    to: string | string[];
    from: string;
    subject: string;
    html?: string;
    text?: string;
    attachments?: any[];
  }

  interface SendGridResponse {
    statusCode: number;
    headers: Record<string, string>;
    body: any;
  }

  const sgMail: {
    setApiKey(apiKey: string): void;
    send(email: SendGridEmail): Promise<SendGridResponse>;
    sendMultiple(emails: SendGridEmail[]): Promise<SendGridResponse[]>;
  };

  export = sgMail;
}