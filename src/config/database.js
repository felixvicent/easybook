module.exports = {
    production: {
      username: 'yuaheishvegcsx',
      password: '2d3b77ba618a6ab68fbd917fea5a07ff2e639447e4474df1bfa1cd67b0acf6ae',
      database: 'd8jd0gse0u9rl8',
      host: 'ec2-50-17-21-170.compute-1.amazonaws.com',
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      }
    },
    development: {
      username: 'felps',
      password: 'password',
      database: 'easybook',
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      }
    },
    test: {
      username: 'felps',
      password: 'password',
      database: 'easybook_test',
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      }
    },
}