import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

var smtpTransport = nodemailer.createTransport(
  smtpPool({
    service: "Gmail",
    host: "localhost",
    port: "465",
    tls: {
      rejectUnauthorize: false,
    },

    //이메일 전송을 위해 필요한 인증정보

    //gmail 계정과 암호
    auth: {
      user: "4leaf.ysh@gmail.com",
      pass: "nvpdqofovkebects",
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

const sendEmail = async (req, res) => {
  const sendData = req.body.sendData;

  console.log(sendData);

  const mailOpt = {
    from: sendData.customerEmail,
    to: "4leaf.ysh@gmail.com",
    subject: "❗️알림 [4LEAF SOFTWARE]",
    html:
      "<hr> <h2>4LEAF 홈페이지에서 온라인 문의 사항 입니다. </h2> <hr>" +
      sendData.costomerDesc +
      `<hr> <br /><br /><br /><br /><br /><br /> CUSTOMER EMAIL : <strong>${sendData.customerEmail}</strong>`,
  };

  await smtpTransport.sendMail(mailOpt, function (err, info) {
    if (err) {
      console.error("Send Mail error : ", err);
    } else {
      console.log("Message sent : ", info);
    }
  });
};

const SC0401Controller = {
  sendEmail,
};

export default SC0401Controller;
