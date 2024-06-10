async function copyToClipboard(input: string) {
  await navigator.clipboard.writeText(input);
}

export default copyToClipboard;
