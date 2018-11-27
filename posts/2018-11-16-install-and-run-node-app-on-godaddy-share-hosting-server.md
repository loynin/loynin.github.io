---
Layout: post
title: “How to host Node Web Server Application on Godaddy Host Sharing”
Date: 2018-11-16
---
## Requirement

- Godaddy Delux Shared Hosting
- SSH Access to the account
- Ready to Host Node Web App

I have sample node web server app that you can download at github: 
<a href="https://github.com/loynin/node-web-server">Node Web Server App</a>	

## Process

So now let go straight of how to set up.	

#### 1. 	Go to Godaddy hosting cPanel and enable SSH for your hosting account. Therefore, you suppose to have now:

*  Public IP address of your hosting server
* Username of SSH
* Password of SSH - change it if you don't know
* SSH Port Number


#### 2. SSH to the Hosting Server: 

`ssh -p port username@IpAddress`
Then provide the password when asked


#### 3. Installing the NVM on your Server

Run this first
`wget -qO- https://cdn.rawgit.com/creationix/nvm/master/install.sh | bash`

then run this
`nvm install stable`

#### 4. Check if `node` and `npm` are installed:

Please exit from ssh and login again before change take effect.
`node -v`
`npm -v`

#### 5. Changing the `.htaccess` file:

`cd ~/public_html`
`nano .htaccess`

then copy the below code into the file:

```
DirectoryIndex disabled
RewriteEngine On
RewriteRule ^$ http://127.0.0.1:XXXXX/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:XXXXX/$1 [P,L]
```
Save file and then go back to terminal

#### 6. Clone sample Node App from <a href="https://github.com/loynin/node-web-server">Node Web Server App</a> by

`git clone https://github.com/loynin/node-web-server.git nodes`

wait until it finish.

#### 7. Install the dependencies:

`cd nodes`
`npm install`

wait until it finish

#### 8. Run the Node App

From `nodes` directory run
`node server.js`

#### 9. Keep Node Running forever after terminal is closed:

`node app.js &`
or install
`npm install -g forever`
then start the app by
`forever start server.js`
if you want to stop the app:
`forever stop server.js`

###### 10. Have fun for your new app
