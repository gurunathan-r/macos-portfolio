# MacOS Portfolio 🍎

A highly interactive, MacOS-themed personal portfolio website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. This project mimics the experience of a desktop environment, featuring window management, a dynamic dock, and realistic app simulations.

![Portfolio Preview](public/assets/preview.png)

## ✨ Features

- **🖥️ Desktop Environment**: Fully functional desktop with wallpaper support and a top menu bar.
- **🪟 Window Management**: Draggable, resizable, minimizable, and maximizable windows with z-index handling.
- **🚀 Dock**: MacOS-style dock with magnification and bounce animations.
- **🏝️ Dynamic Island**: Interactive simulated Dynamic Island that visualizes music playback.
- **🌗 Theme Support**: Smooth directional transitions between Light and Dark modes.
- **📱 iPhone Mirroring**: A realistic iPhone simulation with a functional lock screen, clock, and interactive "Dynamic Island" integration.
- **🎵 Music Player**: Functional audio player with play/pause, progress tracking, and looping.
- **📄 Interactive Resume**: "About Me" app showcasing education, skills, and projects in a rich layout.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: TypeScript

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/portfolio-macos.git
    cd portfolio-macos
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📂 Project Structure

- `components/os`: Core OS components (Desktop, Dock, Window, MenuBar, etc.)
- `components/apps`: Individual application components (Safari, Music, About, Mirroring, etc.)
- `context`: Global state management via `OSContext` (Windows, Music, Theme)
- `app`: Next.js App Router pages and global styles

## 🎨 Customization

- **Wallpaper**: Change default wallpaper in `context/OSContext.tsx`.
- **Apps**: Add new apps in `components/apps` and register them in `OSContext` and `Dock`.

## 📜 License

MIT License. Feel free to use this as a template for your own portfolio!
