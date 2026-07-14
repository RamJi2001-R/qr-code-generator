# QR Code Generator

A modern, feature-rich QR code generator built with React and Vite. Create and customize QR codes with multiple styles, colors, logos, and export options.

## Features

- 🎨 **Multiple QR Code Styles** - Choose from different visual styles (dots, rounded, squares, etc.)
- 🌈 **Custom Colors** - Customize foreground and background colors
- 📷 **Logo Support** - Add custom logos or images to QR codes
- 💾 **Multiple Export Formats** - Download as PNG, SVG, or copy HTML code
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Built with Modern Tech** - React 19, Vite, TailwindCSS

## Tech Stack

- **Frontend Framework:** React 19.2.6
- **Build Tool:** Vite 8.0.12
- **Styling:** TailwindCSS 4.3.1
- **QR Code Library:** qr-code-styling 1.9.2
- **Icons:** Lucide React 1.21.0
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd qr-code-scanner
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create a production build:
```bash
npm run build
```

### Preview

Preview the production build locally:
```bash
npm run preview
```

### Project Images

Preview the production build locally:
```
project images
```

### Linting

Run ESLint to check code quality:
```bash
npm lint
```

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
├── index.css              # Global styles
├── assets/                # Static assets
└── components/
    └── QRCodePreview.jsx  # QR code preview and export component
```

## Usage

1. **Enter QR Code Data:** Input the text, URL, email, phone number, or WiFi details you want to encode
2. **Customize Style:** Select from different QR code style presets
3. **Choose Colors:** Pick custom foreground and background colors
4. **Add Logo:** Optionally upload a logo to display in the center of the QR code
5. **Export:** Download as PNG/SVG or copy the HTML code

## Available QR Code Data Types

- Text
- URLs
- Email addresses
- Phone numbers
- WiFi credentials

## Customization Options

- **Style Presets:** Multiple visual styles for QR codes
- **Color Customization:** Full control over QR code colors
- **Logo Size:** Adjustable logo size in the QR code
- **Export Formats:** PNG, SVG, or HTML code

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on the repository.
