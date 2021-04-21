# build environment
FROM node:14.16.1-alpine as builder
#RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . /usr/src/app
RUN npm install
RUN node_modules/.bin/ng build --prod

# production environment
FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/dystraite /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]