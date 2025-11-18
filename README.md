# 📚 AI Library Management System

A modern, intelligent library management system with AI-powered search, smart book issuing, and comprehensive analytics dashboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8.svg)

## ✨ Features

### 🔍 Smart Search & Discovery
- **AI-Powered Search**: Intelligent book matching with relevance scoring
- **Real-time Suggestions**: Get instant recommendations as you type
- **Advanced Filtering**: Filter by category, sort by popularity, rating, or availability
- **Multi-criteria Search**: Search by title, author, ISBN, keywords, or tags

### 📖 Book Management
- Comprehensive book catalog with detailed information
- Availability tracking (available/total copies)
- Rating and popularity metrics
- Book descriptions and genre tags
- Visual status indicators
- Issue and return tracking

### 👥 Member Management
- Member profiles with tier system (Gold/Silver/Bronze)
- Track books issued per member
- Member registration and details
- View member history and current issues
- Contact information management

### 📊 Analytics Dashboard
- Real-time statistics overview
- Most popular books visualization
- Category distribution charts
- Top-rated books ranking
- Member tier statistics
- Circulation metrics

### 🔔 Notifications System
- Success toast notifications for all actions
- Real-time notification bell with activity log
- Color-coded notification types:
  - 🔵 Book issued
  - 🟢 Book returned
  - 🔴 Overdue alerts
  - 🟣 New member registrations

### 🎨 Modern UI/UX
- Beautiful gradient designs
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Interactive hover effects
- Intuitive navigation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-library-management.git
cd ai-library-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
ai-library-management/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── LibraryManagement.jsx
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── tailwind.config.js
├── README.md
└── LICENSE
```

## 🎯 Usage Guide

### Searching for Books
1. Use the search bar to find books by:
   - Title (e.g., "Harry Potter")
   - Author (e.g., "Tolkien")
   - ISBN (e.g., "978-0743273565")
   - Keywords (e.g., "fantasy", "dystopia")

2. AI suggestions appear automatically with match percentages
3. Filter by category using the category buttons
4. Sort results by popularity, rating, title, or availability

### Issuing a Book
1. Search or browse for the desired book
2. Click the "Issue Book" button (only available if copies are in stock)
3. Select a member from the dropdown
4. Review the due date (automatically set to 14 days)
5. Click "Issue Book" to confirm
6. A success notification will appear

### Returning a Book
1. **Option 1**: From the book card
   - Scroll to "Currently Issued To" section
   - Click "Return" next to the member's ID

2. **Option 2**: From member details
   - Go to "Members" tab
   - Click "View Details" on the member
   - Click "Return" on any issued book

### Managing Members
1. Click "Add Member" in the Members tab
2. Fill in the member details (name, email, phone, tier)
3. Click "Add Member" to register
4. View member details by clicking "View Details"

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **JavaScript ES6+** - Programming language

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

## 🎨 Customization

### Adding More Books
Edit the initial state in `LibraryManagement.jsx`:

```javascript
const [books, setBooks] = useState([
  {
    id: 11,
    title: "Your Book Title",
    author: "Author Name",
    isbn: "ISBN-NUMBER",
    category: "Category",
    available: 5,
    total: 5,
    rating: 4.5,
    popularity: 85,
    issued: [],
    description: "Book description",
    tags: ["tag1", "tag2"]
  },
  // ... more books
]);
```

### Customizing Colors
Modify Tailwind classes in the component or update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      }
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern library management systems
- Built with ❤️ using React and Tailwind CSS

## 📧 Contact

Project Link: [https://github.com/yourusername/ai-library-management](https://github.com/yourusername/ai-library-management)

## 🐛 Known Issues

- None at the moment! Feel free to report issues on GitHub.

## 🗺️ Roadmap

- [ ] Add book reservation system
- [ ] Implement overdue fine calculation
- [ ] Add email notifications for due dates
- [ ] Create admin authentication
- [ ] Add barcode scanning support
- [ ] Export reports to PDF/Excel
- [ ] Multi-language support
- [ ] Dark mode theme

---
