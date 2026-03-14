from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS
import pymysql
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# -----------------------------
# Database Connection
# -----------------------------

# Safe port handling
mysql_port = os.getenv("MYSQLPORT")

if not mysql_port:
    mysql_port = 3306
else:
    mysql_port = int(mysql_port)
    
connection = pymysql.connect(
    host=os.getenv("MYSQLHOST"),
    user=os.getenv("MYSQLUSER"),
    password=os.getenv("MYSQLPASSWORD"),
    database=os.getenv("MYSQLDATABASE"),
    port=int(os.getenv("MYSQLPORT", 3306))
)

# -----------------------------
# Create Table Automatically
# -----------------------------
cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS contacts(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    mobile VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

connection.commit()


# -----------------------------
# Contact API
# -----------------------------
@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()

        name = data.get('name', '')
        mobile = data.get('mobile', '')
        message = data.get('message', '')

        if not name or not mobile:
            return jsonify({'error': 'Name and mobile number are required'}), 400

        cursor = connection.cursor()

        sql = """
        INSERT INTO contacts (name, mobile, message)
        VALUES (%s, %s, %s)
        """

        cursor.execute(sql, (name, mobile, message))
        connection.commit()

        cursor.close()

        return jsonify({
            'success': True,
            'message': 'Thank you! We will contact you soon.'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# FAQ Database for Chatbot
FAQ_DATA = {
    "hours": {
        "keywords": ["hours", "open", "close", "timing", "time", "when"],
        "answer": "We're open Monday to Sunday from 12:00 PM to 12:00 AM. Happy Hours are from 12:00 PM to 6:00 PM with 50% off on bills!"
    },
    "location": {
        "keywords": ["where", "location", "address", "find", "reach"],
        "answer": "We're located at 5th Floor, Odyssey Mall, Above Jaguar Showroom, Road No 36, Jubilee Hills, Hyderabad - 500033, Telangana."
    },
    "reservation": {
        "keywords": ["book", "reserve", "table", "booking", "reservation"],
        "answer": "You can book a table by calling us or using the contact form on our website. We recommend booking in advance, especially for weekends!"
    },
    "music": {
        "keywords": ["music", "band", "live", "performance", "artist", "singer"],
        "answer": "We feature live Bollywood bands and performances every evening! Check our Events section or social media for the latest lineup."
    },
    "menu": {
        "keywords": ["menu", "food", "drink", "cuisine", "dish", "eat"],
        "answer": "We serve North Indian, Italian, Continental, and Asian cuisines. Our bar offers signature cocktails, mocktails, and a wide selection of spirits."
    },
    "price": {
        "keywords": ["price", "cost", "expensive", "budget", "entry", "cover"],
        "answer": "Average cost for two is ₹1500-4000. Entry fee is ₹1000-2000 per person after 7 PM on weekends (redeemable against food and beverages). Happy hours offer 50% off from 12 PM to 6 PM!"
    },
    "parking": {
        "keywords": ["parking", "park", "vehicle", "car"],
        "answer": "Parking is available at Odyssey Mall. We're located on the 5th floor, making it convenient to access from the mall parking."
    },
    "dress": {
        "keywords": ["dress", "attire", "wear", "clothes", "code"],
        "answer": "We recommend smart casual attire to match our upscale vibe. Comfortable yet stylish clothing works best!"
    },
    "group": {
        "keywords": ["group", "party", "celebration", "event", "birthday"],
        "answer": "We're perfect for group celebrations! We can accommodate parties and special events. Contact us for group bookings and customized packages."
    },
    "rooftop": {
        "keywords": ["rooftop", "outdoor", "terrace", "outside"],
        "answer": "Yes! We have stunning rooftop seating with a vibrant atmosphere, perfect for enjoying Hyderabad evenings with live music."
    }
}

def find_faq_answer(user_message):
    """Find the best matching FAQ answer based on keywords"""
    user_message = user_message.lower()
    
    for faq_key, faq_data in FAQ_DATA.items():
        for keyword in faq_data["keywords"]:
            if keyword in user_message:
                return faq_data["answer"]
    
    return "I'm here to help! You can ask me about our hours, location, menu, live music, reservations, pricing, or any other questions about Air Live Bar."

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chatbot API endpoint"""
    try:
        data = request.get_json()
        user_message = data.get('message', '')
        
        if not user_message:
            return jsonify({'error': 'No message provided'}), 400
        
        answer = find_faq_answer(user_message)
        
        return jsonify({
            'response': answer,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/whatsapp', methods=['GET'])
def whatsapp_redirect():
    """Generate WhatsApp link"""
    # Replace with actual Air Live WhatsApp number
    phone_number = "+91 8088993323"  # Example number - replace with actual
    message = "Hi! I'd like to know more about Air Live Bar."
    
    whatsapp_url = f"https://wa.me/{phone_number}?text={message}"
    
    return jsonify({
        'url': whatsapp_url
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)