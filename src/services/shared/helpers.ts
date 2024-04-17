export const copyToClipboard = async (input: string) => {
  await navigator.clipboard.writeText(input);
};
