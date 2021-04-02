<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#linecook"><img class="header-banner" src="/assets/banner.png"></a>
</div>
<section class="main-content">
<h1 class="post-title">linecook</h1>
<h4 class="post-meta">2021-03</h4>

A difficult arcade game about feeding birds from conveyor belts (very normal), made in about a week for [#ChainLetterJam](https://twitter.com/search?q=%23chainletterjam). Play it online [here](https://pancelor.itch.io/linecook).

This was a really fun game jam! The idea is that you take 2 weeks to make a 1-minute game that is somehow inspired by the previous game in the chain, and then you nominate 2\~3 people to continue the chain. [Patrick](https://twitter.com/clockworkpat) nominated me, so I went and played his game [Arithmetic Bounce](https://patrickgh3.itch.io/arithmetic-bounce) to see what inspiration would strike:

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/linecook/arithmetic-bounce.mp4" type="video/mp4">
  </video>
  <figcaption>add/subtract by bouncing off numbers; sum to the white number for points, but lose if you sum to red!</figcaption>
</figure>

<!-- TODO arithmetic-bounce gif -->
<!-- TODO updated video with tweening? -->
<!-- ffmpeg.exe -i linecook_2.gif -t 00:06 -crf 28 -an out.mp4 -->

<!-- OUTLINE -->
<!-- inspriation +bread icon -->
<!-- didnt know what to do with grabbed food -->
<!-- big win to keep it in world- can be regrabbed, can block grabber -->
<!-- done icon instead of a done button -->
<!-- done icon pushes stuff offscreen, keeping things in world? nice, but a bit awkward -->
  <!-- pusher could only push some items! cool! lets you decide where to snag it -->
<!-- items are dropped on a new conveyor when grabbed!! in world still (but items tp out when they leave screen) -->
<!-- okay store items onscreen and still reachable even -->
<!-- why tp food offscreen? curved conveyor instead -->
<!-- dont store food with a set dx; dont store recipe food in a recipe list. things are just stored in world, and move according to mget. and are scored according to...? -->
<!-- SO MANY rougelike-like surprises happening by following this principle^ -->
<!-- communicating ingredient value x/check (remove, use bird emotions?) -->
<!-- how to finish a recipe? done icon? score threshhold? fixed number of items? -->
<!-- how to finish a game? score threshhold? time limit? bird limit? need to satisfy all birds -->
<!-- adding difficulty -->
<!-- x balancing (difficulty affects mood threshholds / start _score?) -->
<!-- * remove difficulty? use score instead (num happy birds) -->

<!-- playtesting holy cow so helpful -->
  <!-- wtf is the number per recipe idea?? so strange -->
  <!-- hard to notice feedback, even the checks/x b/c too much is going on -->
  <!-- won easily!? and did well on hard too!?!! -->
<!-- birds dont get a random recipe; shuffle the recipes too and pair up -->
<!-- can i remove difficulty? -->

<!-- wanted to make it easier to accidentally shoot for long ramp; gave up -->
<!-- the clear one side strat causes ISSUES b/c the other claw can pick up your garbage!! so good -->

### gameplay video

<video preload="auto" controls loop muted src="/assets/linecook.mp4"></video>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
