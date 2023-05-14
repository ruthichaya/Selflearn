const db = require("../models/index")
const Student = db.students
const Visit_student = db.visits_students
const Test = db.tests;

const Visits_levels = db.visits_levels
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");
const mails = require("../services/mails.js");

class StudentDataAccessor {
    async getAll() {
        const users = await Student.findAll();
        console.log(users.every(user => user instanceof Student)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
        return (users)
    }
    getAllByParam(param) {
        var condition = param ? { param: { [Op.like]: `%${param}%` } } : null;

        return students.findAll({ where: condition })
    }

    getStudentById(id) {
        return Student.findByPk(id)
        //  const users2= await Student.findOne({
        //     where: {
        //       idstudents: {
        //         [Op.eq]: id
        //       }
        //     }
        //   });

        //    return(users2)
    }
    async delete(id) {
        return Student.destroy({
            where: { idstudents: id }
        })
        // await Student.destroy({
        //     where: {
        //         idstudents: {
        //         [Op.eq]:id
        //       }
        //     }
        //   });
        //   return "delete sucsses";
    }



    // async register(user) {
    //     const name = user.name
    //     const grade = user.grade
    //     const mail = user.mail
    //     const phone = user.phone
    //     const id = user.id
    //     const password = user.password
    //     const ismanager = user.ismanager
    //     return await Student.create({ name, grade, mail, phone, id, password, ismanager })

    // }

    async register(user) {
        const name = user.name
        const grade = user.grade
        const mail = user.mail
        const phone = user.phone
        const id = user.id
        const password = user.password
        const ismanager = user.ismanager
        const newUser= await Student.create({ name, grade, mail, phone, id, password, ismanager })
        console.log('maillllll',user.mail)
        if (newUser) {
            mails.sendEmail(user.mail, `${user.name} היקרה! `, "נרשמת בהצלחה למערכת 'LetTargel' נשמח לראותך...📖📕📝")}
        return newUser
    }
    async sendMail(userName,userMail,content){
            await mails.sendEmail("36325569028@mby.co.il", `נשלח מאת המשתמש: ${userName}  מייל: ${userMail}  `,  ` ${content}`)
    }
    async sendMailforNotRegist(userName,userMail,userPhone,content){
        await mails.sendEmail("36325569028@mby.co.il", `נשלח מאת המשתמש: ${userName}  מייל: ${userMail}  טלפון: ${userPhone} `,  ` ${content}`)
}
async sendMailforResetPass(userId,userMail,userPass){
    await mails.sendEmail(userMail,`נשלח מאת LetTargel`,`הסיסמה שלך היא: ${userPass}`)
}

    updateById(id, user) {
        return Student.update(user, {
            where: { idstudent: id }
        })
    }

    async login(id1, password1) {
        console.log("from login in user dal")
        console.log(id1)
        console.log(password1)
        // const found=await Student.findOne({
        return await Student.findOne({
            where: {
                [Op.and]: [
                    { id: parseInt(id1) },
                    { password: parseInt(password1) }
                ]

            }
        });

    }

    async getStud(id1) {
        console.log("from login in user dal")
        console.log(id1)
        // const found=await Student.findOne({
        return await Student.findOne({
            where: {
                [Op.and]: [
                    { id: parseInt(id1) }
                ]

            }
        });
    }


    getByIdVisit(id) {
        return Visit_student.findByPk(id)
    }
    getByIdStudent(param) {
        var condition = param ? { idstudent: { [Op.like]: `%${param}%` } } : null;

        return Visit_student.findAll({ where: condition })
    }

    async addVisit(visit) {
        const idstudent = visit.idstudent
        const enterdate = visit.enterdate
        const exitdate = visit.exitdate
        const idlevel = visit.idlevel
        await Visit_student.create({ idstudent, enterdate, exitdate, idlevel })
    }
    getLevelsofStudent(id) {
        return Visit_student.findAll({
            where: {
                idstudent: id
            },
            include: [
                {
                    model: db.visits_levels, attributes: [],
                    include: [{
                        model: db.levels, attributes: ['description'],
                        include: [{
                            model: db.subsubjects, attributes: ['description'],
                            include: [{ model: db.subjects, attributes: ['description'] }]
                        }]
                    }]
                },
            ],
            raw: true,
            attributes: []
        })

    }

    async getStudentsWithMarks() {
        const students = await Student.findAll();
        const studentsWithAnswers = await Promise.all(
            students.map(async (q) => {
            const condition = q.dataValues.idstudent
              ? { idstudent: { [Op.eq]: q.dataValues.idstudent } }
              : null;
    
    
            const ss = await Test.findAll({ where: condition });
            return { ...q.dataValues, ss };
          })
        );
    
        
    
        return studentsWithAnswers;
      }
}
const studentDataAccessor = new StudentDataAccessor();

module.exports = studentDataAccessor;