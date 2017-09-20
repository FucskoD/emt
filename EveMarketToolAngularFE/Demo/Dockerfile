FROM nginx
RUN rm -f /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY /dist/ /usr/share/nginx/html
COPY /node_modules /usr/share/nginx/html/node_modules
RUN mkdir -p /etc/nginx/logs/
# Expose ports
EXPOSE 8082
