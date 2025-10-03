interface Props {
  aiInsights: string;
  setAiInsights: (value: string) => void;
}

export default function AiInsightsModal({ aiInsights, setAiInsights }: Props) {
  // 📝 Simple manual markdown parser
  const renderFormattedText = (text: string) => {
    const lines = text.split("\n"); // split by line
    return lines.map((line, idx) => {
      // Headings
      if (line.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg font-bold text-green-400 mt-4">
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("#### ")) {
        return (
          <h4 key={idx} className="text-md font-semibold text-emerald-300 mt-2">
            {line.replace("#### ", "")}
          </h4>
        );
      }

      // Bullet points
      if (line.trim().startsWith("* ")) {
        return (
          <li key={idx} className="ml-6 list-disc">
            {line.replace("* ", "")}
          </li>
        );
      }

      // Numbered list
      if (/^\d+\./.test(line.trim())) {
        return (
          <li key={idx} className="ml-6 list-decimal">
            {line.trim()}
          </li>
        );
      }

      // Bold text
      if (/\*\*(.*?)\*\*/.test(line)) {
        const parts = line.split(/\*\*(.*?)\*\*/);
        return (
          <p key={idx}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }

      // Divider
      if (line.trim() === "---") {
        return <hr key={idx} className="my-4 border-zinc-600" />;
      }

      // Normal text
      if (line.trim() !== "") {
        return (
          <p key={idx} className="text-zinc-200 leading-relaxed">
            {line}
          </p>
        );
      }

      return null; // skip empty lines
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-zinc-900/90 rounded-2xl p-6 overflow-y-auto max-h-[80vh] shadow-xl border border-zinc-700 hide-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-zinc-700 pb-3">
          <h3 className="text-2xl font-semibold text-green-400">
            💡 AI Spending Insights
          </h3>
          <button
            onClick={() => setAiInsights("")}
            className="w-8 h-8 cursor-pointer flex items-center justify-center rounded-full bg-zinc-800 hover:bg-red-500 transition-colors text-white"
          >
            ✕
          </button>
        </div>

        {/* Formatted dynamic content */}
        <div className="space-y-3">{renderFormattedText(aiInsights)}</div>
      </div>
    </div>
  );
}
