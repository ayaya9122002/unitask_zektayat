// جلب الذكريات من localStorage
let memories = JSON.parse(localStorage.getItem('memories')) || [];

// تهيئة الخريطة في منتصف العالم تقريباً
const map = L.map('map').setView([30.0444, 31.2357], 2);

// إضافة طبقة الخريطة (خريطة خفيفة وجميلة)
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
}).addTo(map);

// إذا لم توجد ذكريات
if (memories.length === 0) {
    L.popup()
        .setLatLng([30.0444, 31.2357])
        .setContent('📭 لا توجد ذكريات... أضف ذكرى أولاً من الصفحة الرئيسية')
        .openOn(map);
}

// دالة مساعدة لحماية النصوص
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// إضافة علامة لكل ذكرى (فقط اللي عندها إحداثيات صحيحة)
memories.forEach((memory) => {
    if (memory.lat && memory.lon && !isNaN(memory.lat) && !isNaN(memory.lon)) {
        const marker = L.marker([memory.lat, memory.lon]).addTo(map);
        marker.bindPopup(`
            <div style="text-align:center; direction:rtl; min-width:180px;">
                ${memory.image 
                    ? `<img src="${memory.image}" style="width:120px; height:90px; object-fit:cover; border-radius:12px; margin-bottom:8px;">` 
                    : '<div style="font-size:48px; margin:8px 0;">🖼️</div>'}
                <h3 style="margin:8px 0 4px; color:#9b59b6;">🌸 ${escapeHtml(memory.title)}</h3>
                <p style="margin:4px 0; font-size:13px; color:#666;">📍 ${escapeHtml(memory.locationName || memory.title || 'مكان غير محدد')}</p>
                <p style="margin:8px 0; font-size:12px; color:#888;">✨ ${escapeHtml(memory.description.substring(0, 100))}...</p>
                <small style="color:#c084fc;">📅 ${new Date(memory.id).toLocaleDateString('ar-EG')}</small>
            </div>
        `);
    }
});