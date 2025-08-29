const http = require('http');
const { sequelize } = require('./database/config');

// Monitor server health
const monitorHealth = async () => {
  const healthCheck = () => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: process.env.PORT || 3000,
        path: '/health',
        method: 'GET',
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const health = JSON.parse(data);
            resolve(health);
          } catch (error) {
            reject(new Error('Invalid health check response'));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Health check timeout'));
      });

      req.end();
    });
  };

  try {
    // Check database connection
    await sequelize.authenticate();
    console.log('✅ Database connection: OK');

    // Check server health
    const health = await healthCheck();
    console.log('✅ Server health:', health.status);
    
    if (health.database === 'connected') {
      console.log('✅ Database health: OK');
    } else {
      console.log('❌ Database health: FAILED');
    }

    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
};

// Memory usage monitoring
const monitorMemory = () => {
  const used = process.memoryUsage();
  console.log('Memory usage:');
  console.log(`  RSS: ${Math.round(used.rss / 1024 / 1024)} MB`);
  console.log(`  Heap Total: ${Math.round(used.heapTotal / 1024 / 1024)} MB`);
  console.log(`  Heap Used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
  console.log(`  External: ${Math.round(used.external / 1024 / 1024)} MB`);
};

// Run monitoring
const runMonitoring = async () => {
  console.log('=== Server Health Monitor ===');
  console.log(`Time: ${new Date().toISOString()}`);
  
  monitorMemory();
  console.log('');
  
  const isHealthy = await monitorHealth();
  
  if (isHealthy) {
    console.log('🎉 All systems operational');
  } else {
    console.log('🚨 Issues detected');
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  runMonitoring();
}

module.exports = { monitorHealth, monitorMemory, runMonitoring };
