FROM node:22-slim

RUN echo 'export PATH="/app/node_modules/.bin:$PATH"' > /etc/profile.d/local_bin.sh

# Install Git and other dev tools
RUN apt-get update && apt-get install -y \
  git \
  curl \
  nano \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# 🚀 Define what to run when container starts
CMD [ "npm", "run", "dev" ]
