FROM node:20-slim

# Install Git and other dev tools
RUN apt-get update && apt-get install -y \
  git \
  curl \
  nano \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

CMD [ "npm", "run", "dev" ]