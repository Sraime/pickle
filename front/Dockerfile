FROM node

WORKDIR /pickle_front

COPY start.sh /scripts/start.sh
RUN ["chmod", "+x", "/scripts/start.sh"]
RUN npm install -g @angular/cli

EXPOSE 4200
EXPOSE 4201

ENTRYPOINT ["/scripts/start.sh"]