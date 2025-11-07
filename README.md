# Nexus AI - Intelligent Workflow Orchestrator

**Nexus AI** is a powerful, web-based, no-code platform for designing, analyzing, and optimizing intelligent workflows. It leverages the Google Gemini API to transform natural language descriptions into autonomous, multi-agent systems.

![Nexus AI Platform Screenshot](https://storage.googleapis.com/aistudio-hosting/nexus-ai-screenshot.png) <!-- Placeholder for a future screenshot -->

## ✨ Core Features

- **AI-Powered Workflow Generation**: Describe your desired workflow in plain text, and watch as Nexus AI, powered by Gemini 2.5 Pro, automatically designs and builds the entire agent-based system on the canvas.
- **Multi-View Architecture**: Seamlessly switch between a high-level **Dashboard** for managing your projects and a dedicated **Canvas Editor** for deep, focused work.
- **Intelligent AI Assistant**: A context-aware assistant that helps you at every step:
  - **Agent Enhancement**: Refine agent names and descriptions using the fast Gemini Flash model.
  - **Workflow Analysis**: Get expert optimization advice and bottleneck analysis for your entire workflow from Gemini Pro.
- **Rich Component Library**: Build workflows using a categorized library of specific agents, including Triggers, Integrations (Google Sheets, Slack), Logic, and advanced AI agents.
- **Dynamic & Adaptive Agents**:
  - **Generative Agents**: Special agents that can design and deploy sub-workflows to achieve complex goals.
  - **Learning Profiles**: Configure how your agents learn and adapt with parameters for learning rate, exploration, and memory.
- **Multi-Modal AI Studio**:
  - **Image & Video Generation**: Create and edit media using Imagen, Veo, and Gemini Flash Image.
  - **Live Conversational AI**: Engage in real-time voice conversations with the Gemini Live API.
- **Grounded & Factual Chatbot**: A built-in chatbot enhanced with Google Search and Maps Grounding for accurate, up-to-date answers.
- **Fully Responsive Design**: A clean, modern interface that works beautifully on desktop, tablet, and mobile devices.

## 🚀 Getting Started

The application is a self-contained HTML file and requires no build step.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nexus-ai-platform.git
    ```
2.  **Open `index.html`:**
    Open the `index.html` file in a modern web browser that supports ES Modules (like Chrome, Firefox, or Edge).
3.  **Set API Key:**
    -   Obtain an API Key from [Google AI Studio](https://aistudio.google.com/).
    -   In the Nexus AI application, open the sidebar, paste your key into the "Configuration" section, and click "Save API Key".

## 🛠️ Technical Architecture

- **Frontend**: The application is built with pure **Vanilla JavaScript (ES Modules)**, HTML5, and CSS3 for maximum performance and direct browser compatibility. There is no dependency on a framework like React or Vue.
- **AI Backend**: All intelligent features are powered by the **Google Gemini API**. The application makes direct client-side calls to the API endpoint.
- **State Management**: Application state is managed by a single, comprehensive `NexusPlatform` JavaScript class, encapsulating all logic for UI, state, and API interactions.
- **Persistence**: Workflows and the user's API key are persisted in the browser's `localStorage`, allowing for state to be saved between sessions.

## 📝 Code Documentation

The primary application logic is contained within the `<script type="module">` tag in `index.html`. The code is structured around the `NexusPlatform` class, with JSDoc comments explaining the purpose of each method and property.

