
class BaseModel {
  constructor(model,criteria,select,populate,options) {
    this.model = model;
    this.criteria=criteria
    this.select=select
    this.populate=populate
    this.options=options
  }
  
  async findAll() {
      try{
        const allData=await this.model.find();
        return allData
      }
      catch(err){
        throw err
      }
  }
}
  
     
module.exports = BaseModel;




