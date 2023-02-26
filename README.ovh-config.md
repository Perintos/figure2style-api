#config port ssh :

##Config global : 

mise à jour et téléchargement des package linux:
```sudo apt-get update```
```sudo apt-get upgrade```

Installation git :
```sudo apt install git-all```

isntallation node.js :
```sudo apt install npm```

isntallation nvm : 
```sudo apt install curl```
```curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash ```
```nvm install 16.13.1```

Installation bdd : 
```sudo apt-get install mysql-server ```
```CREATE USER 'user'@'localhost' IDENTIFIED BY 'password';```
```CREATE DATABASE stylistic_device_db;```

##Configuration de apache2 TLS : 
Installer l'installateur de mod d'apache
```apt-get install libapache2-mod-php```
reload serveur apache: 
```sudo systemctl reload apache2```

Télécharger certbot : 
sudo apt install certbot

