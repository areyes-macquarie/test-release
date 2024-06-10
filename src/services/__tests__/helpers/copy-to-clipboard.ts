import copyToClipboard from '@/services/shared/helpers/copy-to-clipboard';

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe('copyToClipboard', () => {
  it('should call clipboard.writeText', async () => {
    const copyText = 'hello world';
    await copyToClipboard(copyText);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(copyText);
  });
});
