
/**
 * @author Scott Dean
 * @description CRUD api methods for items model
 */

const ItemModel = require('../models/ItemModel');
const CategoryModel = require('../models/CategoryModel');
const mongoose = require('mongoose');
const strings = require('../utils/strings');


module.exports = {

  /**
    * @description return a item by caterogy id
    * @example /api/item/list
    * @method get
    */
  async list(req, res, next){    
        try{
            const props = req.query;
            let query = {};
            
            if ( props.hasOwnProperty('category') ){
                const catIds = `${props.category}`.split("|");
                if (catIds.length > 0 ){
                    query = {category: { $in: catIds}};
                }        
            }
        
            const items = await ItemModel.find(query);
            res.send({result: items, success: true, errors:[]});
        }catch(err){
            res.status(402).send({result: [], success:false, errors: [err.message]})
        }
    },

    /**
    * @description search by name 
    * @example /api/item/search
    * @todo extend to search other fields
    * @method get
    * @param {string} props.name item name  
    */
    async search(req, res, _next){
        try{
            const props = req.name;
            const items = ItemModel.find({name: {$regex: props.name, $options: 'i'} }).sort({name: 1}).limit(1000);
            res.send({result: items, success:true, errors: []});
        }catch(err){
            res.status(422).send({result: [], success:false, errors: [err.message]})
        }
    },

    /**
     * @description Create a new item
     * @example/api/item/create
     * @method post
     */
    async create(req, res, next){
        
        try{
            const props = req.body;

            const category = await CategoryModel.findOne({_id: props.category}).select("name");
            const itemCount = await ItemModel.countDocuments();
            
            const data = {
                name: props.name,
                description: props.description,
                image: props.image,
                process: props.process,
                code: strings.code( strings.prefix(category.name), itemCount ),
                sku: props.sku,
                qty: parseInt(props.qty),
                price: parseFloat(props.price),
                status: 'pending',
                category: props.category,
                sub_category: props.sub_category
            }    
            const item = await ItemModel.create(data);
            res.send({result: item, success:true, errors: []} );
        }catch(err){
            res.status(422).send({result: [], success:false, errors: [err.message]});
            next();           
        }
    },

    /**
    * @description display a single item by slug
    * @example /api/item/:slug
    * @method get
    * @param {string} slug - slug item name
    */
   async read(req, res, _next){
        try{
            const slug  = req.params.slug
            const item = await ItemModel.findOne({slug: slug}).populate("category", ["name"]);
            if( !item ){
                res.status(404).send({result: null, success:false, errors: ["Item Not Found"]});
                return;
            }
            res.send({result: item, success:true, errors: []})
        }catch(err){
            res.status(422).send({result: null, success:false, errors: [err.message]})
        }
    },

   /**
    * @description update an item
    * @endpoint /api/item/update
    * @method post
    */
  async update(req, res, next){
    const props = req.body;
    const _id   = req.params.id;
    try{
        const item = await ItemModel.updateOne( { _id: _id  }, props)
        res.send({result: item, success: true, id: _id, props: props, errors: []});    
    }catch(err){
        res.status(422).send({result: null, success:false, id: _id, props: props, errors: [err.message]})
    }
},


    /**
     * @description soft delete a item
     * @endpoint /api/item/delete/:id
     * @method delete
     * @param {string} id item id
     */
    async delete(req, res, _next){
        try{
            const props = req.body;
            let status = "deleted";

            //take out of trash if flag is set 
            if( props.action && `${props.action}` === 'undelete' ){
                status = "active";
            }
            const _id   = req.params.id
            const item  = await ItemModel.updateOne({_id: _id}, {status: status, name: "" });
            res.send({result: item, success:true, id: _id, errors: []});  
        }catch(err){
            res.status(422).send({result:null, success:false, errors: [err.message]})
        }        
    },

    

}



