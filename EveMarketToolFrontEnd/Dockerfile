FROM nginx
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY / /usr/share/nginx/html
RUN mkdir -p /etc/nginx/logs/
# Expose ports
EXPOSE 80
