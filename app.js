const express = require("express")
const path = require("path")
const app = express()
const mongoose = require("mongoose")

const mailer = require("nodemailer")

const { log } = require("console")

const bp = require("body-parser")

app.use(bp.json())

app.use(bp.urlencoded({ extended: false }))


mongoose.connect("mongodb+srv://REVAMPEDMUSIC:REVAMPEDMUSIC@cluster0.3riocwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const Regiters = mongoose.Schema({
    name: String,
    stage: String,
    craft: String,
    whatsappnumber: Number,
    email: String,
    state: String,
    city: String
})

const RegiteredUser = mongoose.model("revampedmusic", Regiters)

const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: "rhythmlyricsrevamped@gmail.com",
        pass: "sjcm cixm wflt paoc"
    }
})

// auth: {
//     user: "wisdomsamuel349@gmail.com",
//     pass: "hgtd wscf bywx gcrj"
// }

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/index.html")
})

app.post("/", async (req, res) => {

    try {

        const { name, stage, craft, whatsappnumber, email, state, city } = req.body
        const CheckPoint = await RegiteredUser.exists({ email })
        if (CheckPoint) {
            res.status(200).send("USER ALREADY EXIST")
        } else {
            const user = await RegiteredUser.create({ name, stage, craft, whatsappnumber, email, state, city })
            log(user)
            res.send("THANK YOU FOR REGISTERING,PLEASE CHECK YOUR EMAIL...")


            const mailOpts = {
                from: "rythmandlyricsproject@gmail.com",
                to: email,
                subject: "REVAMPED MUSIC",
                html: `
                <div style="width:100%;height:100%;font-weight:bolder;background:rgba(0,0,0,.9);color:#fff;">
                     <h1 style="color:#fff;font-family:fantasy;"> Rythm and Lyrics Project </h1>
                     <p><h2 style="color:steelblue;font-family:cursive;">RGMCA 2024</h2></p>
                     https://rythmandlyricsproject.onrender.com/     
                      <div style="width:100%;height:fit-content;padding:2em 0;display:flex;flex-diection:column;justify-content:center;align-items:center;">
                         WELDONE ....  ${email}
                      </div>
 
                      <div> 
                        <h1 style="margin-top:1em;margin-bottom:1em;font-size:1.2em;"> Wow! </h1>
                         <div style="width:100%;height:fit-content;style:"border-radius:.5em;"> <img src="https://img.freepik.com/free-photo/passionate-black-male-singer-performing-against-red_1258-26348.jpg?t=st=1713625949~exp=1713629549~hmac=e32591c744d4c6fffe4c79b378012b9c5e71256a3f0c70b7a462bf4cceb3ebe2&w=740"></div>
                      </div>

                      <div>
                        
                         <h1 style="margin-top:1em;margin-bottom:1em;color:cornflowerblue;">YOU ARE WELCOME ON BOARD!</h1>
 

                          <p>
                             Please follow the few instructions below!
                          </p>
                        
                        <p style="color:cornflowerblue;font-family:fantasy;">
                          
                           <ol>

                             <li> YOU ARE REQUIRED TO PAY A FEE FOR service charge in the tune of #2500.It covers downloading video uploads of participants,reviews and timely feedbacks. </li>

                              <li> MAKE A PAYMENT PROOF TO THE DRHIHMAKX CO LTD <span style="color:cornflowerblue;">0204103393 (UNION BANK PLC).<span> </li>

                              <li> SEND PAYMENT PROOF TO admin on <a href="https://wa.me/+2348093948949"> 08093948949 </a> and gain access to video uploads/ audition room. </li>
 
                              <li> CLICK <a href="https://chat.whatsapp.com/GgX5MpbzxZIGpdfXMaG46t">here</a> TO JOIN THE UPDATES GROUP <li>
                           </ol>
                    
                        </p>

                        <section>

                          <p style="color:slategrey;font-family:fantasy;" > See you at the top </p>
                        
                        </section>


                      </div>
                      
                </div>`
            }

            transporter.sendMail(mailOpts, (err, data) => {
                if (err) {
                    console.log("ERROR :" + err)
                    // res.json({message:err})
                } else {
                    console.log(data.response)
                    // res.json({message:data.response})
                }
            })

        }


    } catch (error) {
        console.log(error)
    }
})

app.get("/rgmca/registeration/process", (req, res) => {
    res.sendFile(__dirname + "/view/regprocess.html")
})

app.get("/rgmca/upload-portal", (req, res) => {
    res.sendFile(__dirname + "/view/portal.html")
})

app.listen(4000, () => {
    console.log("SERVER CONNECTEDn -- 4000")
})
