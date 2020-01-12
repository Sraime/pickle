FROM node

WORKDIR /pokelink_back

COPY start.sh /scripts/start.sh
RUN ["chmod", "+x", "/scripts/start.sh"]

EXPOSE 3000

ENTRYPOINT ["/scripts/start.sh"]