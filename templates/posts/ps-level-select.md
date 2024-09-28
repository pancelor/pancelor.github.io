<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">PuzzleScript Level Select</h1>
<h4 class="post-meta">2020-07</h4>

This isn't a game, it's just a small feature that I added to a custom fork of puzzlescript: a level select screen. Check out [one of](https://pancelor.itch.io/paint-everything-everywhere) my [games](https://pancelor.itch.io/elephant-in-a-bottle) to [see it](https://pancelor.itch.io/chickenswamp) in [action](https://pancelor.itch.io/guided-sock-meditation)!

### video

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/rg0t26K9egw?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### can I use this?

Sure! To use it in your own games, use the online editor <a href="https://pancelor.github.io/PuzzleScript/editor.html">here</a>, and check out the documentation <a href="https://pancelor.github.io/PuzzleScript/Documentation/levels.html">here</a>! (search for `enable_level_select`) If you want, send me a message about what you make; I'd love to see it!

If you're interested in the code, check it out <a href="https://github.com/pancelor/PuzzleScript/tree/level-select">here</a>.

### explanation

The <a href="https://www.puzzlescript.net/">PuzzleScript engine</a> is an existing tool that I did not write. I've made a few games in it, and I wanted to add a level select screen to my games. I've seen this done in various ways but never found them completely satisfying, so I edited the code for the puzzlescript engine itself and added level select capabilities.

I'm very happy with the result! I think it blends into the existing engine pretty seamlessly, from a player's perspective.

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
