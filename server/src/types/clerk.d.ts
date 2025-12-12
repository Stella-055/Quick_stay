declare global {
  interface ClerkWebhookEvent {
    data: {
      id: string;
      username?: string;
      email_addresses: { email_address: string }[];
      image_url?: string;
      [key: string]: any;
    };
    type: string;
  }
}

export {};
