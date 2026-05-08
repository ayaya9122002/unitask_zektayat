// دوال التحقق لمشروع ذكريات السفر

function validateMemory(description, photo) {
  if (!description || description.trim() === '') return false;
  if (!photo || photo.trim() === '' || !photo.includes('.')) return false;
  return true;
}

function canDeleteMemory(memoryId) {
  if (!memoryId || typeof memoryId !== 'string') return false;
  return true;
}

function canLikeMemory(memoryId, alreadyLiked) {
  if (!memoryId) return false;
  if (alreadyLiked && alreadyLiked.includes(memoryId)) return false;
  return true;
}

function validateCategory(category) {
  if (!category || category.trim() === '') return false;
  return true;
}

function validateCoordinates(lat, lng) {
  if (lat === null || lng === null || lat === undefined || lng === undefined) return false;
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  return true;
}

// هادا السطر ضروري عشان نستدعي الدوال في ملف الاختبار
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateMemory, canDeleteMemory, canLikeMemory, validateCategory, validateCoordinates };
}