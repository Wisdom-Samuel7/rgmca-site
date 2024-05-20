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
 
                        
                        <p style="color:#fff;font-family:fantasy;">
                         JOIN THE PANELISTS/INSTRUCTORS for video uploads review and verdicts...
                        </p>

                        <p style="color:#fff;font-family:fantasy;">
                          QUICKLY UPLOAD TWO VIDEOS OF YOU SINGING OR PLAYING THE MUSICAL INSTRUMENT ... 
                       </p>

                       <p style="color:#fff;font-family:fantasy;">
                         VIDEO UPLOADS SHOULD BE 1 MIN:30 SECS.
                       </p>

                       <h1 style="color:cornflowerblue;font-family:fantasy;">
                         WARNING! 
                      </h1>

                      <p style="color:#fff;font-family:fantasy;">
                        On getting to the group please don't post other materials other than your video uploads. Chat group admin for further clarifications if need be    <a href="https://wa.me/+2348093948949">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-whatsapp"
                            viewBox="0 0 16 16">
                            <path
                                d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                        </svg> 08093948949

                    </a>
                      </p>

                        <section>

                          <p style="color:slategrey;font-family:fantasy;" > See you at the top! </p>

                          <p><a href="https://wa.me/+2348093948949" >CLICK HERE TO MEET WITH THE PANELISTS ON WHATSAPP</a></p>
                        
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
