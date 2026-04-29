npm create vite@latest banking-assistant -- --template react

cd banking-assistant

npm install

npm install axios


High-level summary of the system
•	Small React component tree:
•	App (state + LLM call) -> ChatWindow (renders list, auto-scrolls) -> MessageBubble (per-message UI)
•	App -> ChatInput (user input + send)
•	Data flow is unidirectional: App owns messages and loading, passes them down as props; ChatInput triggers onSend which updates App state.
•	Main concerns to consider next: error handling for sendMessageToLLM, stable message identifiers, Enter-key submit, accessibility attributes, and optional streaming UI for longer LLM responses.

src/components/ChatInput.jsx
•	Purpose: controlled text input + send button for the user to submit a message.
•	State: input holds the current text.
•	Key behavior:
•	handleSend() prevents empty submissions (!input.trim()), calls the parent onSend(input) prop, then clears input.
•	Button is disabled when loading prop is true and shows "Thinking..." while waiting.
•	UX details: input uses value + onChange (controlled component) and button cursor changes when disabled.
•	Notes / improvements: no Enter-key submit handler (only click). Consider adding onKeyDown to submit with Enter and aria attributes for accessibility.

src/components/MessageBubble.jsx
•	Purpose: render a single chat message bubble with basic styling and alignment.
•	Props: receives a message object with sender and text.
•	Key behavior:
•	Aligns the bubble using justifyContent: flex-end for user, flex-start for assistant.
•	Visual styling switches background and text color depending on message.sender === "user".
•	Shows a simple label (User or AI) followed by the message text.
•	Notes / improvements: uses inline styles and no semantic markup (could use aria-label or <time> for timestamps). Also consider supporting markdown or rich text safely if needed.

src/components/ChatWindow.jsx
•	Purpose: scrollable container that lists all messages and auto-scrolls to the bottom on update.
•	Props: messages array.
•	Key behavior:
•	Renders messages.map((msg, index) => <MessageBubble key={index} message={msg} />).
•	Uses useRef (bottomRef) and useEffect to call bottomRef.current?.scrollIntoView({ behavior: "smooth" }) whenever messages changes — keeps view scrolled to newest message.
•	Notes / improvements:
•	Uses array index as key — replace with stable IDs to avoid rendering issues when messages are inserted/removed.
•	Height is fixed to 400px with overflowY: auto — fine for simple UI; consider responsive/adaptive sizing.

src/App.jsx
•	Purpose: top-level coordinator for chat state, user interaction and LLM calls.
•	State:
•	messages — array of message objects (initial assistant greeting included).
•	loading — boolean to indicate an in-flight AI response.
•	Key behavior / flow:
1.	handleSend(userText) creates a user message and appends it to messages immediately (optimistic UI).
2.	Sets loading = true.
3.	Calls sendMessageToLLM(userText) from ./services/api to get the AI reply.
4.	Appends the assistant reply to messages and sets loading = false.
•	UX considerations:
•	Optimistic addition of the user message keeps the UI responsive.
•	loading disables the send button and changes its label via the ChatInput prop.
•	Notes / improvements:
•	No error handling for sendMessageToLLM (network failures, timeouts or rejected promises will break the flow). Add try/catch and show an error message bubble or revert loading state.
•	No message IDs or timestamps — adding these helps for keys and history.
•	Concurrency: multiple sends could overlap; currently loading prevents clicking while waiting, but multi-turn handling or streaming responses would require more changes.
•	Accessibility and keyboard handling are not fully addressed.
