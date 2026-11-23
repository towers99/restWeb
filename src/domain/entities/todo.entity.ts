


export class TodoEntity {

    constructor(

     public id: number,
     public text: string,
     public completedAt?: Date|null

    ){};



   get isCompleted():any {

      return !!this.isCompleted

   };

   static fromObject(object: {[key: string]: any}):TodoEntity {

    const {id, text, createAr} = object;
    if (!id) throw 'Id is required';
    if (!text) throw 'Text is required';
    
    let newCreateAr;
    if(createAr) {
      newCreateAr = new Date(createAr);
      if (isNaN(newCreateAr.getTime())) {
         throw 'CreateAr is not a valid Date'
      }
    };

    return new TodoEntity(id, text, createAr)

   };
   


}