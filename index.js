const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
const streamifier = require("streamifier");
const sendgrid = require("@sendgrid/mail");

sendgrid.setApiKey(process.env.API_KEY);

const app = express();
const port = 2335;
const imageData = multer();

app.use(express.json());

cloudinary.config({
  cloud_name: "dv4dlmp4e",
  api_key: "464513458841612",
  api_secret: "VxFfeGaNMPPudxcq0GWcsh6zfRk",
});

const msg = {
  to: "codelabproject2@gmail.com", // Change to your recipient
  from: "newstudentsportal2@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: `  <container>
    <row>
      <columns small="12" >

        <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">

          <div width="350" height="150" align="center" style="border-radius: 50%;">
           <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857306/NYCNi_wvwlde.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
            <img src="https://res.cloudinary.com/dv4dlmp4e/image/upload/v1667857308/Lagos_kidbfs.png" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
          </div>

          <tr>
            <td align="center" style="padding:0px 40px 40px 40px"><p style="color:#262626; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">Hello! <br> Peter</p>
                <b style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px ">
                Congratulations!!!</b><br/>
                Thank you for creating an account with "Ajegunle Youth Council Voting Platform", <br/>Now you can carry out your VOTING RIGHT successfully <br/>

                <strong style="color: red">Please follow the instruction to finish up!</strong>  </br>
                <br/>
                <br/>
                Use this Button below to get your voting code access from your organisation <strong > CodeLab </strong>!admin!!!

                <div>
                  <br/>
                  <br/>
                  <a
                    href="http://localhost:3000/api/user/90999jn/token"
                  referrerpolicy="no-referrer" target="_blank"
                  style="text-decoration: none;
                  padding: 20px 30px;
                  color: white;
                  margin-top: 50px;
                  background-color: #000269;
                  border-radius: 2px;
                  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                  "
                  >Request for your Code</a>
                </div>

                <br />
            </p></td>
          </tr>
        </table>
      </columns>
    </row>
</container>`,
};

app.get("/", (req, res) => {
  if (process.env.API_KEY !== "") {
    return res
      .status(200)
      .json({ message: "Ready to Start with complete Doc..." });
  } else {
    return res
      .status(200)
      .json({ message: "Ready to Start with Empty file..." });
  }
});

app.post("/message", (req, res) => {
  let result;
  sendgrid
    .send(msg)
    .then((response) => {
      result = response;
      console.log(result);
    })
    .catch((error) => {
      console.error("This is Error: ", error);
    });

  return res.status(200).json({ message: "Message has been sent..." });
});

app.post("/upload", imageData.single("image"), function (req, res, next) {
  let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req?.file.buffer).pipe(stream);
    });
  };

  const upload = async (req) => {
    const result = await streamUpload(req);
    res.json({ message: "uploaded", data: result?.secure_url });
  };

  upload(req);
});

app.listen(port, () => {
  console.log("");
  console.log("starting server!!!");
  console.log("");
});
