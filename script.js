let memories = [];

function addMemory() {
    const title = document.getElementById('memoryTitle').value.trim();
    const desc = document.getElementById('memoryDesc').value.trim();
    const imageFile = document.getElementById('memoryImage').files[0];

    if (!title || !desc) {
        alert('❌ الرّجاء إدخال عنوان ووصف للذّكرى');
        return;
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const memory = {
                id: Date.now(),
                title: title,
                description: desc,
                image: e.target.result
            };
            memories.push(memory);
            displayMemories();
            clearForm();
            alert('✅ تمت إضافة الذّكرى بنجاح');
        };
        reader.readAsDataURL(imageFile);
    } else {
        const memory = {
            id: Date.now(),
            title: title,
            description: desc,
            image: null
        };
        memories.push(memory);
        displayMemories();
        clearForm();
        alert('✅ تمت إضافة الذّكرى بنجاح');
    }
}

function displayMemories() {
    const grid = document.getElementById('memoriesGrid');
    grid.innerHTML = '';
    
    if (memories.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width:100%;">📭 لا توجد ذكريات بعد... أضف ذكرى جديدة</p>';
        return;
    }
    
    memories.forEach(memory => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            ${memory.image ? `<img src="${memory.image}" alt="${memory.title}">` : '<div style="height:160px; background:#f0e1f0; text-align:center; line-height:160px; border-radius:15px;">🖼️ لا توجد صورة</div>'}
            <h3>${escapeHtml(memory.title)}</h3>
            <p>${escapeHtml(memory.description)}</p>
            <small>📅 ${new Date(memory.id).toLocaleDateString('ar-EG')}</small>
        `;
        grid.appendChild(card);
    });
}

function clearForm() {
    document.getElementById('memoryTitle').value = '';
    document.getElementById('memoryDesc').value = '';
    document.getElementById('memoryImage').value = '';
    document.getElementById('fileName').innerText = 'لم يتمّ اختيار أيّ ملف';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// إضافة حدث تغيير لملف الصورة
document.getElementById('memoryImage').addEventListener('change', function() {
    const fileName = document.getElementById('memoryImage').files[0]?.name;
    if (fileName) {
        document.getElementById('fileName').innerText = fileName;
    } else {
        document.getElementById('fileName').innerText = 'لم يتمّ اختيار أيّ ملف';
    }

});// ==========

// دالة عرض الذكريات مع زر حذف
function displayMemories() {
    let memories = JSON.parse(localStorage.getItem('memories') || '[]');
    let grid = document.getElementById('memoriesGrid');
    
    if (!grid) return;
    
    if (memories.length === 0) {
        grid.innerHTML = '<div style="text-align:center; color:#999; padding:20px;">✨ لا توجد ذكريات بعد... أضف أول ذكرى ✨</div>';
        return;
    }
    
    grid.innerHTML = '';
    
    for (let i = 0; i < memories.length; i++) {
        let memory = memories[i];
        let card = document.createElement('div');
        card.style.cssText = 'border:1px solid #ddd; padding:15px; margin:10px; border-radius:8px; background:#fff; box-shadow:0 2px 5px rgba(0,0,0,0.1);';
        
        card.innerHTML = `
            <h3 style="margin:0 0 10px 0; color:#333;">📌 ${escapeHtml(memory.title || '')}</h3>
            <p style="margin:0 0 10px 0; color:#666;">${escapeHtml(memory.description || '')}</p>
            <button onclick="deleteMemory(${i})" style="background:#dc3545; color:white; border:none; padding:6px 12px; border-radius:5px; cursor:pointer;">🗑️ حذف</button>
        `;
        grid.appendChild(card);
    }
}

// دالة حذف الذكرى
function deleteMemory(index) {
    if (confirm('⚠️ هل أنت متأكد من حذف هذه الذكرى؟')) {
        let memories = JSON.parse(localStorage.getItem('memories') || '[]');
        memories.splice(index, 1);
        localStorage.setItem('memories', JSON.stringify(memories));
        displayMemories();
    }
}

// تشغيل عرض الذكريات عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', function() {
    displayMemories();
});