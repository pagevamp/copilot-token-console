import * as React from 'react';

import { CheckCircle, Copy } from '@phosphor-icons/react/dist/ssr';
import { Input } from '../shared/input';

function InputWithCopy({
  className,
  type,
  defaultValue,
  ...props
}: React.ComponentProps<'input'>) {
  const [copyToClipboard, setCopyToClipboard] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(defaultValue as string);
    setCopyToClipboard(true);
    setTimeout(() => {
      setCopyToClipboard(false);
    }, 2000);
  };

  return (
    <span className="relative">
      <Input
        className={`${className} pe-[33px] disabled:opacity-80 bg-input/30`}
        type={type}
        defaultValue={defaultValue}
        {...props}
      />
      {defaultValue && defaultValue !== 'undefined' && (
        <span className="absolute right-2 top-1/2 -translate-y-1/2">
          {copyToClipboard ? (
            <span title="Copied">
              <CheckCircle size={20} className="text-[var(--success)]" />
            </span>
          ) : (
            <span title="Copy" className="text-muted-foreground">
              <Copy size={20} onClick={handleCopy} className="cursor-pointer" />
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export default InputWithCopy;
