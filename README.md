# 🕰️ ZenFocus Clock

A minimalist, aesthetic focus dashboard designed to keep you in the flow.

ZenFocus combines a beautiful system clock, a versatile Pomodoro timer, and high-quality nature ambiances into a single distraction-free interface. It features a unique **Picture-in-Picture (PiP)** mode that allows you to keep your timer visible "always-on-top" while you work in other windows or applications.

## ✨ Features

- **🖼️ Dynamic Ambiance:** High-quality, rotating nature wallpapers from Unsplash with a "Shuffle Scene" feature to refresh your environment.
- **🍅 Focus Engine:** Integrated Pomodoro timer with three modes:
  - **Focus:** 25 minutes (Deep work)
  - **Short Break:** 5 minutes (Recharge)
  - **Long Break:** 15 minutes (Reset)
- **📺 Always-on-Top PiP Mode:** 
  - Uses HTML5 Canvas and the Picture-in-Picture API to render a live video stream of your timer.
  - **Why this matters:** You can switch tabs, minimize the browser, or code in your IDE, and the floating timer remains visible in the corner of your screen.
- **🎨 Aesthetic UI:** Glassmorphism design, ambient background glows, and responsive typography powered by Tailwind CSS.
- **📱 Mobile Ready:** Fully responsive design that adapts to mobile, tablet, and desktop screens.

## 🛠️ Tech Stack

- **Framework:** React 19 (TypeScript)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🧩 How the PiP Mode Works

Browsers typically only allow `<video>` elements to enter Picture-in-Picture mode. To make a generic HTML/React timer float:

1. We create a hidden `<canvas>` element.
2. Every second, we draw the current timer state (ring, text, colors) onto the canvas.
3. We capture the canvas stream (`canvas.captureStream()`) and pipe it into a hidden `<video>` element.
4. When you click the PiP button, we request the Picture-in-Picture window for that video element.

## 👨‍💻 About the Author

**A.Ruchith**  
*Computer Science with AI&ML Student*

Check out my work on GitHub: [github.com/aruchith08](https://github.com/aruchith08)

## 📄 License

MIT