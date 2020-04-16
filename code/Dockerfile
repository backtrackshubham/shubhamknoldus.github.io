FROM node:latest as build

RUN npm install -g @angular/cli

WORKDIR dev-folio

COPY . .

RUN ls

RUN npm install

RUN ng build --prod

FROM nginx:alpine

EXPOSE 80

COPY --from=build /dev-folio/dist/dev-folio/* /usr/share/nginx/html/

RUN echo 'server { \
              listen       80; \
              server_name  localhost; \
              location / { \
               root   /usr/share/nginx/html; \
               index  index.html; \
               try_files $uri $uri/ /index.html?$args; \
              } \
          }' > etc/nginx/conf.d/default.conf
