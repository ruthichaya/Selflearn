const express=require("express")
const loginCon = require("../controllers/users.js")
// import {register,login} from "../controllers/users.js"
const verifyJWT = require("../middleware.js/verifyJWT")

const router = express.Router()


router.get("/getStudentsWithMarks",loginCon.getStudentsWithMarks)

router.get("/login/:id/:password",loginCon.login)
router.get("/getUser/:id",loginCon.getStud)
//router.get("/:id",loginCon.get)
//router.delete("/",loginCon.Delete)
router.route("/sendMail")   
    .post(loginCon.sendMail)
router.route("/:id")
    .delete(loginCon.Delete)
    .get(loginCon.get)
    .put(loginCon.update)
 //export default router
router.route("/")
    .get(loginCon.getAll)
    // .post(verifyJWT,loginCon.register)
    .post(loginCon.register)

router.route("/sendMailforNotRegist")   
    .post(loginCon.sendMailforNotRegist)
router.route("/sendMailforResetPass")   
    .post(loginCon.sendMailforResetPass)
    //.get(loginCon.getAllByParam);
router.route("/visit/getLevelsofStudent")
    .get(loginCon.getLevelsofStudent)
router.route("/visit/byStudent")
    .get(loginCon.getByIdStudent)  
// router.route("/visit/getlevel/:id")  
//     .get(loginCon.getLevelsByIdStudent)
 
router.route("/visit/:id")
    .get(loginCon.getByIdVisit)
 
router.route("/visit")
    .post(loginCon.addVisit)


module.exports=router
