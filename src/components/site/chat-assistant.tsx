"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bot, RotateCcw, Send, X } from "lucide-react";
import type { ChatMessage } from "@/lib/chat";
import styles from "./chat-assistant.module.css";

const suggestions = ["Which service do I need?", "Explain freedom to operate", "Take me to the contact page"];

export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const launcher = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);
  useEffect(() => {
    if (open && log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [open, messages, busy, error]);

  function close() { setOpen(false); launcher.current?.focus(); }
  function reset() {
    controller.current?.abort(); controller.current = null;
    setMessages([]); setInput(""); setBusy(false); setError(""); field.current?.focus();
  }
  async function send(text: string, retry = false) {
    if (!text.trim() || busy) return;
    const next: ChatMessage[] = retry ? messages : [...messages, { role: "user", content: text.trim() }];
    setMessages(next); setInput(""); setError(""); setBusy(true);
    const request = new AbortController(); controller.current = request;
    const timeout = window.setTimeout(() => request.abort(), 30_000);
    try {
      // Keep a bounded conversation and begin history on a user turn.
      const history = next.slice(-11);
      if (history[0]?.role === "assistant") history.shift();
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }), signal: request.signal,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Please try again or contact the team.");
      if (typeof result.answer !== "string") throw new Error("Please try again or contact the team.");
      setMessages([...next, { role: "assistant", content: result.answer, links: result.links }]);
    } catch (err) {
      if (controller.current !== request) return;
      setError(err instanceof Error && err.name !== "AbortError" ? err.message : "The response took too long. Please try again.");
    } finally {
      window.clearTimeout(timeout);
      if (controller.current === request) { controller.current = null; setBusy(false); }
    }
  }

  return (
    <div className={styles.widget}>
      {open && (
        <section id="rightium-chat" role="dialog" aria-modal="false" aria-labelledby="chat-title" className={styles.panel}
          onKeyDown={e => { if (e.key === "Escape") { e.stopPropagation(); close(); } }}>
          <header className={styles.header}>
            <div><h2 id="chat-title">Rightium assistant</h2><p>AI guidance, grounded in our website.</p></div>
            <div className={styles.tools}>
              <button type="button" aria-label="Start a new chat" onClick={reset}><RotateCcw size={17} /></button>
              <button type="button" aria-label="Close chat" onClick={close}><X size={20} /></button>
            </div>
          </header>
          <div ref={log} className={styles.log} role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" data-lenis-prevent>
            <div className={styles.intro}>
              <h3>How can we help?</h3>
              <p>Explore our services, ask a question or find the right page for your next step.</p>
            </div>
            {messages.length === 0 && <div className={styles.suggestions}>{suggestions.map(text => (
              <button type="button" key={text} onClick={() => void send(text)}>{text}<ArrowRight size={16} aria-hidden="true" /></button>
            ))}</div>}
            {messages.map((message, i) => (
              <div key={i} className={message.role === "user" ? styles.user : styles.answer}>
                <span className={styles.speaker}>{message.role === "user" ? "You" : "Rightium assistant"}</span>
                <p>{message.content}</p>
                {message.links?.length ? <div className={styles.links}>{message.links.map(link => (
                  <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowRight size={15} aria-hidden="true" /></Link>
                ))}</div> : null}
              </div>
            ))}
            {busy && <p className={styles.status} role="status">Checking our website content…</p>}
            {error && <div className={styles.error} role="alert"><p>{error}</p><button type="button" onClick={() => void send(messages.at(-1)?.content ?? "", true)}>Try again</button></div>}
          </div>
          <div className={styles.composer}>
            <form onSubmit={e => { e.preventDefault(); void send(input); }}>
              <label className="sr-only" htmlFor="chat-question">Your question</label>
              <input ref={field} id="chat-question" value={input} onChange={e => setInput(e.target.value)} maxLength={2000} placeholder="Ask about our services…" autoComplete="off" />
              <button type="submit" aria-label="Send message" disabled={busy || !input.trim()}><Send size={18} /></button>
            </form>
            <p>Messages are sent to Groq. Please don’t share confidential details. AI can make mistakes. <Link href="/privacy" onClick={() => setOpen(false)}>Privacy</Link></p>
            <Link className={styles.contact} href="/contact" onClick={() => setOpen(false)}>Prefer a conversation with our team?<ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </section>
      )}
      <button ref={launcher} type="button" className={styles.launcher} aria-label={open ? "Close chat" : "Open Rightium assistant"} aria-expanded={open} aria-controls="rightium-chat" onClick={() => open ? close() : setOpen(true)}>
        {open ? <X size={24} aria-hidden="true" /> : <Bot size={26} aria-hidden="true" />}
      </button>
    </div>
  );
}
