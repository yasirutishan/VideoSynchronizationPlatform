let chai = require("chai")
let mocha = require("mocha")
let chaiHttp = require("chai-http")

let sever = require("../server")
chai.use(chaiHttp)
let should = chai.should()

describe('user', () => {
    let logingdata = {
        email: 'yasirutishan@gmail.com',
        password: '123'
    }

    it('/login', (done) => {
        chai.request(sever.app)
            .post('/login')
            .send(logingdata)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                res.should.have.status(200)
                done()
            })
    })

    let signupdata = {
        title: 'Mr',
        firstname: 'Kamal',
        lastname: 'Silva',
        nic: '200024973572',
        address: 'Colombo',
        contact: '0777260954',
        email: 'kamal@gmail.com',
        password: '12345'
    }

    it('/signup', (done) => {
        chai.request(sever.app)
            .post('/signup')
            .send(signupdata)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})

describe('room', () => {
    it('/:room', (done) => {
        chai.request(sever.app)
            .get('/:'+1)
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                res.should.have.status(200)
                done()
            })
    })
})