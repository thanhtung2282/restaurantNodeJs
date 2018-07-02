const {Category} = require('../models/category.model');

const {MyError} = require('../helpers/my-error');

class CategoryService {
    static getAll(){
        return Category.find({})
    }
    static async createCategory(name){
        if(!name) throw new MyError('NAME_MUST_BE_PROVIDE',400);
        try {
            const cate = new Category({name});
            await cate.save();
            return cate;
        } catch (error) {
            throw new MyError('NAME_CATEGORY_EXISTED',400);
        }
    }
}
module.exports = {CategoryService};