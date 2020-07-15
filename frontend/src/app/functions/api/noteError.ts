export const noteError = ({
  action = '',
  error,
  shouldAlert = false,
}: {
  action: string;
  error: any;
  shouldAlert?: boolean;
}): string => {
  console.log(`Error for action "${action}":`, error);
  const message =
    `Something went wrong. Could not ${action}.\n\n` +
    `Please try again, or check the console for more information.`;
  if (shouldAlert) {
    alert(message);
  }
  return message;
};
