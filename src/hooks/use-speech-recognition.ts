import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const errorMessages = new Map<SpeechRecognitionErrorCode, string>([
  ['language-not-supported', 'Speech recognition: Language is not supported.'],
  ['network', 'Speech recognition: Network error occurred.'],
  ['not-allowed', 'Speech recognition: Audio device access is restricted.'],
  ['service-not-allowed', 'Speech recognition: Service is not allowed.'],
]);

function useSpeechRecognition(config?: { suppressErrors?: boolean }) {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    let isMounted = true;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const recognitionInstance = new (window.webkitSpeechRecognition ||
        window.SpeechRecognition)();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.maxAlternatives = 1;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        if (!isMounted) return;
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        recognitionInstance.stop();
        setIsListening(false);
      };

      recognitionInstance.onstart = () => {
        if (!isMounted) return;
        setText('');
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        if (!isMounted) return;
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error(event);
        if (!isMounted) return;
        if (errorMessages.has(event.error)) {
          setRecognition(null);
          if (!config?.suppressErrors) {
            toast.error(errorMessages.get(event.error));
          }
        }
      };

      setRecognition(recognitionInstance);
    }

    return () => {
      isMounted = false;
      recognition?.stop();
      setRecognition(null);
    };
  }, []);

  const startListening = () => {
    if (!isListening) {
      recognition?.start();
    }
  };

  const stopListening = () => {
    if (isListening) {
      recognition?.stop();
    }
  };

  return {
    text,
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  };
}

export default useSpeechRecognition;
