const { Category } = require('../models/category.model');

const { MyError } = require('../helpers/my-error');

const {checkObjectId} = require('../helpers/checkObjectId');
class CategoryService {
    static getAll() {
        return Category.find({})
    }
    static async createCategory(name) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        try {
            const cate = new Category({ name });
            await cate.save();
            return cate;
        } catch (error) {
            throw new MyError('NAME_CATEGORY_EXISTED', 400);
        }
    }
    static async updateCategory(name, idCate) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        checkObjectId(idCate);
        const cate = await Category.findByIdAndUpdate(idCate,{name},{new:true});
        if(!cate) throw new MyError('CANNOT_FIND_CATEGORY', 404);
        return cate;
    }
    static async removeCategory(idCate){
        checkObjectId(idCate);
        const cate = await Category.findById(idCate);
        if(!cate) throw new MyError('CANNOT_FIND_CATEGORY', 404);
        try {
            if(cate.products.length !== 0)throw new Error;
            const remove = await Category.findByIdAndRemove(idCate);
            return remove;
        } catch (error) {
            throw new MyError('CANNOT_REMOVE_CATEGORY', 400);
        }
    }
}
module.exports = { CategoryService };