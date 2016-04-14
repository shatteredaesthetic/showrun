'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _fs = require('fs');

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _helpers = require('../../utils/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let d = new Date();

function createEmailObj(opts, text) {
  let header = `Hey ${ opts.sm }, Here are the times and durations:\n\n`;
  return {
    to: opts.address,
    from: 'get.timestamp@gmail.com',
    subject: `${ (0, _helpers.dateStr)(d) } ${ opts.title } Times`,
    text: _ramda2.default.concat(header, text)
  };
}

function sendEmail(path, text) {
  let opts = JSON.parse((0, _fs.readFileSync)(`${ path }/config.json`), 'utf8'),
      mailObj = createEmailObj(opts.email, text),
      sender = opts.sender,
      transporter = _nodemailer2.default.createTransport({
    service: sender.service,
    auth: {
      user: sender.user,
      pass: sender.pwrd
    }
  });
  transporter.sendMail(mailObj, (err, info) => {
    if (err) console.log(err.message);
    console.log('Success!');
  });
}
//# sourceMappingURL=email.js.map