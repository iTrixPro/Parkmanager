# Parkmanager
API which manage parking for clients (B2B)

# About 

* Login / Register
* Settings, if you are admin, to see all the users, if you are public role, to update your data or delete your account
* Create a parking spot (need to be admin)
* Assign / Unassign a parking spot to a user (need to be admin)
* Search for an available spot (for public role)
* Search which one is your spot (for public role)

# Operational 

* Authentication system 
* Settings
* Create a parking spot

# Linux - Configuration

* sudo apt install nodejs
* npm install package.json

# Windows - Configuration

* install nodeJS - stable version online
* use the command : npm install package.json

# Launching 
* command : node public/index.js

# Register
* To register yourself, you need to have a username which is not already used and a password which respect the conditions which are :
  * min. length : 8
  * contains : 1 lowwer case, 1 upper case, 1 special character
