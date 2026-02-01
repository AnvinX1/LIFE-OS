<p align="center">
  <img src="public/icon-512x512.png" alt="Life OS Logo" width="120" height="120" />
</p>

<h1 align="center">Life OS</h1>

<p align="center">
  <strong>🧠 Your Personal Life Operating System for Optimal Cognitive Performance</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Demo</a> •
  <a href="#installation">Installation</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Capacitor-8-119EFF?style=for-the-badge&logo=capacitor" alt="Capacitor" />
</p>

---

## ✨ Features

- **📊 Smart Dashboard** — Real-time overview of your productivity metrics, habits, and goals
- **🎯 Habit Tracker** — Build positive routines with streak tracking and visual progress
- **💭 Mood Analyzer** — Monitor emotional patterns with beautiful data visualization
- **📝 Activity Logger** — Quick-capture system for thoughts, tasks, and daily entries
- **📱 Cross-Platform** — Works seamlessly on Web, iOS, and Android via Capacitor
- **🎨 Neumorphic Design** — Clean, modern UI with soft shadows and premium aesthetics
- **⚡ Offline-First** — Local storage ensures your data is always accessible
- **🔐 Privacy-Focused** — Your data stays on your device, no cloud sync required

---

## 🎬 Demo

<p align="center">
  <em>Screenshots coming soon...</em>
</p>

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** (recommended) or npm/yarn
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AnvinX1/LIFE-OS.git
cd LIFE-OS

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Mobile Development

```bash
# Build for mobile platforms
pnpm cap:build

# Open in Android Studio
pnpm cap:android

# Open in Xcode (macOS only)
pnpm cap:ios

# Run on Android device/emulator
pnpm cap:run:android

# Run on iOS device/simulator
pnpm cap:run:ios
```

### Production Build

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | [Next.js 16](https://nextjs.org/) with Turbopack |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Mobile** | [Capacitor 8](https://capacitorjs.com/) |
| **State** | [SWR](https://swr.vercel.app/) |
| **Icons** | [Lucide React](https://lucide.dev/) |

---

## 📁 Project Structure

```
life-os/
├── app/                    # Next.js App Router pages
│   ├── (app)/              # Main app routes
│   │   ├── dashboard/      # Dashboard page
│   │   ├── mood/           # Mood tracker page
│   │   ├── recorder/       # Activity logger page
│   │   └── settings/       # Settings page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── life-os/            # Core Life OS components
│   └── ui/                 # shadcn/ui components
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities and store
├── public/                 # Static assets
├── android/                # Android native project
├── ios/                    # iOS native project
└── resources/              # App icons and assets
```

---

## 🤝 Contributing

We love contributions! Whether you're fixing bugs, improving documentation, or proposing new features — your help makes Life OS better for everyone.

### How to Contribute

1. **Fork the Repository**

   ```bash
   # Click the Fork button on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/LIFE-OS.git
   cd LIFE-OS
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

4. **Test Your Changes**

   ```bash
   pnpm dev        # Test in development
   pnpm build      # Ensure it builds
   pnpm lint       # Check for linting errors
   ```

5. **Commit Your Changes**

   ```bash
   git commit -m "feat: add amazing feature"
   ```

   We follow [Conventional Commits](https://conventionalcommits.org/):
   - `feat:` — New features
   - `fix:` — Bug fixes
   - `docs:` — Documentation changes
   - `style:` — Code style changes (formatting, etc.)
   - `refactor:` — Code refactoring
   - `test:` — Adding or updating tests
   - `chore:` — Maintenance tasks

6. **Push and Create a Pull Request**

   ```bash
   git push origin feature/amazing-feature
   ```

   Then open a Pull Request on GitHub!

### Contribution Ideas

| Area | Ideas |
|------|-------|
| **Features** | Weekly/monthly reports, data export, themes, widgets |
| **Mobile** | Native notifications, home screen widgets, Apple Watch support |
| **Integrations** | Calendar sync, health apps, external APIs |
| **Accessibility** | Screen reader improvements, keyboard navigation |
| **Documentation** | Tutorials, API docs, video guides |
| **Testing** | Unit tests, E2E tests, visual regression tests |

### Code Style Guidelines

- Use **TypeScript** for all new code
- Follow **functional components** with hooks
- Use **Tailwind CSS** for styling (no inline styles)
- Keep components **small and focused**
- Write **descriptive variable and function names**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Vercel](https://vercel.com/) for Next.js and hosting
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [shadcn](https://twitter.com/shadcn) for the beautiful component library
- All our amazing contributors! ❤️

---

<p align="center">
  <strong>Built with ❤️ for productivity enthusiasts worldwide</strong>
</p>

<p align="center">
  <a href="https://github.com/AnvinX1/LIFE-OS/stargazers">⭐ Star us on GitHub</a> •
  <a href="https://github.com/AnvinX1/LIFE-OS/issues">🐛 Report a Bug</a> •
  <a href="https://github.com/AnvinX1/LIFE-OS/issues">💡 Request a Feature</a>
</p>
