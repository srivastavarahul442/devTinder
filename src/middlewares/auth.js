
const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminValid = token==="xyz";
  
    if (!isAdminValid) {
      res.status(401).send("Auth failed");
    } else {
      next();
    }
  }

  const userAuth = (req, res, next) => {
    const token = "xyz";
    const isAdminValid = token==="xyz";
  
    if (!isAdminValid) {
      res.status(401).send("Auth failed");
    } else {
      next();
    }
  }

module.exports={adminAuth,userAuth}