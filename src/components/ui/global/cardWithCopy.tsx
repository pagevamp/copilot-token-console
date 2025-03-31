import { CheckCircle, Copy } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import { Card, CardContent, CardHeader } from '../shared/card';

const CardWithCopy = ({ text }: { text: string }) => {
  const [copyToClipboard, setCopyToClipboard] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopyToClipboard(true);
    setTimeout(() => {
      setCopyToClipboard(false);
    }, 2000);
  };

  return (
    <Card className="w-full border-0 p-0 shadow-none gap-3">
      <CardHeader className="flex justify-end">
        {copyToClipboard ? (
          <span title="Copied">
            <CheckCircle size={20} className="text-[var(--success)]" />
          </span>
        ) : (
          <span title="Copy" className="text-muted-foreground">
            <Copy size={20} onClick={handleCopy} className="cursor-pointer" />
          </span>
        )}
      </CardHeader>
      <CardContent>
        <pre className="text-pretty break-words text-sm">{text}</pre>
      </CardContent>
    </Card>
  );
};

export default CardWithCopy;
