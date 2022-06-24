# Carleton-ITS frontend

## deployment 

 * `git clone https://github.com/AbdulMutakabbir/dna-ui.git`
 * `cd dna-ui/`
 * `rm package-lock.json`
 * `sudo apt-get update`
 * `sudo apt install nodejs`
 * `sudo apt-get upgrade nodejs`
 * `sudo apt install npm`
 * `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
 * `source ~/.bashrc`
 * `nvm install v14.15.0`
 * `sudo npm install -g npm@6.14.8`
 * `npm install`
 * `npm run build`
 * `npm install -g serve`
 * `nohup serve -s build &`
