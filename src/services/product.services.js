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
    static async updateProduct(name, quantity, cost, price, idCate,idProduct) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        if (!quantity) throw new MyError('QUANTITY_MUST_BE_PROVIDE', 400);
        if (!cost) throw new MyError('COST_MUST_BE_PROVIDE', 400);
        if (!price) throw new MyError('PRICE_MUST_BE_PROVIDE', 400);
        //check 
        checkObjectId(idCate,idProduct);
        //check existed cate
        const cate = await Category.findById(idCate);
        if (!cate) throw new MyError('CANNOT_FIND_CATEGORY', 404);
        
        try {
            //get product old
            const product_old  = await Product.findById(idProduct);
            // if(!product_old) throw new Error();
            //update product
            const updateObjProduct = { name, quantity, cost, price, category:idCate } ;
            const product = await Product.findByIdAndUpdate(idProduct,updateObjProduct,{new:true});
            //update cate
            await Category.findByIdAndUpdate(idCate,{$push:{products:idProduct}},{new:true});
            await Category.findOneAndUpdate(product_old.category,{$pull:{products:idProduct}},{new:true});
    
            return  product;
            
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('NAME_PRODUCT_EXISTED',400); 
            throw new MyError('CANNOT_FIND_PRODUCT',404);  
        }
    }
    static async removeProduct(idProduct){
        checkObjectId(idProduct);
        const product_old = await Product.findById(idProduct);
        if(!product_old) throw new MyError('CANNOT_FIND_PRODUCT',404);
        const product = await Product.findByIdAndRemove(idProduct);
        
        //remove in cate
        await Category.findByIdAndUpdate(product_old.category,{$pull:{products:idProduct}});
        return product;
    }
}
module.exports ={productService};