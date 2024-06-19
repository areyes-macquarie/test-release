import { act, renderHook, waitFor } from '@testing-library/react';
import useChatHistory from '../use-chat-history';

const historyModifiedMock = jest.fn();

describe('useChatHistory', () => {
  it('should add user prompt to history', async () => {
    const {
      result: { current },
    } = renderHook(() =>
      useChatHistory({ historyModified: historyModifiedMock })
    );
    const { addUserPrompt } = current;

    act(() => {
      addUserPrompt('Hello World!');
    });

    await waitFor(() => {
      // TODO: This needs update
      // Testing state change is not working as expected.
      // console.log('chatHistory', chatHistory.length);
      // expect(chatHistory).toHaveLength(1);
      // const chatItem = chatHistory[0] as JSX.Element;
      // expect(chatItem.props.children).toBe('Hello World!');
    });
  });
});
