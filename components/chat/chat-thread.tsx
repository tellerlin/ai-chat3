'use client';

import { useChat } from 'ai/react';
import { Message } from './message';
import { ChatInput } from './chat-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export const ChatThread = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">AI Chat</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </header>
      
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={{
                id: message.id,
                content: message.content,
                role: message.role,
                createdAt: new Date(),
              }}
            />
          ))}
        </div>
      </ScrollArea>

      <ChatInput onSubmit={(input) => handleSubmit({ messages, input })} isLoading={isLoading} />
    </div>
  );
};