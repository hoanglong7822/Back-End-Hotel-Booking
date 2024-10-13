const mongoose = require('mongoose');

// Schema cho một filter (bộ lọc)
const filterSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    value: { type: String }, // Giá trị này chỉ cần có cho một số loại bộ lọc như star ratings
});

// Schema cho filter group (nhóm bộ lọc)
const filterGroupSchema = new mongoose.Schema({
    filterId: { type: String, required: true },
    title: { type: String, required: true },
    filters: [filterSchema], // Mảng các bộ lọc
});

// Tạo model từ schema
const FilterGroup = mongoose.model('FilterGroup', filterGroupSchema);

module.exports = FilterGroup;
