'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, X, Send, Minimize2, Check } from 'lucide-react'
import Chatbot from '@/lib/chatbot'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  id: string
}

export default function ChatbotComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [showChatButton, setShowChatButton] = useState(true)
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null)
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  // Auto-scroll to bottom when messages change or when loading state changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Use the Chatbot function directly
      const response = await Chatbot(input.trim())
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact us directly at codebiruny@gmail.com',
        timestamp: new Date(),
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    setCopiedMessageId(null)
    setEditingMessageId(null)
  }

  const openChat = () => {
    setIsOpen(true)
    setShowChatButton(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setShowChatButton(true)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const handleCopyMessage = (messageId: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedMessageId(messageId)
    setTimeout(() => setCopiedMessageId(null), 2000)
  }

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId)
    setEditContent(content)
  }

  const handleSaveEdit = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, content: editContent } : msg
    ))
    setEditingMessageId(null)
    setEditContent('')
  }

  const handleCancelEdit = () => {
    setEditingMessageId(null)
    setEditContent('')
  }

  const formatMessage = (content: string) => {
    let formattedContent = content;

    // Convert markdown links [text](url) to clickable links
    formattedContent = formattedContent.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="inline-link" style="color: #ea580c; text-decoration: underline; font-weight: 500;">$1</a>'
    );

    // Convert * bullet points to proper • points
    formattedContent = formattedContent.replace(/^\*\s+/gm, '• ');

    // Convert markdown-style formatting to HTML
    formattedContent = formattedContent
      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>');

    // Function to extract domain from URL
    const getDomainFromUrl = (url: string): string => {
      try {
        const domain = url.replace(/^https?:\/\//, '').split('/')[0];
        return domain.startsWith('www.') ? domain.substring(4) : domain;
      } catch {
        return url;
      }
    };

    // Function to format phone numbers
    const formatPhoneNumber = (phone: string): string => {
      const cleaned = phone.replace(/[^\d+]/g, '');
      if (cleaned.startsWith('+')) {
        return cleaned;
      } else if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      } else {
        return cleaned;
      }
    };

    // Detect and convert URLs
    formattedContent = formattedContent.replace(
      /(https?:\/\/[^\s]+)/g,
      (url) => {
        const domain = getDomainFromUrl(url);
        return `<a href="${url}" class="inline-link url-link" style="color: #ea580c; text-decoration: underline; font-weight: 500;">${domain}</a>`;
      }
    );

    // Detect and convert email addresses
    formattedContent = formattedContent.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      (email) => {
        return `<a href="mailto:${email}" class="inline-link email-link" style="color: #ea580c; text-decoration: underline; font-weight: 500;">${email}</a>`;
      }
    );

    // Detect and convert phone numbers
    formattedContent = formattedContent.replace(
      /(\+?[\d\s\-\(\)]{10,})/g,
      (phone) => {
        const digitCount = phone.replace(/[^\d]/g, '').length;
        if (digitCount >= 10) {
          const formattedPhone = formatPhoneNumber(phone);
          return `<a href="tel:${phone.replace(/[^\d+]/g, '')}" class="inline-link phone-link" style="color: #ea580c; text-decoration: underline; font-weight: 500;">${formattedPhone}</a>`;
        }
        return phone;
      }
    );

    // Convert newlines to br tags
    formattedContent = formattedContent.replace(/\n/g, '<br/>');

    return (
      <div 
        className="message-content"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.classList.contains('inline-link')) {
            e.preventDefault();
            const href = target.getAttribute('href');
            
            if (href) {
              setTimeout(() => {
                if (target.classList.contains('url-link')) {
                  window.open(href, '_blank', 'noopener noreferrer');
                } else if (target.classList.contains('email-link')) {
                  window.location.href = href;
                } else if (target.classList.contains('phone-link')) {
                  if (/^tel:\+?[\d]+$/.test(href)) {
                    window.location.href = href;
                  }
                } else {
                  if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener noreferrer');
                  } else {
                    window.location.href = href;
                  }
                }
              }, 300);
            }
          }
        }}
        style={{ 
          cursor: 'default',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
        }}
      />
    );
  };

  // Welcome message when first opening
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `Hello! I'm your CodeBiruni AI assistant! 🚀\n\nI can help you with:\n• Our services and expertise\n• Project consultations\n• Pricing information\n• Technical capabilities\n• And much more!\n\nHow can I assist you today?`,
        timestamp: new Date(),
        id: 'welcome-message'
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, messages.length])

  return (
    <>
      {/* Floating Chat Button */}
      {showChatButton && (
        <div className="fixed bottom-6 right-6 z-[1000] animate-in fade-in duration-300">
          <Button
            onClick={openChat}
            className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white/20"
            size="icon"
          >
            <Bot className="h-8 w-8 text-white" />
            <span className="sr-only">Open Chat</span>
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 sm:bottom-6 sm:right-6 right-0 z-[1000] w-full sm:w-[calc(100vw-3rem)] sm:max-w-sm sm:h-[500px] h-full animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Card className="w-full h-full py-0 flex flex-col shadow-2xl border-2 rounded-none sm:rounded-xl border-primary/20 bg-background/95 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <CardHeader className="h-[60px] py-3 px-4 bg-gradient-to-r from-primary/10 to-purple-600/10 border-b flex-shrink-0">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold leading-tight">
                      CodeBiruni Assistant
                    </CardTitle>
                    <p className="text-xs text-muted-foreground leading-tight">
                      Online • Ready to help
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    onClick={clearChat}
                    title="Clear chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={closeChat}
                    title="Minimize chat"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 flex flex-col min-h-0">
              {/* Messages Area */}
              <div 
                ref={scrollAreaRef}
                className="flex-1 overflow-y-auto p-4 space-y-6"
              >
                {messages.map((message, index) => (
                  <div key={index} className="space-y-2">
                    {/* Message Bubble */}
                    <div
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>

                      {/* Message Content */}
                      <div
                        className={`relative max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none border'
                        }`}
                      >
                        {editingMessageId === message.id ? (
                          // Edit mode
                          <div className="space-y-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-transparent text-foreground resize-none outline-none"
                              rows={3}
                              autoFocus
                            />
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                className="h-7 text-xs"
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleSaveEdit(message.id)}
                                className="h-7 text-xs"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          // Display mode
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {formatMessage(message.content)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Time and Actions - Positioned below message bubble */}
                    <div
                      className={`flex items-center gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Edit button for user messages */}
                        {message.role === 'user' && editingMessageId !== message.id && (
                          <button
                            onClick={() => handleEditMessage(message.id, message.content)}
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            title="Edit message"
                          >
                            Edit
                          </button>
                        )}

                        {/* Copy button */}
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className={`relative p-1 ml-8 rounded transition-colors ${
                            message.role === 'user'
                              ? 'text-primary-foreground/70 hover:bg-primary-foreground/20'
                              : 'text-muted-foreground hover:bg-muted-foreground/20'
                          }`}
                          title={copiedMessageId === message.id ? "Copied!" : "Copy message"}
                        >
                          {copiedMessageId === message.id ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          )}
                          
                          {/* Tooltip */}
                          {copiedMessageId === message.id && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Copied!
                            </div>
                          )}
                        </button>

                        {/* Time */}
                        <p
                          className={`text-xs ${
                            message.role === 'user'
                              ? 'text-muted-foreground'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3 border">
                      <div className="flex gap-1 items-center">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                        <span className="text-xs text-muted-foreground ml-2">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="h-[80px] flex-shrink-0 p-4 border-t bg-background/50 flex flex-col justify-center">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    size="icon"
                    className="bg-primary hover:bg-primary/90 transition-colors flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2 leading-tight">
                  CodeBiruni AI Assistant • Your digital solution partner
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}