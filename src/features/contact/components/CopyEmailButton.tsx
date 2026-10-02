'use client';

import { useRef, useState } from 'react';
import { button } from '@/shared/ui/button';

type Props = {
  email: string;
  /** Element showing the address. It gets selected for a manual copy when the clipboard is blocked. */
  textId: string;
};

/** Copies the email address and says so for two seconds. */
export function CopyEmailButton({ email, textId }: Props) {
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const flash = (message: string) => {
    setStatus(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(''), 2000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      flash('Copied');
    } catch {
      // No clipboard (insecure origin, denied permission): select the text so Ctrl/Cmd+C works.
      const text = document.getElementById(textId);
      if (text) window.getSelection()?.selectAllChildren(text);
      flash('Email selected');
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={button('paper')}>
        Copy email
      </button>
      <p role="status" className="font-hand text-xl text-studio">
        {status}
      </p>
    </>
  );
}
