const processMessage = (x: any): any => {
  const body: any = x?.[0]?.body ?? null;
  return body === null
    ? []
    : typeof body === 'string'
    ? body
    : JSON.stringify(body);
};

export const processMessages = (messages: any[] = []): string[] =>
  messages?.flatMap(processMessage) ?? [];
