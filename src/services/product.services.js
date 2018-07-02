
const { MyError } = require('../helpers/my-error')
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');
const { checkObjectId } = require('../helpers/checkObjectId');

class productService {
    static getALL() {
        return Product.find({});
    }
    static async createProduct(name, quantity, cost, price, idCate) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        if (!quantity) throw new MyError('QUANTITY_MUST_BE_PROVIDE', 400);
        if (!cost) throw new MyError('COST_MUST_BE_PROVIDE', 400);
        if (!price) throw new MyError('PRICE_MUST_BE_PROVIDE', 400);
        //check 
        checkObjectId(idCate);
        //create produc
        const product = new Product({ name, quantity, cost, price, category:idCate });
        //update cate
        const updateObj = { $push: { products: product._id } };
        const cate = await Category.findByIdAndUpdate(idCate, updateObj);
        //idCate not found
        if (!cate) throw new MyError('CANNOT_FIND_CATEGORY', 404);
        //save product
        return product.save();
    }
}
module.exports ={productService};