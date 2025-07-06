#!/bin/bash

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Create a tar of the build
echo "Creating tarball of the build..."
tar -czf build.tar.gz .next public package.json package-lock.json next.config.ts

# Copy to the server
echo "Copying build to server..."
scp build.tar.gz root@47.79.6.81:/root/

# SSH into the server and deploy
echo "Deploying to server..."
ssh root@47.79.6.81 << 'EOF'
  # Create frontend directory if it doesn't exist
  mkdir -p /var/www/dash.wg-edu.com

  # Extract the build
  tar -xzf build.tar.gz -C /var/www/dash.wg-edu.com

  # Install dependencies
  cd /var/www/dash.wg-edu.com
  npm install --production

  # Set up Nginx if not already configured
  if [ ! -f /etc/nginx/sites-available/dash.wg-edu.com ]; then
    echo "Setting up Nginx configuration..."
    cat > /etc/nginx/sites-available/dash.wg-edu.com << 'NGINX'
server {
    listen 80;
    server_name dash.wg-edu.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX

    # Enable the site
    ln -sf /etc/nginx/sites-available/dash.wg-edu.com /etc/nginx/sites-enabled/
    
    # Test Nginx config
    nginx -t
    
    # Restart Nginx
    systemctl restart nginx
  fi

  # Set up PM2 to run Next.js
  if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
  fi

  # Start or restart the Next.js application
  cd /var/www/dash.wg-edu.com
  pm2 delete dash-frontend 2>/dev/null || true
  pm2 start npm --name "dash-frontend" -- start
  pm2 save
EOF

echo "Deployment completed!" 