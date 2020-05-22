export const processMessages = (msgs: any[] = []): string[] =>
  msgs?.flatMap((x: any): string => x?.[0]?.body ?? []) ?? [];
