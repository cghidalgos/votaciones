# simple nginx-based container serving the prebuilt frontend with SPA rewrite
FROM nginx:alpine

# remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy the extracted distribution
COPY frontend-dist/share/nginx/html /usr/share/nginx/html

# expose port already mapped by compose
