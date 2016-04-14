import { readFileSync } from 'fs';
import R from 'ramda';
import nodemailer from 'nodemailer';
import { dateStr } from '../../utils';

let d = new Date();

function createEmailObj(opts, text) {
  let header = `Hey ${opts.sm}, Here are the times and durations:\n\n`;
  return {
    to: opts.address,
    from: 'get.timestamp@gmail.com',
    subject: `${dateStr(d)} ${opts.title} Times`,
    text: R.concat(header, text)
  };
}

export default function sendEmail(path, text) {
  let opts = JSON.parse(readFileSync(`${path}/config.json`), 'utf8'),
      mailObj = createEmailObj(opts.email, text),
      sender = opts.sender,
      transporter = nodemailer.createTransport({
        service: sender.service,
        auth: {
          user: sender.user,
          pass: sender.pwrd
        }
      });
  transporter.sendMail(mailObj, (err, info) => {
    if(err) console.log(err.message);
    console.log('Success!');
  });
}
