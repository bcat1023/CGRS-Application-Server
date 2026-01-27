module.exports = {
  apps : [{
    name   : "CGRS-Application-Server",
    script : "./index.js",
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    }
  }],

  deploy : {
    production : {
       "ref"  : "origin/v2.0.0",
       "repo" : "git@github.com:bcat1023/cgrs-application-server.git",
       "path" : "/home/gillen/CGRS",
       "post-deploy" : "npm install"
    }
  }
};