# Verdaccio config

## Installation

Create a user.

```bash
sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

Setup a local version of node for stability.

```bash
# Create a user
sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio

# Become the user
sudo su -s /bin/bash verdaccio
cd

# Download node
wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz
tar xf node-v10.16.0-linux-x64.tar.xz
rm node-v10.16.0-linux-x64.tar.xz


# Add node to the path
export PATH=/var/lib/verdaccio/node-v10.16.0-linux-x64/bin:$PATH

# Install verdaccio
npm install -g verdaccio
```

Copy the following file to /lib/systemd/system/verdaccio.service

```bash
[Unit]
Description=Verdaccio lightweight npm proxy registry

[Service]
Type=simple
User=verdaccio
Group=verdaccio
User=verdaccio
WorkingDirectory=/var/lib/verdaccio
Environment=PATH=/var/lib/verdaccio/node-v10.16.0-linux-x64/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
ExecStart=/var/lib/verdaccio/node-v10.16.0-linux-x64/bin/verdaccio --config /etc/verdaccio/config.yaml

[Install]
WantedBy=multi-user.target
```

Copy the following file to /etc/verdaccio/config.yaml

```yaml
storage: /var/lib/verdaccio/storage
plugins: /var/lib/verdaccio/plugins

web:
  title: Verdaccio

auth:
  htpasswd:
    file: /var/lib/verdaccio/htpasswd

security:
  api:
    jwt:
      sign:
        expiresIn: 60d
        notBefore: 1
  web:
    sign:
      expiresIn: 7d
      notBefore: 1

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

server:
  keepAliveTimeout: 60

listen: 0.0.0.0:4873

middlewares:
  audit:
    enabled: true

logs:
  - {type: file, path: /var/log/verdaccio/verdaccio.log, level: info}
```

Make the log folder and give verdaccio access rights.

```bash
sudo mkdir /var/log/verdaccio
sudo chown verdaccio.verdaccio /var/log/verdaccio
```

Refresh systemd enable and start
```
sudo systemctl daemon-reload
sudo systemctl enable verdaccio
sudo systemctl start verdaccio
```

Test
```bash
npm install --registry http://localhost:4873 react
```
