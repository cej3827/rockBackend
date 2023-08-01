router.post('/', function(req, res, next) {
    let { group_ID } = req.body;
  
    console.log(group_ID);
  
    res.send('respond with a resource');
  });