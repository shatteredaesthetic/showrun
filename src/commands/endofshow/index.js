import { readFileSync, writeFile } from 'fs';
import makeFullLog from './log';
import sendEmail from './email';

export default function endofshow(path) {
  return function(file) {
    let text = readFileSync(file, 'utf8'),
        log = makeFullLog(text);
    writeFile(file, log);
    sendEmail(path, log);
  };
}
