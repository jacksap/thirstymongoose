var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create the model below

var commentSchema = new Schema({
    content: String
}, {
    timestamps: true
});

var beerSchema = new Schema({
    name: String,
    style: String,
    bars: [{ type: Schema.Types.ObjectId, ref: 'Bar'}],
    comments: [commentSchema]
}, {
    timestamps: true
});

beerSchema.post('remove', function(beer) {
    var Bar = this.model('Bar');
    Bar.find({beers: beer._id}, function(err, bars) {
        bars.forEach(function(bar){
            bar.beers.remove(beer._id);
            bar.save();
        });
    });
});

module.exports = mongoose.model('Beer', beerSchema)