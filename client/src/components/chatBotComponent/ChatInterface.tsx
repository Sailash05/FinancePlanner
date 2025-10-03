import { motion } from "framer-motion";

interface Props {
  messages: { question: string; answer: string }[];
  chatEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatInterface({ messages, chatEndRef }: Props) {

const renderFormattedText = (text: string) => {
  const lines = text.split("\n");

  return lines.map((line, idx) => {
    if (!line.trim()) return null;

    // Headings
    if (line.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-lg font-bold text-violet-400 mt-4">
          {line.replace("### ", "")}
        </h3>
      );
    }
    if (line.startsWith("#### ")) {
      return (
        <h4 key={idx} className="text-md font-semibold text-violet-300 mt-2">
          {line.replace("#### ", "")}
        </h4>
      );
    }

    // Divider
    if (line.trim() === "---") {
      return <hr key={idx} className="my-4 border-violet-700" />;
    }

    // Detect bullet points with optional nesting (spaces)
    const bulletMatch = line.match(/^(\s*)\*\s+(.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length;
      const content = bulletMatch[2];

      // Parse bold inside bullet content
      const parts: React.ReactNode[] = [];
      const regex = /\*\*([^\*]+?)\*\*/g;
      let lastIndex = 0;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.slice(lastIndex, match.index));
        }
        parts.push(<strong className="text-violet-400" key={match.index}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < content.length) {
        parts.push(content.slice(lastIndex));
      }

      return (
        <li
          key={idx}
          className={`ml-${indent + 6} list-disc`}
        >
          {parts}
        </li>
      );
    }

    // Detect numbered list (simple, no nesting for now)
    if (/^\d+\./.test(line.trim())) {
      return (
        <li key={idx} className="ml-6 list-decimal">
          {line.trim()}
        </li>
      );
    }

    // Parse bold in normal paragraph
    const parts: React.ReactNode[] = [];
    const regex = /\*\*([^\*]+?)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      parts.push(<strong className="text-violet-400" key={match.index}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return (
      <p key={idx} className="text-white leading-relaxed">
        {parts}
      </p>
    );
  });
};


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-3 p-4"
    >
      {messages.map((msg, index) => (
        <div key={index} className="flex flex-col gap-1">
          {/* User */}
          <div className="self-start bg-violet-700/70 text-white p-3 rounded-xl max-w-[80%]">
            <strong>You:</strong> {msg.question}
          </div>

          {/* AI */}
          <div className="self-end bg-black/70 text-white p-3 rounded-xl max-w-[80%] border border-violet-500">
            <strong>AI:</strong>
            <div className="mt-2">{renderFormattedText(msg.answer)}</div>
          </div>
        </div>
      ))}

      {/* Scroll anchor */}
      {chatEndRef && <div ref={chatEndRef} />}
    </motion.div>
  );
}
