module.exports = {
  apps: [{
    name: 'sow-server',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    // Error handling
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    
    // Restart settings
    restart_delay: 3000,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Memory and CPU monitoring
    node_args: '--max-old-space-size=300',
    
    // Health check
    health_check_grace_period: 3000,
    health_check_fatal_exceptions: true
  }]
};
