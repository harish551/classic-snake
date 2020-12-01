FROM ubuntu:18.04
RUN apt-get update && apt-get install mongodb -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y
RUN service mongodb start
ENV NODE_ENV=production
ENV URL=http://135.181.64.116:8000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 8000
CMD ["sh", "run.sh"]

