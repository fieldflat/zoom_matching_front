import dotenv from 'dotenv'
dotenv.config(); // .envをprocess.envに割当て

const setConfig = {
    // 公開用
    production : {
      mail : {
        host: 'postfix',
        port: 25,
        auth: {
          user: 'user',
          pass: '12345678'
        }
      }
    },
    // ステージング用
    production : {
      mail : {
        host: 'postfix',
        port: 25,
        auth: {
          user: 'user',
          pass: '12345678'
        }
      }
    },
    // 開発用
    development : {
      mail : {
        host: 'mailhog',
        port: 1025,
      }
    }
}
export const config = setConfig[process.env.TARGET_ENV];
