module.exports = {
  apps: [{
    name: 'kabeuchi',
    script: 'server.js',
    cwd: '/home/ubuntu/kabeuchi-system',
    max_restarts: 5,
    min_uptime: '10s',
    restart_delay: 5000,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    },
    error_file: '/home/ubuntu/.pm2/logs/kabeuchi-error.log',
    out_file: '/home/ubuntu/.pm2/logs/kabeuchi-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
