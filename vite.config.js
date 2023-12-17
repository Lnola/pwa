import * as fs from 'fs';

export default {
  root: './client',
  server: {
    port: 3000,
    // TODO: configure https on production
    https: {
      key: fs.readFileSync('./certificates/my-key.pem'),
      cert: fs.readFileSync('./certificates/my-cert.pem'),
    },
  },
};
