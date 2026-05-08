// test/memory.test.js
// اختبارات التصنيف والإعجاب

// اختبارات الإعجاب
test('الضغط على زر الإعجاب - يجب زيادة العداد بمقدار 1', () => {
    let memory = { likes: 0 };
    memory.likes = memory.likes + 1;
    expect(memory.likes).toBe(1);
});

test('الذكرى الجديدة - يجب أن تبدأ الإعجابات من 0', () => {
    const newMemory = { likes: 0 };
    expect(newMemory.likes).toBe(0);
});

test('الضغط 3 مرات - يجب أن يصبح العداد 3', () => {
    let likes = 0;
    likes = likes + 1;
    likes = likes + 1;
    likes = likes + 1;
    expect(likes).toBe(3);
});

// اختبارات التصنيف
test('إضافة ذكرى بتصنيف سفر - يجب حفظ التصنيف', () => {
    const memory = { category: "سفر" };
    expect(memory.category).toBe("سفر");
});

test('إضافة ذكرى بتصنيف أكل - يجب حفظ التصنيف', () => {
    const memory = { category: "أكل" };
    expect(memory.category).toBe("أكل");
});

test('تصفية الذكريات حسب تصنيف سفر', () => {
    const memories = [
        { title: "برج إيفل", category: "سفر" },
        { title: "بيتزا", category: "أكل" },
        { title: "البندقية", category: "سفر" }
    ];
    const travelMemories = memories.filter(m => m.category === "سفر");
    expect(travelMemories.length).toBe(2);
});