FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    bash \
    ca-certificates \
    gnupg \
    lsb-release \
    unzip \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs

RUN curl -fsSL https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

RUN chmod +x /root/.bun/bin/bun

RUN ls -l /root/.bun/bin/bun

COPY . /app/

RUN bun install

EXPOSE 3000

CMD ["bun", "dev"]