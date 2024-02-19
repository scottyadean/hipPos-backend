/**
 * @author Scott Dean
 * @description CRUD api methods for category model
 */

const categoryModel = require("../models/CategoryModel");
const CategorySchema = require("../models/CategoryModel");

module.exports = {

    /**
    * @description list all categories
    * @endpoint /api/category/list
    * @method get
    */
    async list(_req, res, _next){
        try{
            const cats = await categoryModel.find( { status: "active"} );
            res.send({result: cats, success:true, errors: []})
        }catch(err){
            res.status(422).send({result: null, success:false, errors: [err.message]})
        }

    },

    /**
     * @description Create a new category
     * @endpoint /api/category/create
     * @method post
     */
    async create(req, res, next){
        try{
            const props = req.body;
            const data = {
                name: props.name,
                description: props.description,
                image: props.image,
            }    
            const cat = await CategorySchema.create(data);
            res.send({result: cat, success:true, errors: []} );
        }catch(err){
            res.status(422).send({result: [], success:false, errors: [err.message]});
            next();           
        }
    },

    /**
    * @description display a single category by slug
    * @endpoint /api/category/:slug
    * @method get
    * @param {string} slug - slug item name
    */
   async read(req, res, _next){
    try{
        const slug  = req.params.slug
        const item = await categoryModel.findOne({slug: slug});
        if( !item ){
            res.status(404).send({result: null, success:false, errors: ["Category Not Found"]});
            return;
        }
        res.send({result: item, success:true, errors: []})
    }catch(err){
        res.status(422).send({result: null, success:false, errors: [err.message]})
    }

    },

   /**
    * @description update a category
    * @endpoint /api/category/update
    * @method post
    */
   async update(req, res, next){
        
        const props = req.body;
        const _id   = req.params.id;
        
        try{
            const cat   = await categoryModel.updateOne( { _id: _id  }, props)
            res.send({result: cat, success: true, id: _id, props: props, errors: []});    
        }catch(err){
            res.status(422).send({result: null, success:false, id: _id, props: props, errors: [err.message]})
        }
    },

    /**
     * @description Soft delete a category by setting status = deleted
     * @endpoint /api/category/delete/:id
     * @method delete
     * @param {string} id category id
     */
    async delete(req, res, next){
        try{
            const props = req.body;
            let status = "deleted";

            //take out of trash if flag is set 
            if( props.action && `${props.action}` === 'undelete' ){
                status = "active";
            }

            const _id   = req.params.id
            const cat   = await categoryModel.updateOne({_id: _id}, {status: status});
            res.send({result: cat, success:true, id: _id, errors: []});  
        }catch(err){
            res.status(422).send({result:null, success:false, errors: [err.message]})
        }        
    },

}
