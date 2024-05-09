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
                         WELDONE....  ${email}
                      </div>
 
                      <div> 
                        <p style="margin-top:1em;margin-bottom:1em;font-size:1.2em;">A big congratulations to you from RHYTHM & LYRICS PROJECT MGT TEAM for your successful registeration </p>
                         <div style="width:100%;height:fit-content;style:"border-radius:.5em;"> <img src="https://img.freepik.com/free-photo/passionate-black-male-singer-performing-against-red_1258-26348.jpg?t=st=1713625949~exp=1713629549~hmac=e32591c744d4c6fffe4c79b378012b9c5e71256a3f0c70b7a462bf4cceb3ebe2&w=740"></div>
                      </div>

                      <div>
                        
                      <p> Your registeration was quite successfull! </p>
                         <h1 style="margin-top:1em;margin-bottom:1em;color:cornflowerblue;">YOU ARE WELCOME ON BOARD..</h1>

                        <p style="color:slategrey;font-family:fantasy;">Please follow the audition process below to navigate your way to the Telegram audition room and upload your personal performance videos </p>
                        
                        <p>

                           REVAMPED GOSPEL MUSIC COMPETITION AWARDS (RGMCA 2024) is determined and dedicated music talented folks with resilience.
                          
                         </p>
                        
                        <p style="color:cornflowerblue;font-family:fantasy;">
                          AUDITION ENDS ON THE 26TH OF MAY , 2024.
                    
                        </p>

                        <section>

                         <p style="color:slategrey;font-family:fantasy;" > See you at the top </p>
                        
                        </section>

                        <p>

                        <article>
                    
                       <ol> 
                           <li> 
                               <p>
                                 PLEASE JOIN THE INFO GROUP and immediately request from the admin <a href="https://wa.me/+2348093948949">here</a> for the link to the FREE UPLOADS/REVIEWING GROUP and get started now.
                               </p>
                           </li>
               
               
                           <li> &nbsp;See the link below </li>

                           <li> <a href="https://chat.whatsapp.com/CffGVOk1Q43CTwlaTdoOwo">here</a>  </li>
                          
                       </ol>
                      </article>
                        </p>

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

app.listen(3000, () => {
    console.log("SERVER CONNECTED")
})
