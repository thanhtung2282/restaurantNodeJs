const { Table } = require('../models/table.model');
const { Area } = require('../models/area.model');
const { checkObjectId } = require('../helpers/checkObjectId');
const { MyError } = require('../helpers/my-error')

class TableService {
    static getAll() {
        return Table.find({});
    }
    static async createTable(name, idArea) {
        if (!name) throw new MyError('NAME_MUST_BE_PROVIDE', 400);
        checkObjectId(idArea);
        const checkArea = await Area.findById(idArea);
        if(!checkArea) throw new MyError('CANNOT_FIND_AREA', 404);
        const table = new Table({ name, area: idArea,status:false });
        await table.save();
        await Area.findByIdAndUpdate(idArea,{$addToSet:{tables:table._id}});
        return table;
    }
    static async updateStatusTable(_id,status) {
        const table = await Table.findByIdAndUpdate(_id,{status});
        return table;
    }

        
}
module.exports = { TableService };