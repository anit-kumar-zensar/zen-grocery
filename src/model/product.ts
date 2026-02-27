/* eslint-disable @typescript-eslint/no-explicit-any */
class Product{
    _id:string = '';
    name:string = '';
    price:number = 0;
    category:string ='';
    imageUrl?:string=''

    constructor(init:any){
     if(!init) return;
     if(init.id){
        this._id = init._id
     }
     if(init.name){
        this.name = init.name
     }
     if(init.price){
        this.price = init.price;
     }
     if(init.category){
        this.category = init.category
     }
     if(init.imageUrl){
        this.imageUrl = init.imageUrl
     }
    }
}

export {Product}