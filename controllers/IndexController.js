var IndexController={
  index:(req, res)=>{
    res.render('index', {title: 'Express'});
  }
}

module.exports = IndexController;
