const mongoose = require('mongoose')
const data = require('./data')
const Listening = require('../models/listening')

mongoose.connect('mongodb://127.0.0.1:27017/demo_template').then(res=>{
    console.log('Database connected');
}).catch(err=>{
    console.log("Error in Database connection");
})

// const initDB = async()=>{
// await Listening.deleteMany({})
// }

const initDB =  async ()=>{
    for(let i = 0; i<= data.data.length -1; i++){
        let hello = new Listening({
            title: data.data[i].title,
            price: data.data[i].price,
            location: data.data[i].location,
            image_name: data.data[i].image.filename,
            image_url: data.data[i].image.url,
            description: data.data[i].description,
            country: data.data[i].country
        })

        Listening.findOne({title:data.data[i].title}).then(result=>{
            if(result == null){
                hello.save().then(saveData=>{
                    console.log(saveData);
                }).catch(err=>{
                    console.log(err);
                })
            }
        }).catch(errr=>{
            console.log(errr);
        })
    }
}

initDB()


