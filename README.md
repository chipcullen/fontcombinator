# The Web Font Combinator

This is the source code for [http://font-combinator.com][1].

It is a fairly straigtfoward set of files.

- **index.php** - which holds the actual content of the tool. What server-side logic is used is also here.
- **javascript/fc_functions.js** - this is the real heart of the font-combinator. It *will* work to a point without JavaScript. But, as the use of the google fonts API is JavaScript dependent - it really should have JavaScript enabled. The script relies on jQuery (version 1.8.2)
- **javascript/fc_functions-ck.js** - this is the minified version of the above file
- **/less/** - the CSS was written in LESS, and compiled to the /css/ directory. I may consider converting to SASS in the future, as it is what I have used more recently
- **third party scripts** - like colorpicker.js and html5slider.js.

[1]:http://font-combinator.com