interface MsgItem {
  role: string;
  parts: string;
}

const ChatBubble: React.FC<{ msgItem: MsgItem }> = ({ msgItem }) => {
  const { role, parts } = msgItem;

  // Determine if the message is from the user
  const isUser = role === "user";
  // Apply different styles based on the role
  const bubbleClass = isUser
    ? "bg-[#0b7dffd4] text-white"
    : "bg-white text-gray-800";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 `}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2 shadow bg-white">
          <img
            src="/parsylllogotrans.png"
            alt="User Avatar"
            className="w-6 h-6 rounded-full"
          />
        </div>
      )}
      <div
        className={` flex max-w-96 p-3 gap-3 shadow rounded-3xl px-4 ${bubbleClass}`}
      >
        {parts}
      </div>
    </div>
  );
};

export default ChatBubble;
