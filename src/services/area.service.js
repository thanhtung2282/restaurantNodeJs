const { Area } = require('../models/area.model');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/my-error')

class AreaService {
    static getAll() {
        return Area.find({}).populate('tables');
    }
    static async createArea(name, position) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        try {
            const area = new Area({ name});
            await area.save();
            return area;
        } catch (error) {
            throw new MyError('NAME_CATEGORY_EXISTED', 400);
        }
    }
    static async updateArea(name,_id) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        checkObjectId(_id)

        try {
            const check  = await Area.findById(_id);
            if(!check) throw new Error();
            const area = await Area.findByIdAndUpdate(_id,{name},{new:true})
            return area;
        } catch (error) {
            if (error.name == 'MongoError') throw new MyError('NAME_AREA_EXISTED', 400);
            throw new MyError('CANNOT_FIND_AREA',404);
        }
    }
    static async removeArea(_id){
        checkObjectId(_id);
        const area = await Area.findByIdAndRemove(_id);
        if(!area) throw new MyError('CANNOT_FIND_AREA',404);
        return area;
    }
}
module.exports = {AreaService};