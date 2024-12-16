import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/lib/openai';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

export const Message = ({ message }: { message: ChatMessage }) => {
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightAllUnder(codeRef.current);
    }
  }, [message.content]);

  return (
    <div
      className={cn(
        'flex w-full items-start gap-4 p-6',
        message.role === 'assistant' ? 'bg-muted/50' : 'bg-background'
      )}
      ref={codeRef}
    >
      <Avatar className="h-8 w-8">
        {message.role === 'assistant' ? (
          <Bot className="h-5 w-5" />
        ) : (
          <User className="h-5 w-5" />
        )}
      </Avatar>
      <div className="flex-1 space-y-2">
        <Markdown
          options={{
            overrides: {
              pre: {
                component: ({ children, ...props }) => (
                  <div className="relative group">
                    <pre {...props} className="my-4 p-4 bg-muted rounded-lg overflow-x-auto">
                      {children}
                    </pre>
                    <button
                      onClick={() => {
                        const code = (children as any).props.children;
                        navigator.clipboard.writeText(code);
                      }}
                      className="absolute top-2 right-2 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground"
                    >
                      Copy
                    </button>
                  </div>
                ),
              },
              code: {
                component: ({ children, className }) => (
                  <code className={cn('bg-muted px-1.5 py-0.5 rounded-md', className)}>
                    {children}
                  </code>
                ),
              },
            },
          }}
        >
          {message.content}
        </Markdown>
      </div>
    </div>
  );
};