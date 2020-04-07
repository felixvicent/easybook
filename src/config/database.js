module.exports = {
    development: {
      username: 'felps',
      password: 'password',
      database: 'easybook',
      host: 'localhost',
      dialect: 'mysql',
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
      define: {
        timestamps: true,
        underscored: true,
      }
    },
}