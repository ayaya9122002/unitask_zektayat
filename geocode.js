// دالة تحويل اسم المكان إلى إحداثيات (خط العرض والطول)
async function getCoordinates(locationName) {
    if (!locationName || locationName.trim() === '') {
        alert('❌ الرجاء إدخال اسم المكان');
        return null;
    }

    try {
        // استدعاء خدمة Nominatim (مجانية، لكن بطيئة شوي)
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`);
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                displayName: data[0].display_name
            };
        } else {
            alert(`⚠️ لم يتم العثور على "${locationName}". حاولي كتابة اسم أدق (مثل: "برج إيفل، باريس")`);
            return null;
        }
    } catch (error) {
        console.error('خطأ في جلب الإحداثيات:', error);
        alert('❌ حدث خطأ في الاتصال بخدمة الخرائط. تأكدي من اتصالك بالإنترنت.');
        return null;
    }
}