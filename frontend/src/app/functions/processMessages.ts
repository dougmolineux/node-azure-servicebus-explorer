export const processMessages = (messages: any[] = []): string[] =>
  messages?.flatMap((x: any): string => x?.[0]?.body ?? []) ?? [];
