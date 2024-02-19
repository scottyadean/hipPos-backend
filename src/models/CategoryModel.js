const mongoose = require("mongoose");
const strings = require('../utils/strings');

const CategorySchema = new mongoose.Schema({
    name: { type: String,  unique: true, required: [true, 'Name is required'] },
    description: { type: String, default: ""},
    image: { type: String, default:'http://picsum.photos/500/500?random'},
    slug:{ type: String },
    status:{ type: String, default:'active'},
    created_at: {type: Date, default: new Date},
});

CategorySchema.pre('save', async function(next){
    this.slug = strings.slug(this.name);
    next();
});

CategorySchema.pre('updateOne', async function (next) {
    let data = this.getUpdate();
    data.slug = strings.slug(data.name);
    next();
  });

const categoryModel  = mongoose.model('category', CategorySchema);
module.exports = categoryModel;