# Windows Helper AI Overlay

A **native-feeling AI assistant overlay for Windows** that combines text, voice, images, PDFs, persistent conversations, and reusable user memory in a keyboard-accessible desktop interface.

## Links

- [Source code](https://github.com/FelipePipe2002/WindowsHelper)

## Main Features

- **Global Overlay**: Open or hide the assistant from anywhere in Windows with a configurable hotkey
- **Streaming AI Chat**: Use configurable OpenAI-compatible models with token tracking and cancellation
- **Voice Workflow**: Record audio, transcribe it with Whisper, and optionally activate the app by wake word
- **Vision and Documents**: Paste or upload images and PDF files for analysis
- **Cross-Chat Memory**: Store and edit reusable preferences separately from conversation history
- **Conversation Search**: Search archived chats, summaries, messages, and audio transcriptions
- **Local Data Ownership**: Store conversations, memory, attachments, and audio locally

## Technical Implementation

The application uses **Python** and **PyWebView** for its desktop window and system integration, while modular HTML, CSS, and JavaScript implement the chat interface. A bridge API connects frontend components to Python services for AI requests, files, audio, search, and application commands.

Optional local tools include openWakeWord for activation, Whisper for transcription, and Piper for text-to-speech.

## Architecture Highlights

- Python-to-JavaScript bridge separating OS services from interface components
- Persistent multi-conversation archive with generated summaries
- Automatic context summarization and editable long-term memory
- Global hotkeys, system tray integration, and remembered window position
- Configurable cloud or OpenAI-compatible model provider

## Technologies

`Python` `PyWebView` `JavaScript` `Web Components` `OpenAI API` `Whisper` `openWakeWord` `Piper`
