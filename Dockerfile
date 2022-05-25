# build environment
FROM node:16.14.2 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install
RUN yarn run prebuild
RUN yarn run build:prod
RUN npm prune --production

# production environment
FROM nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
#COPY nginx/ssl/* /etc/ssl/certs/
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]