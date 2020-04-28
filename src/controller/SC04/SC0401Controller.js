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

  let subjectList = "";

  if (sendData.isSoftware) {
    subjectList += "<i>소프트웨어 문의<i><br />";
  }

  if (sendData.isCooper) {
    subjectList += "<i>개발사 협력 문의<i><br />";
  }

  if (sendData.isRepair) {
    subjectList += "<i>유지보수 문의<i><br />";
  }

  if (sendData.isHowUse) {
    subjectList += "<i>제품/솔루션 사용 문의 문의<i><br />";
  }

  const mailOpt = {
    from: sendData.customerEmail,
    to: "4leaf.ysh@gmail.com",
    subject: "❗️알림 [4LEAF SOFTWARE]",
    html:
      "<hr> <h2>4LEAF 홈페이지에서 온라인 문의 사항 입니다. </h2> <hr>" +
      subjectList +
      "<hr> <br />" +
      sendData.costomerDesc +
      `<hr> <br /><br /><br /><br /><br /><br /> CUSTOMER EMAIL : <strong>${sendData.customerEmail}</strong>`,
  };

  await smtpTransport.sendMail(mailOpt, function (err, info) {
    if (err) {
      console.error("Send Mail error : ", err);
      smtpTransport.close();
    } else {
      console.log("Message sent : ", info);
      smtpTransport.close();
    }
  });
};

const sendEmailEstimate = async (req, res) => {
  const sendData = req.body.sendData;

  let subjectList = "";
  if (sendData.homepage) {
    subjectList += "<i>홈페이지 제작</i><br />";
  }
  if (sendData.groupWare) {
    subjectList += "<i>그룹웨어 | ERP 계열</i><br />";
  }
  if (sendData.mobile) {
    subjectList += "<i>모바일 어플리케이션 제작</i><br />";
  }
  if (sendData.outsourcing) {
    subjectList += "<i>외주 관련 문의</i><br />";
  }
  if (sendData.maintain) {
    subjectList += "<i>유지보수 관련 문의</i><br />";
  }

  const mailOpt = {
    from: sendData.customerEmail,
    to: "4leaf.ysh@gmail.com",
    subject: "🍀 견적문의 [4LEAF SOFTWARE]",
    html:
      `<hr> <h2>4LEAF 홈페이지에서 ${sendData.customerName}사의 <br /> 소프트웨어 견적 문의사항 입니다. </h2> <hr>` +
      subjectList +
      "<hr> <br />" +
      "<u>요청 금액 : " +
      sendData.tempraryAmount +
      "원</u>" +
      `<br /> <h2>문의사항</h2> <br /> ${sendData.questionDesc} <hr> <br />` +
      `<br /> <h2>추가 요구사항</h2> <br /> ${sendData.questionRequest} <hr> <br />` +
      `<br /><br /><br /><br /><br /><br /><hr>  CUSTOMER EMAIL : <strong>${sendData.customerEmail}</strong>`,
  };

  await smtpTransport.sendMail(mailOpt, function (err, info) {
    if (err) {
      console.error("Send Mail error : ", err);
      smtpTransport.close();
    } else {
      console.log("Message sent : ", info);
      smtpTransport.close();
    }
  });
};

const SC0401Controller = {
  sendEmail,
  sendEmailEstimate,
};

export default SC0401Controller;
