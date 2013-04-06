Music App :: README
===================

Description
---------------------

Insert description here.


Installation
---------------------

After checking out the code (and installing Node.js and npm) run the following command: `$ npm install -l`

This will install all of the dependencies for the application based on the package.json file.

Next, simply run: `$ node server.js`

And then open your web browser to [the localhost page](http://localhost:3000).

### Dependecies with npm
If the dependencies of the project change you can fix your local install by running `npm prune -l` and then reinstalling all of the dependencies or just the new ones.

### Debugging client
It is recommended for debugging JS in the browser that you use [Firebug](http://getfirebug.com/) (although the Chrome development console will work almost as well).


Directories
---------------------

The public/ directory is used for any static files (files served to the client as-is). The client can reference these files without including the "public" part of the URI (so /public/js/client.js can be referenced as just js/client.js on the client).

Check out [this StackOverflow answer](http://stackoverflow.com/a/5193206/370382) for more information on the directory structure of the application.


Style Guidelines
--------------------

### Comments
Classes and functions can/should be documented using the [JSDoc syntax](http://en.wikipedia.org/wiki/JSDoc). If you are using Sublime Text 2 then install the [DockBlockr plugin](https://tutsplus.com/lesson/docblockr/) to automatically generate these comments for you.