provider "aws" {
  region = "ap-northeast-1"  # 使用するAWSリージョンを指定
    access_key = "YOUR_ACCESS_KEY"
    secret_key = "YOUR_SECRET_KEY"
}

resource "aws_instance" "app" {
  ami           = "ami-0453ec754f44f9a4a"  # 適切なAMI IDを指定
  instance_type = "t2.micro"

  tags = {
    Name = "DjangoApp"
  }

  # User data to install Gunicorn and Nginx
  user_data = <<-EOF
              #!/bin/bash
              sudo apt update
              sudo apt install -y python3-pip nginx
              pip3 install gunicorn
              # Nginx configuration
              cat <<EOT > /etc/nginx/sites-available/django_app
              server {
                  listen 80;
                  server_name your_domain.com;  # ここを適切なドメインに変更

                  location = /favicon.ico { access_log off; log_not_found off; }
                  location /static/ {
                      root /path/to/your/static/files;  # 静的ファイルのパスを指定
                  }

                  location / {
                      proxy_pass http://127.0.0.1:8000;
                      proxy_set_header Host $host;
                      proxy_set_header X-Real-IP $remote_addr;
                      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                      proxy_set_header X-Forwarded-Proto $scheme;
                  }
              }
              EOT
              sudo ln -s /etc/nginx/sites-available/django_app /etc/nginx/sites-enabled/
              sudo systemctl restart nginx
              # Gunicorn service
              cat <<EOT > /etc/systemd/system/gunicorn.service
              [Unit]
              Description=gunicorn daemon
              After=network.target

              [Service]
              User=ubuntu  # 適切なユーザー名に変更
              Group=www-data
              WorkingDirectory=/path/to/your/django/app  # Djangoアプリのパスを指定
              ExecStart=/usr/local/bin/gunicorn --access-logfile - --workers 3 --bind unix:/path/to/your/django/app.sock config.wsgi:application

              [Install]
              WantedBy=multi-user.target
              EOT
              sudo systemctl start gunicorn
              sudo systemctl enable gunicorn
              EOF
}