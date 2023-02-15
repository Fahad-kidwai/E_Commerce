class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }


    search() {
        const keyword = this.queryStr.keyword?
        {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }
       : {}; 
       console.log(keyword);

       this.query = this.query.find({...keyword});
       return this;
    }

    filter(){
         const queryCopy = {...this.queryStr};

         //removing some fields for catogery
         const removeFields = ["keyword","page","limit"];

        removeFields.forEach((key) =>delete queryCopy[key]);

        let qStr = JSON.stringify(queryCopy);
        qStr = qStr.replace(/\b(gt|gte|lt|lte)\b/g,key => `$${key}`);


        this.query = this.query.find(JSON.parse(qStr));
        return this;
    }

    pagination(resultPerPage){
        const currentPage =Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage -1)
        this.query - this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures;