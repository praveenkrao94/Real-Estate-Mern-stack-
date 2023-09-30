
const userHandlers = {
    test: (req, res) => {
      res.json({
        message: 'test1'
      });
    },
    test2:(req,res)=> {
      res.json({
        message: 'test2'
      })
    }
  };
  
  module.exports = userHandlers;
  