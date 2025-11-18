import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Calendar, User, CheckCircle, XCircle, Clock, Filter, Sparkles, TrendingUp, Users, BookMarked, AlertCircle, Download, Bell, Settings, BarChart3, Award, History } from 'lucide-react';

const LibraryManagement = () => {
  const [books, setBooks] = useState([
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", category: "Classic", available: 3, total: 5, rating: 4.5, popularity: 92, issued: [], description: "A novel about the American Dream in the Jazz Age", tags: ["drama", "romance", "tragedy"] },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0061120084", category: "Classic", available: 2, total: 4, rating: 4.8, popularity: 95, issued: [], description: "A gripping tale of racial injustice and childhood innocence", tags: ["drama", "legal", "coming-of-age"] },
    { id: 3, title: "1984", author: "George Orwell", isbn: "978-0451524935", category: "Science Fiction", available: 4, total: 6, rating: 4.7, popularity: 88, issued: [], description: "A dystopian social science fiction novel", tags: ["dystopia", "political", "surveillance"] },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0141439518", category: "Romance", available: 3, total: 5, rating: 4.6, popularity: 85, issued: [], description: "A romantic novel of manners", tags: ["romance", "comedy", "classic"] },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0547928227", category: "Fantasy", available: 2, total: 4, rating: 4.8, popularity: 90, issued: [], description: "A fantasy novel about a hobbit's adventure", tags: ["adventure", "fantasy", "quest"] },
    { id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "978-0590353427", category: "Fantasy", available: 5, total: 8, rating: 4.9, popularity: 98, issued: [], description: "The beginning of the magical Harry Potter series", tags: ["magic", "adventure", "coming-of-age"] },
    { id: 7, title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0316769174", category: "Classic", available: 2, total: 3, rating: 4.2, popularity: 78, issued: [], description: "A story about teenage rebellion and alienation", tags: ["coming-of-age", "rebellion", "identity"] },
    { id: 8, title: "Brave New World", author: "Aldous Huxley", isbn: "978-0060850524", category: "Science Fiction", available: 3, total: 4, rating: 4.5, popularity: 82, issued: [], description: "A dystopian novel about a futuristic World State", tags: ["dystopia", "social-commentary", "philosophy"] },
    { id: 9, title: "The Lord of the Rings", author: "J.R.R. Tolkien", isbn: "978-0544003415", category: "Fantasy", available: 1, total: 3, rating: 4.9, popularity: 96, issued: [], description: "An epic high-fantasy novel", tags: ["epic", "adventure", "war"] },
    { id: 10, title: "Dune", author: "Frank Herbert", isbn: "978-0441172719", category: "Science Fiction", available: 2, total: 3, rating: 4.6, popularity: 87, issued: [], description: "Science fiction novel about politics, religion, and ecology", tags: ["space", "politics", "desert"] },
  ]);

  const [members, setMembers] = useState([
    { id: "M001", name: "Alice Johnson", email: "alice@email.com", phone: "555-0101", joined: "2024-01-15", booksIssued: 2, status: "active", tier: "gold" },
    { id: "M002", name: "Bob Smith", email: "bob@email.com", phone: "555-0102", joined: "2024-02-20", booksIssued: 0, status: "active", tier: "silver" },
    { id: "M003", name: "Carol White", email: "carol@email.com", phone: "555-0103", joined: "2024-03-10", booksIssued: 1, status: "active", tier: "bronze" },
  ]);

  const [activeTab, setActiveTab] = useState('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [issueModal, setIssueModal] = useState(null);
  const [memberModal, setMemberModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [notifications, setNotifications] = useState([
    { id: 1, type: "overdue", message: "3 books are overdue", time: "2 hours ago" },
    { id: 2, type: "new", message: "5 new members registered", time: "5 hours ago" },
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [newMember, setNewMember] = useState({
    name: '', email: '', phone: '', tier: 'bronze'
  });

  const categories = ['All', 'Classic', 'Science Fiction', 'Fantasy', 'Romance'];

  const performAISearch = async (query) => {
    if (!query.trim()) {
      setAiSuggestions([]);
      return;
    }

    setAiSearching(true);
    
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const suggestions = [];

      books.forEach(book => {
        let score = 0;
        const searchTerms = lowerQuery.split(' ');

        searchTerms.forEach(term => {
          if (book.title.toLowerCase().includes(term)) score += 3;
          if (book.author.toLowerCase().includes(term)) score += 2;
          if (book.category.toLowerCase().includes(term)) score += 2;
          if (book.description.toLowerCase().includes(term)) score += 1;
          if (book.tags.some(tag => tag.includes(term))) score += 2;
        });

        if (score > 0) {
          suggestions.push({ ...book, score });
        }
      });

      suggestions.sort((a, b) => b.score - a.score);
      setAiSuggestions(suggestions.slice(0, 5));
      setAiSearching(false);
    }, 800);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      performAISearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const filteredBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.isbn.includes(searchQuery);
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'available') return b.available - a.available;
      return 0;
    });

  const issueBook = (bookId, memberId) => {
    const issueDate = new Date();
    const dueDate = new Date(issueDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    
    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === memberId);

    setBooks(books.map(book => {
      if (book.id === bookId && book.available > 0) {
        return {
          ...book,
          available: book.available - 1,
          issued: [...book.issued, { memberId, issueDate, dueDate }]
        };
      }
      return book;
    }));

    setMembers(members.map(member => {
      if (member.id === memberId) {
        return { ...member, booksIssued: member.booksIssued + 1 };
      }
      return member;
    }));

    const newNotification = {
      id: Date.now(),
      type: "issue",
      message: `"${book.title}" issued to ${member.name}`,
      time: "Just now"
    };
    setNotifications([newNotification, ...notifications]);

    setNotificationMessage(`✅ Successfully issued "${book.title}" to ${member.name}! Due date: ${dueDate.toLocaleDateString()}`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    setIssueModal(null);
    setSelectedMember(null);
  };

  const returnBook = (bookId, memberId) => {
    const book = books.find(b => b.id === bookId);
    const member = members.find(m => m.id === memberId);

    setBooks(books.map(book => {
      if (book.id === bookId) {
        return {
          ...book,
          available: book.available + 1,
          issued: book.issued.filter(issue => issue.memberId !== memberId)
        };
      }
      return book;
    }));

    setMembers(members.map(member => {
      if (member.id === memberId) {
        return { ...member, booksIssued: Math.max(0, member.booksIssued - 1) };
      }
      return member;
    }));

    const newNotification = {
      id: Date.now(),
      type: "return",
      message: `"${book.title}" returned by ${member.name}`,
      time: "Just now"
    };
    setNotifications([newNotification, ...notifications]);

    setNotificationMessage(`📚 Successfully returned "${book.title}" from ${member.name}!`);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const addNewMember = () => {
    if (newMember.name && newMember.email) {
      const newId = `M${String(members.length + 1).padStart(3, '0')}`;
      setMembers([...members, {
        id: newId,
        ...newMember,
        joined: new Date().toISOString().split('T')[0],
        booksIssued: 0,
        status: 'active'
      }]);

      const newNotification = {
        id: Date.now(),
        type: "new",
        message: `New member ${newMember.name} registered`,
        time: "Just now"
      };
      setNotifications([newNotification, ...notifications]);

      setNotificationMessage(`👤 Successfully added new member: ${newMember.name} (${newId})!`);
      setShowNotification(true);
      
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      setNewMember({ name: '', email: '', phone: '', tier: 'bronze' });
      setMemberModal(false);
    }
  };

  const totalBooks = books.reduce((sum, book) => sum + book.total, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
  const issuedBooks = totalBooks - availableBooks;
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'active').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl">
                <BookOpen className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  AI Library Management
                </h1>
                <p className="text-sm text-gray-500">Smart Search & Issue System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative cursor-pointer group">
                <Bell className="text-gray-600 group-hover:text-indigo-600 transition-colors" size={22} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-800">Recent Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.slice(0, 10).map(notif => (
                        <div key={notif.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notif.type === 'issue' ? 'bg-blue-500' :
                              notif.type === 'return' ? 'bg-green-500' :
                              notif.type === 'overdue' ? 'bg-red-500' :
                              'bg-purple-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="mx-auto text-gray-300 mb-2" size={32} />
                        <p className="text-sm text-gray-500">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Settings className="text-gray-600 cursor-pointer hover:text-indigo-600 transition-colors" size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Books</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalBooks}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <BookMarked className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Available</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{availableBooks}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">{((availableBooks/totalBooks)*100).toFixed(1)}% available</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Books Issued</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{issuedBooks}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">{((issuedBooks/totalBooks)*100).toFixed(1)}% circulation</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Members</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{activeMembers}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600">Total: {totalMembers} members</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 p-1">
              {['books', 'members', 'analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'books' && (
            <div className="p-6">
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="AI-powered search: title, author, ISBN, or describe what you're looking for..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-all"
                  />
                  {aiSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <Sparkles className="text-indigo-600 animate-pulse" size={20} />
                    </div>
                  )}
                </div>

                {aiSuggestions.length > 0 && searchQuery && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border-2 border-indigo-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="text-indigo-600" size={18} />
                      <span className="font-semibold text-indigo-900">AI Suggestions</span>
                    </div>
                    <div className="space-y-2">
                      {aiSuggestions.map(book => (
                        <div key={book.id} className="bg-white rounded-lg p-3 flex items-center justify-between hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{book.title}</p>
                            <p className="text-sm text-gray-600">{book.author} • {book.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              Match: {Math.round((book.score / 10) * 100)}%
                            </span>
                            {book.available > 0 && (
                              <CheckCircle className="text-green-500" size={18} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Filter className="text-gray-600" size={18} />
                    <span className="text-sm font-medium text-gray-700">Category:</span>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="popularity">Popularity</option>
                      <option value="rating">Rating</option>
                      <option value="title">Title</option>
                      <option value="available">Availability</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <div key={book.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100">
                    <div className={`h-2 ${book.available > 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'}`}></div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1">{book.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                          <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
                            {book.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Award className="text-yellow-500" size={14} />
                            <span className="text-sm font-semibold text-gray-700">{book.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {book.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Availability</p>
                          <p className="font-bold text-gray-800">
                            {book.available}/{book.total} copies
                          </p>
                        </div>
                        <button
                          onClick={() => setIssueModal(book)}
                          disabled={book.available === 0}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            book.available > 0
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                        >
                          {book.available > 0 ? 'Issue Book' : 'Not Available'}
                        </button>
                      </div>

                      {book.issued.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-500 mb-2">Currently Issued To:</p>
                          {book.issued.map((issue, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded mb-1">
                              <span className="font-medium">{issue.memberId}</span>
                              <button
                                onClick={() => returnBook(book.id, issue.memberId)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                              >
                                Return
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredBooks.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'members' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Library Members</h2>
                <button
                  onClick={() => setMemberModal(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all shadow-md"
                >
                  + Add Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map(member => (
                  <div key={member.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-5 border border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{member.name}</h3>
                          <p className="text-sm text-gray-500">{member.id}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        member.tier === 'gold' ? 'bg-yellow-100 text-yellow-700' :
                        member.tier === 'silver' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {member.tier.toUpperCase()}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User size={16} />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Joined: {member.joined}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Books Issued</p>
                        <p className="text-xl font-bold text-indigo-600">{member.booksIssued}</p>
                      </div>
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-200 transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Library Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BarChart3 className="text-indigo-600" size={20} />
                    Most Popular Books
                  </h3>
                  <div className="space-y-3">
                    {books
                      .sort((a, b) => b.popularity - a.popularity)
                      .slice(0, 5)
                      .map((book, idx) => (
                        <div key={book.id} className="flex items-center gap-3">
                          <div className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{book.title}</p>
                            <div className="bg-gray-200 h-2 rounded-full mt-1">
                              <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                                style={{ width: `${book.popularity}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{book.popularity}%</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="text-green-600" size={20} />
                    Category Distribution
                  </h3>
                  <div className="space-y-3">
                    {categories.filter(c => c !== 'All').map(category => {
                      const count = books.filter(b => b.category === category).length;
                      const percentage = (count / books.length) * 100;
                      return (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">{category}</span>
                            <span className="text-sm text-gray-600">{count} books</span>
                          </div>
                          <div className="bg-gray-200 h-2 rounded-full">
                            <div
                              className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="text-yellow-600" size={20} />
                    Top Rated Books
                  </h3>
                  <div className="space-y-3">
                    {books
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 5)
                      .map((book, idx) => (
                        <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-400">#{idx + 1}</span>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{book.title}</p>
                              <p className="text-xs text-gray-500">{book.author}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="text-yellow-500" size={16} />
                            <span className="font-bold text-gray-800">{book.rating}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="text-purple-600" size={20} />
                    Member Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Gold Members</p>
                        <p className="text-2xl font-bold text-yellow-700">
                          {members.filter(m => m.tier === 'gold').length}
                        </p>
                      </div>
                      <div className="bg-yellow-200 p-3 rounded-full">
                        <Award className="text-yellow-700" size={24} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Silver Members</p>
                        <p className="text-2xl font-bold text-gray-700">
                          {members.filter(m => m.tier === 'silver').length}
                        </p>
                      </div>
                      <div className="bg-gray-200 p-3 rounded-full">
                        <Award className="text-gray-700" size={24} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Bronze Members</p>
                        <p className="text-2xl font-bold text-orange-700">
                          {members.filter(m => m.tier === 'bronze').length}
                        </p>
                      </div>
                      <div className="bg-orange-200 p-3 rounded-full">
                        <Award className="text-orange-700" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showNotification && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in">
          <div className="bg-white rounded-xl shadow-2xl border-l-4 border-green-500 p-4 min-w-96 max-w-md">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1">Success!</h4>
                <p className="text-sm text-gray-600">{notificationMessage}</p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="mt-3 bg-green-500 h-1 rounded-full animate-shrink"></div>
          </div>
        </div>
      )}

      {issueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Issue Book</h2>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl mb-4">
              <p className="font-bold text-gray-800">{issueModal.title}</p>
              <p className="text-sm text-gray-600">{issueModal.author}</p>
              <p className="text-xs text-gray-500 mt-1">ISBN: {issueModal.isbn}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Member
              </label>
              <select
                value={selectedMember || ''}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
              >
                <option value="">Choose a member...</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.id}) - {member.tier}
                  </option>
                ))}
              </select>
            </div>

            {selectedMember && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                <p className="text-sm text-green-800">
                  <strong>Due Date:</strong> {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-800 mt-1">
                  <strong>Return within:</strong> 14 days
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIssueModal(null);
                  setSelectedMember(null);
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedMember && issueBook(issueModal.id, selectedMember)}
                disabled={!selectedMember}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  selectedMember
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Issue Book
              </button>
            </div>
          </div>
        </div>
      )}

      {memberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Member</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  placeholder="Enter member name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  placeholder="member@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                  placeholder="555-0000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Membership Tier
                </label>
                <select
                  value={newMember.tier}
                  onChange={(e) => setNewMember({...newMember, tier: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none"
                >
                  <option value="bronze">Bronze</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setMemberModal(false);
                  setNewMember({ name: '', email: '', phone: '', tier: 'bronze' });
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={addNewMember}
                disabled={!newMember.name || !newMember.email}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                  newMember.name && newMember.email
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedMember && !memberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Member Details</h2>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {selectedMember.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedMember.name}</h3>
                  <p className="text-sm text-gray-600">{selectedMember.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMember.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMember.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMember.joined}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tier</p>
                  <p className="text-sm font-medium text-gray-800">{selectedMember.tier.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-bold text-gray-800 mb-3">Current Issues</h4>
              {selectedMember.booksIssued > 0 ? (
                <div className="space-y-2">
                  {books
                    .filter(book => book.issued.some(issue => issue.memberId === selectedMember.id))
                    .map(book => (
                      <div key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{book.title}</p>
                          <p className="text-xs text-gray-500">{book.author}</p>
                        </div>
                        <button
                          onClick={() => returnBook(book.id, selectedMember.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-600 transition-all"
                        >
                          Return
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">No books currently issued</p>
              )}
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="w-full mt-6 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryManagement;