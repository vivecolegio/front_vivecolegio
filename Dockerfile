# build environment
FROM arm32v7/node:16.14.2 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN yarn install
RUN yarn run build:prod
RUN npm prune --production

# production environment
FROM arm32v7/nginx:stable
COPY --from=build /app/dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]