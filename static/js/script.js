// ==================== Smooth Scroll Navigation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Navbar Scroll Effect ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== Mobile Menu ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// ==================== Menu Filtering ====================
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        menuTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Filter menu items
        menuItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .menu-item, .event-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Contact Form ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        mobile: document.getElementById('mobile').value,
        message: document.getElementById('message').value || ''
    };
    
    // Validate mobile number
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
        showMessage('Please enter a valid 10-digit mobile number', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage(data.message, 'success');
            contactForm.reset();
        } else {
            showMessage(data.error || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please try again later.', 'error');
    }
});

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ==================== WhatsApp Integration ====================
const whatsappBtn = document.getElementById('whatsappBtn');

whatsappBtn?.addEventListener('click', () => {
    const phoneNumber = '918088993323'; // Replace with actual number
    const message = encodeURIComponent("Hi! I'd like to know more about Air Live Bar and make a reservation.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
});

// ==================== Chatbot ====================
const chatbot = document.getElementById('chatbot');
const chatbotFab = document.getElementById('chatbotFab');
const chatbotClose = document.getElementById('chatbotClose');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatbotBody = document.getElementById('chatbotBody');

// Toggle chatbot
chatbotFab?.addEventListener('click', () => {
    chatbot.classList.add('active');
    chatbotFab.classList.add('hidden');
    chatInput.focus();
});

chatbotClose?.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatbotFab.classList.remove('hidden');
});

// Send message
async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message to chat
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    // Scroll to bottom
    scrollChatToBottom();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Add bot response
            setTimeout(() => {
                addChatMessage(data.response, 'bot');
                scrollChatToBottom();
            }, 500);
        } else {
            addChatMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    } catch (error) {
        addChatMessage('Sorry, I am having trouble connecting. Please try again later.', 'bot');
    }
}

chatSend?.addEventListener('click', sendChatMessage);

chatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatbotBody.appendChild(messageDiv);
}

function scrollChatToBottom() {
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// ==================== Gallery Lightbox ====================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${img.src}" alt="${img.alt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 10px;
            }
            .lightbox-close {
                position: absolute;
                top: -50px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 40px;
                cursor: pointer;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .lightbox-close:hover {
                color: #FF3D00;
            }
        `;
        document.head.appendChild(style);
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            style.remove();
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                style.remove();
                document.body.style.overflow = '';
            }
        });
    });
});

// ==================== Parallax Effect ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== Load Animation ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== Quick FAQs for Chatbot ====================
const quickFAQs = [
    { question: "What are your hours?", trigger: "hours" },
    { question: "How do I book a table?", trigger: "reservation" },
    { question: "Do you have live music?", trigger: "music" },
    { question: "What's on the menu?", trigger: "menu" }
];

// Add quick FAQ buttons after initial bot message
setTimeout(() => {
    const quickFAQDiv = document.createElement('div');
    quickFAQDiv.className = 'quick-faqs';
    quickFAQDiv.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 15px;
        padding: 0 15px;
    `;
    
    quickFAQs.forEach(faq => {
        const button = document.createElement('button');
        button.textContent = faq.question;
        button.style.cssText = `
            padding: 8px 15px;
            background: var(--dark);
            border: 1px solid var(--border);
            border-radius: 20px;
            color: var(--text);
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        button.addEventListener('click', () => {
            chatInput.value = faq.question;
            sendChatMessage();
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.borderColor = 'var(--primary)';
            button.style.color = 'var(--primary)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.borderColor = 'var(--border)';
            button.style.color = 'var(--text)';
        });
        
        quickFAQDiv.appendChild(button);
    });
    
    chatbotBody.appendChild(quickFAQDiv);
}, 1000);

// ==================== Console Art ====================
console.log(`
%c
   _____  .__        .____    .__              
  /  _  \\ |__|______ |    |   |__|__  __ ____  
 /  /_\\  \\|  \\_  __ \\|    |   |  \\  \\/ // __ \\ 
/    |    \\  ||  | \\/|    |___|  |\\   /\\  ___/ 
\\____|__  /__||__|   |_______ \\__| \\_/  \\___  >
        \\/                   \\/              \\/ 

🎵 Welcome to Air Live Bar 🎵
Where Music Meets Soul | Jubilee Hills, Hyderabad
`, 'color: #FF3D00; font-weight: bold;');

console.log('%cWebsite crafted with passion for music lovers 🎸', 'color: #FFC107; font-size: 14px;');