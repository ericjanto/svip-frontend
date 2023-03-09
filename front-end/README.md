## GCP setup

Start GCP instance and SSH in!

Manual Start which creates a detatched session that the window can be closed on:
```
cd search-engine
screen -d
Python3.9 pull.py 
```
__________________________
The pull.py file will pull from the git repo before rebuilding and launchng the front-end using:
```
npm install
pnpm run dev
```
__________________________

Close SSH window once script is running
---

Check storyhnter.live to check is up

If is up:

```
cd search-engine
screen -d
python3.9 pull_and_restart.py
```

Close Window - Happy days

If not running
```
cd search-engine
screen -d
python3.9 restart.py
python3.9 pull_and_restart.py
```

Apache2 is configured in /etc/apache2/sites-available/000-default.conf to proxy pass listens on *:80 to port *:3000.
_The same is for reverse proxy so be aware that reponses from the server are protected this way. Webmaster and the default filesystem are configured to be protected from apache also_

Local API Build is viewable on
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Mock API
A mock API is set up [here](https://63be76d1e348cb07620f5001.mockapi.io/api/mock/documents).
