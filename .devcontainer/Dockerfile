FROM node:22-slim

# Install Git and other dev tools
RUN apt-get update && apt-get install -y \
  git \
  curl \
  nano \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# 🔒 Nuke cursed preload
ENV NODE_OPTIONS=""
RUN echo "unset NODE_OPTIONS" >> /home/node/.bashrc
RUN sed -i '/NODE_OPTIONS/d' /etc/environment || true

# 🚀 Define what to run when container starts
CMD [ "npm", "run", "dev" ]
