const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");
const strings = require('../utils/strings');

const ItemSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: [true, 'Name is required'] },
    description: { type: String, default: ""},
    brand: { type: String, default: ""},
    image: { type: String, default:'http://picsum.photos/500/500?random'},
    slug:{ type: String, default: "" },
    process: { type: String, default: "scan" },
    code: { type: String, unique: true, required: [true, "A unique code is reqired for items"] },
    sku: { type: String, default: "" },
    qty: { type: Number, default: 0 },
    //qty_detail: [qtyByLocation],
    attributes: {type: Map, default: ()=>{

        return {
            size: "",
            color:  "",
            width:  0 ,
            heigth:   0 ,
            depth: 0 ,
            unit: "in"
        };    


    }},
    price: { type: Number, default: 0.0 },
    status:{ type: String, default:'active'},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    sub_category:{ type:String, default: ""},
    sold_total: {type: Number, default: 0},
    returns_total: {type: Number, default: 0},
    created_at: {type: Date, default: new Date},
});

ItemSchema.pre('save', async function(next){
    this.slug = strings.slug(this.name); 
    next();
});

ItemSchema.pre('updateOne', async function (next) {
    let data = this.getUpdate();
    data.slug = strings.slug(data.name);
    next();
  });


const ItemModel  = mongoose.model('item', ItemSchema);
module.exports = ItemModel;