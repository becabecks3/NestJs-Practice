FROM mcr.microsoft.com/azure-functions/node:4-node18-core-tools

# install some tools
RUN apt-get update && \
  apt-get install -y ca-certificates vim wget gnupg lsb-release curl openssl powershell jq --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt
ENV REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt
# install bender certificate
RUN curl "http://crl.bender.de/certenroll/BenderRootCA18_Bender%20Root%20CA%202018(1).crt"      | openssl x509 -inform der -out /usr/share/ca-certificates/bender-root.crt && \
    echo bender-root.crt >> /etc/ca-certificates.conf && \
    update-ca-certificates

# Terraform
RUN wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
RUN echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" > /etc/apt/sources.list.d/hashicorp.list
RUN apt-get update && apt-get install -y terraform && rm -rf /var/lib/apt/lists/*

## DOCKER
RUN install -m 0755 -d /etc/apt/keyrings && \
 curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
 chmod a+r /etc/apt/keyrings/docker.gpg
RUN echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null &&  apt-get update && apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# we need to have the same docker group id inside WSL and inside the devcontainer
RUN groupdel docker && groupadd -g 997 docker && usermod node -G docker

# bash completion
RUN curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o /etc/git-completion.bash
RUN echo source /etc/git-completion.bash >> /etc/bash.bashrc

# helper script to read simple env files that have no export command
RUN echo 'function readEnv() { while IFS="=" read A B; do export $A="$B"; done <"$1"; }' >> /etc/bash.bashrc
