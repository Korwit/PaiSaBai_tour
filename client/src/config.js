const isProd = process.env.NODE_ENV === 'production'

const config = {
  isProd,
  serverUrlPrefix: isProd ? 'https://wd04.cloud-workshop.online/api' : 'http://localhost:1337/api',
  serverAdminUrlPrefix: isProd ? 'https://wd04-admin.cloud-workshop.online' : 'http://localhost:1337'
}

export default config;