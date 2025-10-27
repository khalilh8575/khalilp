// script.js
// تأثير التمرير على الشريط العلوي
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// تأثيرات Scroll Animation من جميع الاتجاهات
const scrollElements = document.querySelectorAll('.scroll-right, .scroll-left, .scroll-bottom, .scroll-top, .scroll-zoom');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scroll-animated');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.2)) {
            displayScrollElement(el);
        }
    });
};

// تحريك أشرطة المهارات عند التمرير إليها
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    skillBars.forEach(bar => {
        const skillLevel = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = skillLevel;
        }, 300);
    });
}

// مراقبة ظهور قسم المهارات
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSection);

// القائمة المتحركة للشاشات الصغيرة
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// إرسال النموذج
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // جمع بيانات النموذج
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // عرض رسالة الانتظار
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // محاكاة إرسال الرسالة (في الواقع الحقيقي، ستستخدم خدمة مثل EmailJS أو Formspree)
    setTimeout(() => {
        // هنا يمكنك إضافة كود الإرسال الفعلي إلى بريدك
        // مثال باستخدام EmailJS:
        /*
        emailjs.send('service_id', 'template_id', formData)
            .then(() => {
                showNotification('تم إرسال رسالتك بنجاح!', 'success');
            })
            .catch(() => {
                showNotification('حدث خطأ في الإرسال، حاول مرة أخرى', 'error');
            });
        */
        
        // لمحاكاة الإرسال الناجح
        showNotification('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً', 'success');
        
        // إعادة تعيين النموذج
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// عرض الإشعارات
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    // إضافة أنماط الإشعار
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// إضافة أنيميشن للإشعارات
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// تشغيل تأثيرات Scroll عند التحميل والتمرير
window.addEventListener('load', handleScrollAnimation);
window.addEventListener('scroll', handleScrollAnimation);

// تأثيرات إضافية للصور
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '0';
        setTimeout(() => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
        }, 100);
    });
});