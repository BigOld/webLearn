const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/project', { useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connection.on('open', () => {

    const StarSchema = new mongoose.Schema({
        name: String,
        age:  Number,
        tags: Array
    })

    const StarModel = mongoose.model('stars', StarSchema);

    //读取数据
    // StarModel.find({name:'KUN'}, (err, data) => {
    //     if(err) throw err;
    //     //输出读取出来的数据
    //     console.log(data);
    // });

    //获取单条
    // StarModel.findOne({name:'KUN'}, (err, data) => {
    //     if(err) throw err;
    //     //输出读取出来的数据
    //     console.log(data);
    // });

    //根据 ID 获取数据 By 通过
    StarModel.findById('5faf83e064fc5d35183a859e', (err, data) => {
        if(err) throw err;
        console.log(data);
    })

})