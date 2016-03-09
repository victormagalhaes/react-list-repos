# react-list-repos

Requirements:
* Node.js
* Http-server (https://www.npmjs.com/package/http-server)

### Installation

```sh
$ git clone https://github.com/victormagalhaes/react-list-repos
$ cd react-list-repos
$ npm install
```

### Moving files to `dist` folder and watching `app`

```sh
$ gulp serve
```

### Server from `dist`
```sh
$ cd dist
$ http-server -p [PORT_NUMBER]
```

or you could use Python's SimpleHTTPServer

```sh
$ cd dist
$ python -m SimpleHTTPServer [PORT_NUMBER]
```

Open your browser on http://localhost:[PORT_NUMBER] and enjoy =)
