<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#upgo"><img class="header-banner" src="/assets/banner.png"></a>
</div>
<section class="main-content">
<h1 class="post-title">Upgo</h1>
<h4 class="post-meta">2020-08</h4>

Made over 2 weeks for [lowrezjam 2020](https://itch.io/jam/lowrezjam-2020). An exercise in making a platformer with "good game feel" (coyote frames, automatic x-adjustment when hitting the edge of an overhang, queued jump inputs, etc)

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
