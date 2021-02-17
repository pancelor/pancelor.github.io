# pancelor dot com

This is the code for my website.

Basically, it's a static site hosted on github. It uses EJS templates to reduce HTML duplication, and uses javascript to do fancy user-end stuff like filtering projects.

## directory structure

`ejs` - source ejs files

`sass` - source sass files

`docs` - holds unique authored stuff like main.css, assets, etc, but ALSO holds generated html file, built by EJS. this is the folder github publishes -- if I was allowed to rename it, "public" might be a better choice

`build.js` - a builder script that renders all EJS templates into HTML.
