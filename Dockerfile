# # build environment
FROM arm32v7/node:16.14.2 as build
WORKDIR /app
# #ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN ls
# RUN yarn config set network-timeout 600000 -g
# RUN yarn install --frozen-lockfile --no-cache --production
# RUN yarn run build:prod
# #RUN npm prune --production

# # production environment
# FROM arm32v7/nginx:stable
# COPY --from=build /app/dist /usr/share/nginx/html
# # new
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80 443
# CMD ["nginx", "-g", "daemon off;"]

FROM arm32v7/nginx:stable
COPY ./dist /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]