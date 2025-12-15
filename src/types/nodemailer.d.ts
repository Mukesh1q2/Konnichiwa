// Simple nodemailer stub for TypeScript
declare module 'nodemailer' {
  interface TransporterConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  }

  interface EmailAttachment {
    filename: string;
    content?: Buffer | string;
    path?: string;
    contentType?: string;
  }

  interface SendMailOptions {
    from: string;
    to: string | string[];
    subject: string;
    html?: string;
    text?: string;
    attachments?: EmailAttachment[];
  }

  export function createTransporter(config: TransporterConfig): {
    sendMail(options: SendMailOptions): Promise<any>;
  };
}