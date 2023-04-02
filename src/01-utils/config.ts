class Config {}

class DevelopmentConfig extends Config {
  public isDevelopment = true;
  public connectionString = 'mongodb://mongo:ZXHpmA4ua9NwpOb977jn@containers-us-west-181.railway.app:8076/online-market';
}

class ProductionConfig extends Config {
  public isDevelopment = false;
  public connectionString =
    'mongodb+srv://bensha:098998530@cluster0.maa5pps.mongodb.net/online-market';
}


const config =
  process.env.NODE_ENV === 'production'
    ? new ProductionConfig()
    : new DevelopmentConfig();

export default config;
