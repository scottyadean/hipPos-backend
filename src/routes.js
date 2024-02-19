/* 
 routes for items
*/

const Auth = require('./middleware/auth')
const CategoryController = require('./controllers/CategoryController'); 
const ItemController = require('./controllers/ItemController');

const apiBase = '/api';
const itemBase = `${apiBase}/item`; 
const categoryBase = `${apiBase}/category`;

module.exports = (app)=> {

    // Category routes
    app.get(`${categoryBase}/list`, CategoryController.list);
    app.post(`${categoryBase}/create`, Auth.check, CategoryController.create);
    app.get(`${categoryBase}/read/:slug`, CategoryController.read);
    app.put(`${categoryBase}/update/:id`, Auth.check, CategoryController.update);
    app.delete(`${categoryBase}/delete/:id`, Auth.check, CategoryController.delete);

    // Item routes
    app.get(`${itemBase}/list`, ItemController.list);
    app.get(`${itemBase}/search/:name`, ItemController.search);
    app.post(`${itemBase}/create`, Auth.check, ItemController.create);
    app.get(`${itemBase}/read/:slug`, ItemController.read);
    app.put(`${itemBase}/update/:id`, Auth.check, ItemController.update);
    app.delete(`${itemBase}/delete/:id`, Auth.check, ItemController.delete);
    
       

}