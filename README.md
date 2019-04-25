## MountainChallenge

A full stack application built using react, redux, node, express and MongoDB that allows users to login via Google, setup challenges to climb a UK mountains either setup from an existing list (ie wainwrights, munroes) or customised to suit. Users can invite other people to the challenge and record activities (walks/runs) against the challenge showing which mountains from the list have been climbed.

## Running in Development mode

```
git clone https://github.com/chrishodgson/MountainChallenge.git && cd MountainChallenge
```

### Server keys

```
cp config/dev.js.dist config/dev.js
```

Replace REPLACE_ME with your values in `config/dev.js`:

- `googleClientID`: Google OAuth Client ID
- `googleClientSecret`: Google OAuth Client Secret
- `mongoURI`: MongoDB Database connection ie `mongodb://USER:PASSWORD@HOST:PORT/DATABASE`
- `cookieKey`: random string for a cookie key ie kjhkfdhskjfhd
- `sendGridKey`: SendGrid API Key

Tips:

- Signup for mLab for the mongoDB database as service https://mlab.com
- Signup for Sendgrid key https://app.sendgrid.com
- Signup for Google clientId and secret https://console.developers.google.com by enabling the Google+ Api in the google developers console

### Install dependencies and start the server

The following assumes that npm is installed.

```
npm install && npm install --prefix=client && npm run dev
```
