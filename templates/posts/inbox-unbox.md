<!DOCTYPE html>
<html>
<head>
<title>Inbox Unbox</title>
<%- include ("/_header.ejs") %>
<link href="/stylesheets/mailchimp.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#inbox-unbox"><img class="header-banner" src="/assets/banner.png"></a>
</div>
<section class="main-content">
<h1 class="post-title">Inbox Unbox</h1>
<h4 class="post-meta">2019-03 - 2021?</h4>

This is my upcoming puzzle game about pushing boxes into other boxes. It's 10\~30 hours long? (It's hard to estimate puzzle game times...)

Inspired by: [sokosoko](https://juner.itch.io/sokosoko)

### teaser trailer

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/UrzypCp8N3g?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Wishlist it on [Steam!](https://store.steampowered.com/app/1552300/Inbox_Unbox/)

<div class="mailing-list-card">

Inbox Unbox isn't publically playable yet, but if you want to follow along with development, you can [follow me on twitter](https://www.twitter.com/pancelor) or join my [mailing list](/contact):

<div><%- md("/_mail.ejs") %></div>
</div>

Also, if this game looks up your alley, go wishlist [Patrick's Parabox](https://store.steampowered.com/app/1260520/Patricks_Parabox/), an upcoming game with a similar premise! I've played the demo and it looks like it's going to be good!

Here's a slower-paced video, showing off a single puzzle. Can you solve it just from watching it?

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/inbox-unbox-jungle.mp4" type="video/mp4">
  </video>
  <figcaption>an early level</figcaption>
</figure>

### engine

For this game, I wrote a custom javascript engine. It runs in the browser, using the html `<canvas>` tag to display the game. I've learned a whole lot about game-making since starting this project, and I often get the urge to completely rewrite this in, say, C... but for now it's written in javascript :)

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
