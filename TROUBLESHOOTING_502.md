# Troubleshooting 502 Bad Gateway Errors on Render

## What is a 502 Bad Gateway Error?

A 502 Bad Gateway error means Render's load balancer cannot connect to your service. This typically happens when:

1. **Your app crashed** (process exited)
2. **Wrong port configuration** (not using `process.env.PORT`)
3. **Startup timeout** (> 90 seconds to start)
4. **Service went idle** (free tier sleep)
5. **Database connection failures**

## Implemented Solutions

### 1. Enhanced Error Handling
- ✅ Added graceful shutdown handling
- ✅ Added uncaught exception handling
- ✅ Added unhandled promise rejection handling
- ✅ Improved database connection retry logic

### 2. Database Connection Improvements
- ✅ Increased connection pool size (max: 10, min: 2)
- ✅ Added connection validation
- ✅ Added connection timeouts
- ✅ Added retry logic with exponential backoff
- ✅ Added SSL configuration for production

### 3. Process Management
- ✅ Added PM2 for process management
- ✅ Added memory limits and auto-restart
- ✅ Added health check monitoring
- ✅ Added logging configuration

### 4. Health Checks
- ✅ Enhanced `/health` endpoint with database status
- ✅ Added monitoring script
- ✅ Added memory usage tracking

## How to Debug 502 Errors

### 1. Check Render Logs
```bash
# In Render dashboard, go to your service logs
# Look for:
# - Startup errors
# - Database connection failures
# - Memory issues
# - Process crashes
```

### 2. Test Health Endpoint
```bash
curl https://your-app.onrender.com/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### 3. Run Monitoring Script
```bash
cd server
npm run monitor
```

### 4. Check Database Connection
```bash
# Verify DATABASE_URL is set correctly in Render environment variables
# Test connection manually if needed
```

## Common Issues and Solutions

### Issue 1: Database Connection Timeout
**Symptoms:** Health check shows `"database": "disconnected"`

**Solutions:**
- Check `DATABASE_URL` environment variable
- Verify database is accessible from Render
- Check SSL configuration
- Increase connection timeouts

### Issue 2: Memory Exhaustion
**Symptoms:** Process crashes, high memory usage

**Solutions:**
- PM2 will auto-restart when memory exceeds 300MB
- Monitor memory usage with `npm run monitor`
- Consider upgrading Render plan for more memory

### Issue 3: Startup Timeout
**Symptoms:** Service never starts, 502 errors immediately

**Solutions:**
- Check build logs for errors
- Verify all dependencies are installed
- Check if database connection is blocking startup

### Issue 4: Free Tier Sleep
**Symptoms:** Works after deployment, fails after inactivity

**Solutions:**
- Upgrade to paid plan for always-on service
- Use external monitoring service to ping your app
- Consider using Render's cron jobs to keep service awake

## Environment Variables Checklist

Ensure these are set in Render:

```bash
NODE_ENV=production
PORT=3000
DATABASE_URL=your_postgres_connection_string
LOG_LEVEL=info
```

## Monitoring and Alerts

### 1. Health Check Monitoring
- Set up external monitoring to ping `/health` endpoint
- Alert on database disconnections
- Monitor response times

### 2. Log Monitoring
- Watch for error patterns in logs
- Monitor memory usage trends
- Track database connection failures

### 3. Performance Monitoring
- Monitor response times
- Track memory usage
- Watch for connection pool exhaustion

## Emergency Recovery

If your service is down:

1. **Check Render Dashboard** for immediate issues
2. **Review recent logs** for error patterns
3. **Test database connectivity** manually
4. **Restart the service** if needed
5. **Scale up resources** if memory/CPU constrained

## Prevention Best Practices

1. **Always use environment variables** for configuration
2. **Implement proper error handling** in all routes
3. **Add health checks** to monitor service status
4. **Use connection pooling** for database connections
5. **Monitor memory usage** and set appropriate limits
6. **Implement graceful shutdown** handling
7. **Add retry logic** for external dependencies
8. **Use process managers** like PM2 for reliability

## Contact Support

If issues persist:
1. Collect logs from Render dashboard
2. Run monitoring script and share output
3. Check Render status page for platform issues
4. Contact Render support with detailed error information
