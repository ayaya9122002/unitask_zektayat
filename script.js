let memories = [];

function addMemory() {
    const title = document.getElementById('memoryTitle').value.trim();
    const desc = document.getElementById('memoryDesc').value.trim();
    const imageFile = document.getElementById('memoryImage').files[0];

    if (!title || !desc) {
        alert('❌ الرجاء إدخال عنوان ووصف للذكرى');
        return;
    }

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            memories.push({
                id: Date.now(),
                title: title,
                description: desc,
                image: e.target.result
            });
            refreshUI();
            clearForm();
            alert('✅ تمت إضافة الذكرى بنجاح');
        };
        reader.readAsDataURL(imageFile);
    } else {
        memories.push({
            id: Date.now(),
            title: title,
            description: desc,
            image: null
        });
        refreshUI();
        clearForm();
        alert('✅ تمت إضافة الذكرى بنجاح');
    }
}

function displayMemories() {
    const grid = document.getElementById('memoriesGrid');
    if (!grid) return;
    
    if (memories.length === 0) {
        grid.innerHTML = '<div class="empty-state">📭 لا توجد ذكريات بعد... أضف ذكرى جديدة</div>';
        return;
    }
    
    grid.innerHTML = memories.map((memory, index) => `
        <div class="memory-card">
            ${memory.image 
                ? `<img src="${memory.image}" alt="${escapeHtml(memory.title)}">` 
                : '<div class="no-image">🌸🖼️</div>'}
            <h3>🌸 ${escapeHtml(memory.title)}</h3>
            <p>✨ ${escapeHtml(memory.description)}</p>
            <small>📅 ${new Date(memory.id).toLocaleDateString('ar-EG')}</small>
        </div>
    `).join('');
}

function updateDeleteSelect() {
    const select = document.getElementById('deleteSelect');
    if (!select) return;
    
    if (memories.length === 0) {
        select.innerHTML = '<option value="">-- لا توجد ذكريات للحذف --</option>';
        return;
    }
    
    select.innerHTML = '<option value="">-- اختاري ذكرى للحذف --</option>' +
        memories.map((memory, index) => `<option value="${index}">🌸 ${escapeHtml(memory.title)}</option>`).join('');
}

function deleteSelectedMemory() {
    const select = document.getElementById('deleteSelect');
    const index = select.value;
    
    if (index === "") {
        alert('❌ الرجاء اختيار ذكرى للحذف');
        return;
    }
    
    if (confirm(`💔 هل أنتِ متأكدة من حذف "${memories[index].title}"؟`)) {
        memories.splice(index, 1);
        refreshUI();
        alert('✅ تم حذف الذكرى بنجاح');
    }
}

function refreshUI() {
    displayMemories();
    updateDeleteSelect();
}

function clearForm() {
    document.getElementById('memoryTitle').value = '';
    document.getElementById('memoryDesc').value = '';
    document.getElementById('memoryImage').value = '';
    document.getElementById('fileName').innerText = 'لم يتم اختيار أي ملف';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('memoryImage').addEventListener('change', function() {
    const fileName = document.getElementById('memoryImage').files[0]?.name;
    document.getElementById('fileName').innerText = fileName || 'لم يتم اختيار أي ملف';
});
