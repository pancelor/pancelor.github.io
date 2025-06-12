<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">Crypt of the NecroDecorator</h1>
<h4 class="post-meta">2020-07</h4>

<iframe frameborder="0" src="https://itch.io/embed/709068?bg_color=8ecc74&amp;fg_color=291814&amp;link_color=e0964c&amp;border_color=f2cfb8" width="552" height="167"><a href="https://pancelor.itch.io/necrodecorator">NecroDecorator by pancelor, tallywinkle</a></iframe>

Crypt of the NecroDecorator -- my first pico-8 game! Play it online <a href="https://pancelor.itch.io/necrodecorator">here</a>. It's a 5\~30 minute game.

### gameplay video

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/O1a1a4KAaHk?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### explanation

A game about decorating an inn to make the denizens from <a href="https://braceyourselfgames.com/crypt-of-the-necrodancer/">Crypt of the NecroDancer</a> feel cozy when they visit. Made for a 7-day game jam with <a href="https://tallywinkle.itch.io/">@tallywinkle</a>; I did all the code and tally did all of the art and sound.

This was a really fun project that taught me a lot about scoping a game, and how difficult even the most basic 3D stuff can be. The game is hardly 3D, but I spent most of my time making the objects render in the correct order. Basically, trying to correctly order walls, wall decorations, wall torches, desks, and items on top of desks was a huge rabbit hole. This was mainly because some objects are stored in one grid cell, but visually look like they're offset by 0.5 or 1 grid cells.

It's got some replayability (try to figure out the monster preferences! the game has a pretty sophisticated 2D pattern-finding system), but you might be confused unless you're familiar with necrodancer already :)  honestly, you'll still be confused even if you understand necrodancer -- the game doesn't really bother explaining itself to the player!

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
