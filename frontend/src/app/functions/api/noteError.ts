export const noteError = (action = '', error: any): void => {
  console.log(`Error for action "${action}":`, error);
  const message =
    `Something went wrong. Could not ${action}.\n\n` +
    `Please try again, or check the console for more information.`;
  alert(message);
};
