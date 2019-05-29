# Verdaccio config

## Installation

### User

We will create a user to run the service.

```bash
# Create a user
sudo adduser --system --gecos 'Verdaccio NPM mirror' --group --home /var/lib/verdaccio verdaccio
```

### Installing node

We want to be in control of the version of nodejs that runs verdaccio, so
we set up a specific installation.

```bash
# Become the verdaccio user
sudo su -s /bin/bash verdaccio
cd /var/lib/verdaccio

# Download node, unpack it, then remove the tarball.
wget https://nodejs.org/dist/v10.16.0/node-v10.16.0-linux-x64.tar.xz
tar xf node-v10.16.0-linux-x64.tar.xz
rm node-v10.16.0-linux-x64.tar.xz

# Add node to the path
export PATH=/var/lib/verdaccio/node-v10.16.0-linux-x64/bin:$PATH

# Install verdaccio
npm install -g verdaccio
```

### Create the verdaccio config

Copy the following file to /etc/verdaccio/config.yaml

```yaml
storage: /var/lib/verdaccio/storage
plugins: /var/lib/verdaccio/plugins

url_prefix: /verdaccio

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
    cache: true

packages:
  '@jetblack-local/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated

  'local-*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated

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

As we've chosen to log to file, we need to make the folder and set the access rights.

```bash
sudo mkdir /var/log/verdaccio
sudo chown verdaccio.verdaccio /var/log/verdaccio
```

### Setup systemd

We will use systemd to ensure verdaccio is started when the machine is rebooted.

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

Refresh systemd enable and start

```
sudo systemctl daemon-reload
sudo systemctl enable verdaccio
sudo systemctl start verdaccio
```

Test
```bash
npm install --registry http://localhost:4873/verdaccio react
```

## nginx

To put verdaccio behind an nginx reverse proxy we can add the following `location`.

```bash
server {

  ...

	location /verdaccio {
		proxy_pass http://127.0.0.1:4873;
		proxy_redirect off;

		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $host;
		proxy_set_header X-NginX-Proxy true;
	}

  ...

}
```

## Developer Configuration

### http
Assuming the nginx server name is npm01 and the server is listening for http (port 80).

To set the default npm registry:

```bash
npm set registry http://npm01/verdaccio
npm config set git-tag-version=false
```

### https
If serving over https with a self signed ssl certificate.

```bash
npm config set strict-ssl=false
```

For yarn:

```bash
yarn config set strict-ssl false
```

### Publishing a package

```bash
# login
npm adduser

# publish the package, either run:
npm publish

# or more definitively
npm publish --registry http://npm01/verdaccio
```

### Unpublishing

```bash
npm unpublish package@1.0.0
```
