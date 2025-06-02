"use client"

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import AiChat from '../AiChat/AiChat'
import { useState } from 'react';
import Message from '@/dto/Message';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AiChatPopover() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div className="fixed bottom-4 right-4 z-70">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            className="bg-none rounded-full w-16 h-16 shadow-lg border hover:shadow-xl hover:brightness-85 transition-all duration-200 p-2"
            variant="ghost"
          >
           <img src="/img/RoboterSymbol.png" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[250px] h-[60vh] lg:w-[320px] p-0 shadow-2xl border-2 overflow-hidden rounded-[24px]" 
          sideOffset={20}
        >
          <div className="flex flex-col h-full bg-background">
            <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
              <div className='flex items-center pl-2'>
                <h4 className="font-medium">Entrepreneurship KI Assistant</h4>
              </div>
              <div className="flex items-center pr-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <AiChat 
                welcomeMessage="👋 Hallo! Ich bin dein Entrepreneurship KI-Assistent. Wie kann ich dir weiterhelfen?" 
                messages={messages} // Pass state down
                setMessages={setMessages} // Pass setter down
                input={input} // Pass state down
                setInput={setInput} // Pass setter down
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}