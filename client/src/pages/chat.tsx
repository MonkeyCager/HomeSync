import { useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Send, 
  Paperclip,
  Smile,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_CHATS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(1);
  const [messageInput, setMessageInput] = useState("");

  const selectedChat = MOCK_CHATS.find(c => c.id === selectedChatId) || MOCK_CHATS[0];

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Chat List Sidebar */}
      <div className={cn(
        "w-full md:w-80 lg:w-96 border-r flex flex-col bg-background transition-all duration-300",
        selectedChatId ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b space-y-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9 bg-muted/50 border-none" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Badge variant="default" className="cursor-pointer">All</Badge>
            <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Unread</Badge>
            <Badge variant="outline" className="cursor-pointer whitespace-nowrap">Professionals</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {MOCK_CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={cn(
                  "flex items-start gap-3 p-4 text-left transition-colors hover:bg-muted/50 border-b border-border/40 last:border-0",
                  selectedChatId === chat.id ? "bg-muted" : ""
                )}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  {chat.unread && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-primary border-2 border-background" />
                  )}
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={cn("font-medium truncate", chat.unread ? "text-foreground" : "text-foreground/90")}>
                      {chat.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                     <Badge variant="secondary" className="text-[10px] h-4 px-1">{chat.role}</Badge>
                  </div>
                  <p className={cn("text-sm truncate", chat.unread ? "font-semibold text-foreground" : "text-muted-foreground")}>
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-muted/30 w-full transition-all duration-300",
        !selectedChatId ? "hidden md:flex" : "flex"
      )}>
        {/* Chat Header */}
        <div className="h-16 border-b bg-background flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="md:hidden -ml-2" onClick={() => setSelectedChatId(null)}>
              <Search className="h-5 w-5 rotate-90" /> {/* Back icon placeholder */}
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src={selectedChat.avatar} />
              <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{selectedChat.name}</h3>
              <p className="text-xs text-muted-foreground">{selectedChat.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6 max-w-3xl mx-auto">
             <div className="flex justify-center">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Today</span>
             </div>

             {/* Received Message */}
             <div className="flex gap-3">
               <Avatar className="h-8 w-8 mt-1">
                 <AvatarImage src={selectedChat.avatar} />
                 <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
               </Avatar>
               <div className="flex flex-col gap-1 max-w-[80%]">
                 <div className="bg-white border border-border/50 rounded-2xl rounded-tl-none p-3 shadow-sm">
                   <p className="text-sm">{selectedChat.lastMessage}</p>
                 </div>
                 <span className="text-xs text-muted-foreground ml-1">{selectedChat.time}</span>
               </div>
             </div>

             {/* Sent Message (Mock) */}
             <div className="flex gap-3 flex-row-reverse">
               <div className="flex flex-col gap-1 items-end max-w-[80%]">
                 <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-3 shadow-md">
                   <p className="text-sm">That sounds great! I'll be there.</p>
                 </div>
                 <div className="flex items-center gap-1 text-xs text-muted-foreground mr-1">
                   <span>10:32 AM</span>
                   <Check className="h-3 w-3" />
                 </div>
               </div>
             </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 bg-background border-t">
          <div className="max-w-3xl mx-auto flex items-end gap-2 bg-muted/50 p-1.5 rounded-3xl border focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-background shrink-0">
               <Paperclip className="h-5 w-5" />
             </Button>
             <Input 
               className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent min-h-[40px] py-2.5 px-2" 
               placeholder="Type a message..." 
               value={messageInput}
               onChange={(e) => setMessageInput(e.target.value)}
             />
             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-background shrink-0">
               <Smile className="h-5 w-5" />
             </Button>
             <Button 
               size="icon" 
               className="h-9 w-9 rounded-full shrink-0" 
               disabled={!messageInput}
             >
               <Send className="h-4 w-4" />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}