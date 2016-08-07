# Civil Service Technical Test

## Installation
To install this project, clone the repository from Github in the usual way, and then run the following two commands.

    npm install
    bower install
    
These commands will install jQuery, and the other dependencies for this application.

You will also need to install the Grunt command line utility globally.

    npm install grunt-cli -g
    
If you get an error when running the `bower install` command, please ensure that Bower is installed too.

    npm install bower -g

If you need to install Sass, this can be done through Ruby's `gem` command.

    sudo gem install sass
	
Note that on recent versions of Mac OS X (e.g. El Capitan), you may need to issue the command `sudo gem install sass -n /usr/local/bin` instead.

## Building
The application can be built with `grunt build`, once Grunt has been installed as described above.

## Running
To run the project, simply issue the `node app` command.

## Testing
The QUnit unit tests for this application can be run by going to [http://localhost:8586/test](http://localhost:8586/test) when the application is running.