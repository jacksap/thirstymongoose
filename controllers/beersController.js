const Beer = require('../models/Beer');
const Bar = require('../models/Bar');

module.exports = {

    index: function(req, res, next) {
        Beer.find({}, function(err, beers) {
            if (err) return next(err);
            res.render('beers/index', { beers: beers });
        });
    },

    new: function(req, res, next) {
        res.render('beers/new');
    },

    create: function(req, res, next) {
        let data = req.body;
        Beer.create({
            name: data.name,
            style: data.style,
        }, function(err) {
            if (err) return next(err);
            res.redirect('/beers');
        });
    },

    show: function(req, res, next) {
        Beer.findById(req.params.id).populate('bars').exec(function(err, beer) {
            if (err) return next(err);
            Bar.find({}, function(err, bars) {
                res.render('beers/show', {beer, bars});
        });
    });
},

    createComment: function(req, res, next) {
        Beer.findById(req.params.id, function(err, beer) {
            if (err) return next(err);
            var newComment = {
                content: req.body.content
            };
            beer.comments.push(newComment);
            beer.save(function(err) {
                if (err) return next(err);
                res.redirect("/beers/" + beer._id);                
            });
        });
    },

    addBar: function(req, res, next) {
        Beer.findById(req.params.id, function(err, beer) {
            if (err) return next(err);
            Bar.findById(req.body.bar, function(err, bar) {
                if (err) return next(err);
                beer.bars.push(bar);
                beer.save(function(err) {
                    if (err) return next(err);
                    bar.beers.push(beer);
                    bar.save(function(err) {
                        if (err) return next(err);
                        res.redirect("/beers/" + beer._id);
                    });
                });
            });
        });
    },

    removeBar: function(req, res, next) {
        Beer.findById(req.params.id, function(err, beer){
            if (err) return next(err);
            beer.bars.remove(req.params.cid);
            beer.save(function (err) {
                if (err) return next(err);
                Bar.findById(req.params.cid, function(err, bar){
                    if (err) return next(err);
                    bar.beers.remove(beer._id);
                    bar.save( function(err) {
                        if (err) return next(err);
                        res.redirect('/beers/' + beer._id);
                    });
                });
            });
        });
    },

    destroy: function(req, res, next) {
        Beer.remove({_id: req.params.id}, function(err){
            if (err) return next(err);
            res.redirect('/beers');
        });
    }
}
