const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/project', { useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on('open', () => {

    const StarSchema = new mongoose.Schema({
        name: String,
        age:  Number,
        tags: Array
    })

    const StarModel = mongoose.model('stars', StarSchema);

    //更新
    // StarModel.updateOne({name:'蔡徐坤'}, {name:'KUN'}, (err, data) => {
    //     if(err) throw err;
    //     console.log(data);
    // });

    StarModel.updateMany({name:'蔡徐坤'}, {name:'KUN'}, (err, data) => {
        if(err) throw err;
        console.log(data);
    });
})