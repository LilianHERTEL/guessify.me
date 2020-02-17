module.exports = {
  "apps": [{
      "name": "guessify.me",
      "instances": 1,
      "script": "index.js",
      "args": [],
      "watch": false,
      "node_args": "",
      "merge_logs": true,
      "log_date_format" : "YYYY-MM-DD HH:mm Z",
      "env": {
          "NODE_ENV": "production",
      } 
  }]
}
