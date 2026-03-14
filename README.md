# 🎵 Air Live Bar - Complete Full-Stack Website

A modern, feature-rich website for **Air Live Bar**, Hyderabad's premier live music venue in Jubilee Hills. This full-stack application features a stunning frontend with advanced animations, an intelligent FAQ chatbot, WhatsApp integration, and a complete contact management system.

---

## 🌟 Features

### Frontend
- **Modern Design**: Unique music-themed aesthetic with bold typography and vibrant colors
- **Responsive Layout**: Fully responsive across all devices (mobile, tablet, desktop)
- **Smooth Animations**: CSS animations, scroll effects, and parallax backgrounds
- **Interactive Menu**: Filterable menu with categories (Appetizers, Mains, Cocktails, Desserts)
- **Dynamic Gallery**: Lightbox image viewer for venue photos
- **Events Section**: Showcase upcoming live music performances
- **Google Maps Integration**: Embedded map showing exact location

### Backend (Python Flask)
- **RESTful API**: Clean API endpoints for chatbot and contact form
- **Contact Form Handler**: Validates and stores customer inquiries
- **FAQ Chatbot**: AI-powered responses to common questions
- **WhatsApp Integration**: Direct messaging functionality
- **Data Persistence**: JSON-based storage for contact submissions

### Interactive Features
- **Smart Chatbot**: 
  - 10+ FAQ categories (hours, location, menu, music, pricing, etc.)
  - Natural language understanding
  - Instant responses
  - Quick FAQ buttons
  
- **Contact Form**:
  - Name and mobile number validation
  - Optional message field
  - Real-time form validation
  - Success/error notifications
  
- **WhatsApp Button**: One-click WhatsApp chat integration

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to the project directory**:
```bash
cd airlive-website
```

2. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

3. **Run the application**:
```bash
python app.py
```

4. **Open your browser** and visit:
```
http://localhost:5000
```

---

## 📂 Project Structure

```
airlive-website/
├── app.py                      # Flask backend application
├── requirements.txt            # Python dependencies
├── contacts.json              # Contact form submissions (auto-generated)
├── templates/
│   └── index.html             # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css          # Complete styling (8000+ lines)
│   └── js/
│       └── script.js          # Frontend interactions & chatbot
└── README.md                  # This file
```

---

## 🎨 Design Highlights

### Color Palette
- **Primary**: `#FF3D00` (Vibrant Orange-Red)
- **Secondary**: `#FFC107` (Amber)
- **Accent**: `#00E5FF` (Cyan)
- **Dark Background**: `#0A0A0A`

### Typography
- **Display Font**: Bebas Neue (Headers, Logo)
- **Heading Font**: Playfair Display (Section Titles)
- **Body Font**: Outfit (Content)

### Key Sections
1. **Hero**: Animated sound waves, bold typography, CTA buttons
2. **About**: Grid layout with feature cards and image decoration
3. **Menu**: Category filters with hover effects
4. **Events**: Upcoming performances with date badges
5. **Gallery**: 6-image grid with lightbox viewer
6. **Contact**: Split layout with info blocks and form

---

## 🤖 Chatbot FAQ Categories

The chatbot can answer questions about:
- **Hours**: Operating hours and happy hour details
- **Location**: Address and directions
- **Reservations**: How to book tables
- **Live Music**: Band performances and schedule
- **Menu**: Food and drink offerings
- **Pricing**: Cover charges and average costs
- **Parking**: Parking availability
- **Dress Code**: Recommended attire
- **Groups**: Party and event bookings
- **Rooftop**: Outdoor seating information

---

## 🔧 Configuration

### Update WhatsApp Number
In `static/js/script.js`, line 105:
```javascript
const phoneNumber = '919876543210'; // Replace with Air Live's actual number
```

In `app.py`, line 81:
```python
phone_number = "919876543210"  # Replace with actual number
```

### Update Contact Information
Edit `templates/index.html` around line 434:
```html
<p>Phone: +91 9876543210<br>Email: reservations@airlive.in</p>
```

### Modify FAQ Responses
Edit the `FAQ_DATA` dictionary in `app.py` (lines 10-60) to customize chatbot responses.

---

## 📱 WhatsApp Integration

The website includes two WhatsApp touchpoints:

1. **Contact Section Button**: Large green WhatsApp button in the contact section
2. **Chatbot Integration**: Can be extended to hand off to WhatsApp

**How it works**:
- Clicking WhatsApp button opens WhatsApp web/app
- Pre-filled message included
- Mobile-optimized for direct app opening

---

## 🎯 API Endpoints

### POST `/api/chat`
**Purpose**: Chatbot message processing

**Request Body**:
```json
{
  "message": "What are your hours?"
}
```

**Response**:
```json
{
  "response": "We're open Monday to Sunday...",
  "timestamp": "2026-03-13T10:30:00"
}
```

### POST `/api/contact`
**Purpose**: Contact form submission

**Request Body**:
```json
{
  "name": "John Doe",
  "mobile": "9876543210",
  "message": "I'd like to book a table for 6 people"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you! We will contact you soon."
}
```

### GET `/api/whatsapp`
**Purpose**: Generate WhatsApp link

**Response**:
```json
{
  "url": "https://wa.me/919876543210?text=Hi!%20I'd%20like..."
}
```

---

## 🌐 Deployment Options

### Option 1: Traditional Hosting (Heroku, DigitalOcean, AWS)

1. **Set up a production WSGI server** (Gunicorn):
```bash
pip install gunicorn
gunicorn app:app
```

2. **Use environment variables** for sensitive data:
```python
import os
phone_number = os.getenv('WHATSAPP_NUMBER', '919876543210')
```

3. **Deploy** to your chosen platform following their Python deployment guides

### Option 2: Serverless (Vercel, Netlify Functions)

Convert Flask routes to serverless functions and deploy static assets to CDN.

### Option 3: Docker

Create a `Dockerfile`:
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```

Run:
```bash
docker build -t airlive-website .
docker run -p 5000:5000 airlive-website
```

---

## 📊 Database Migration

Currently using JSON file storage. For production:

### Recommended: PostgreSQL/MySQL

```python
# Example SQLAlchemy setup
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/airlive'
db = SQLAlchemy(app)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    mobile = db.Column(db.String(10))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime)
```

---

## 🔐 Security Recommendations

1. **Add HTTPS** in production
2. **Implement rate limiting** on API endpoints
3. **Sanitize user inputs** to prevent XSS
4. **Use environment variables** for sensitive data
5. **Add CSRF protection** to forms
6. **Validate file uploads** if added

---

## 🎨 Customization Guide

### Change Primary Color
In `static/css/style.css`, line 2:
```css
--primary: #FF3D00; /* Change to your preferred color */
```

### Add New Menu Items
In `templates/index.html`, add new menu-item divs around line 200.

### Modify Hero Section
Edit `templates/index.html` lines 40-80 for hero content.

### Update Gallery Images
Replace image URLs in `templates/index.html` lines 350-400.

---

## 🐛 Troubleshooting

**Issue**: Port 5000 already in use
```bash
# Solution: Use a different port
python app.py --port 5001
```

**Issue**: CSS/JS not loading
```bash
# Solution: Clear browser cache or use hard refresh (Ctrl+Shift+R)
```

**Issue**: Chatbot not responding
```bash
# Solution: Check browser console for errors, verify API endpoint is running
```

---

## 📈 Future Enhancements

- [ ] Admin dashboard for managing events and menu
- [ ] Online table reservation system with calendar
- [ ] Email notification system
- [ ] Customer review and rating system
- [ ] Newsletter subscription
- [ ] Image upload for gallery
- [ ] Multi-language support
- [ ] Social media feed integration
- [ ] Analytics dashboard
- [ ] Payment gateway integration

---

## 📄 License

This is a custom website built for Air Live Bar. All design elements and branding are proprietary.

---

## 👨‍💻 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Python 3.8+, Flask 3.0
- **Fonts**: Google Fonts (Bebas Neue, Outfit, Playfair Display)
- **Icons**: Font Awesome 6.4
- **Maps**: Google Maps Embed API
- **Messaging**: WhatsApp Business API

---

## 📞 Support

For technical support or customization requests, please contact the development team.

---

## 🎵 About Air Live Bar

**Location**: 5th Floor, Odyssey Mall, Above Jaguar Showroom, Road No 36, Jubilee Hills, Hyderabad - 500033

**Hours**: Monday - Sunday, 12:00 PM - 12:00 AM

**Specialties**: 
- Live Bollywood bands every night
- Rooftop seating with city views
- North Indian, Italian, Asian, and Continental cuisine
- Signature cocktails and extensive bar menu
- Perfect for groups, celebrations, and music lovers

**Happy Hours**: 12:00 PM - 6:00 PM (50% off on bills)

---

**Built with ❤️ for music lovers**