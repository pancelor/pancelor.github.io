<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">Upgo</h1>
<h4 class="post-meta">2020-08</h4>

<iframe frameborder="0" src="https://itch.io/embed/726970?bg_color=8ecc74&amp;fg_color=291814&amp;link_color=e0964c&amp;border_color=f2cfb8" width="552" height="167"><a href="https://pancelor.itch.io/upgo">upgo by pancelor</a></iframe>

Made over 2 weeks for [LOWREZJAM 2020](https://itch.io/jam/lowrezjam-2020). An exercise in making a platformer with "good game feel" (coyote frames, automatic x-adjustment when hitting the edge of an overhang, queued jump inputs, etc)

Play it online [here](https://pancelor.itch.io/upgo).

### gameplay video

<video preload="auto" controls loop muted src="/assets/upgo.mp4"></video>

### explanation

This was my first time doing procgen, I think? That was a fun learning experience. I basically re-implemented Spelunky's level generation by following this excellent [explanation](http://tinysubversions.com/spelunkyGen/). Also, I feel like a switch has flipped in my brain about coordinate systems -- there is no "correct" way to do coordinates; you just interpret some numbers however you want.

I wish I had spent more time making this into a "real game" -- there's some good platformer feel and some decent level generation, but the game overall isn't very gripping. I would have liked to have added some powerups or items or something.

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
