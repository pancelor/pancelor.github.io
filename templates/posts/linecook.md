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

A difficult arcade game about feeding birds from conveyor belts (very normal), made in about a week for [#ChainLetterJam](https://twitter.com/search?q=%23chainletterjam). Play it online [here](https://pancelor.itch.io/linecook)!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/cover.mp4"></video>
  <figcaption>assembly line cooking chaos</figcaption>
</figure>

### inspiration

This was a really fun game jam! The idea is that you take 2 weeks to make a 1-minute game that is somehow inspired by the previous game in the chain, and then you nominate 2\~3 people to continue the chain. [Patrick](https://twitter.com/clockworkpat) nominated me, so I went and played his game [Arithmetic Bounce](https://patrickgh3.itch.io/arithmetic-bounce) to see what inspiration would strike:

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/linecook/arithmetic-bounce.mp4" type="video/mp4">
  </video>
  <figcaption>add/subtract by bouncing off numbers; sum to the white number for points, but lose if you sum to red!</figcaption>
</figure>

It's a fun game! My highscore on hard mode is 24 :)

I found it interesting how none of the numbers scrolling by are good or bad; their value to you as a player changes entirely based on context. I also really liked the time-pressure that the gravity caused, leading to forced decisions and general chaos. These were the core pieces of Arithmetic Bounce that I wanted to play with in Linecook.

### context-dependent ingredients

Instead of combining numbers into sums, in Linecook you combine food ingredients into recipes. This was the core idea I started building Linecook on. The first thing I did was make foods that travelled back and forth on conveyor belts, mimicking the general structure of Arithmetic Bounce:

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/linecook/wip1.mp4" type="video/mp4">
  </video>
  <figcaption>first prototype!</figcaption>
</figure>

I also added in the double-grabbers, because I thought it would lead to some good chaos (it did)

### the game world as a physical place

<!-- very rough -->

This idea is the main reason I decided to write up this blog post at all. When I was iterating on the game design, making decisions and adding new mechanics, a guiding principle I stuck to was the idea that the game world is a tangible, physical place, not a simultion of lua variables getting set to different states. Every time I stopped to think about this and make a decision based on it, the game got better, which was really cool to see.

You can see the first time I did this in the above gif: I originally assumed that when an ingredient was grabbed, it would get added to some non-physical bucket of current recipe ingredients, and then later when you pressed the "complete recipe" button on your controller, the recipe would check itself and give you score or something based on how well it matched the list of allowed recipes. This would involve deleting the physical food object and moving it into some sort of HUD overlay, showing you your current recipe. On a bit of a whim, I decided to instead just... leave the food object on the floor, where the claw dropped it. (you can see this in the gif)

_Immediately_ this led to cool surprises and interactions; in this case, this means that once you grab a food from a column, that column is forever blocked by the food you grabbed! This smells like interesting gameplay! So I kept this idea of foods as physical objects, and used it as my guiding principle moving forwards.

The idea for doing this came vaguely from an idea from roguelikes, that your actions as a player should be non-modal, i.e. available to be used at any point during the game. I really like how this works in e.g. spelunky, and I kept noticing surprising interactions ingame every time I followed my nose in this sort of direction.

In retrospect, the idea of deleting the food object and putting it in a HUD overlay while you finished compiling your recipe seems much more prescriptive and restrictive than the physical-based world I ended up going with. With the HUD, you can only play the game my way, and can only discover interactions that I specifically programmed. But, in the physical world model, I repeated discovered new surprising and fun interactions in my own game! I'll give examples as I go along.

### idk how this fits in but I feel like it does

okay while writing this post I came across [this excellent excellent article](http://blog.runevision.com/2021/02/designing-for-sense-of-mystery-and.html) that is blowing my mind a little. the author so clearly pinpoints multiple different vague feelings I'd had about Breath of the Wild's design, and articulates it so well!

I can't quite verbalize how this fits in to what I'm saying about keeping the game in a consistent physical space... the world geometry / multiple entrances seems clearly related, but that's not the part that rang most true for me. I think it's the point they made multiple times about how the shrines are their own separate, predictable, designed world. This feels a lot like my recipe HUD idea -- you will only experience the things I've explicitly designed. But following the author's suggestions might lead to a more organic, surprising world where many parts can influence other parts in surprising ways.

### how to finish a recipe?

Once I started thinking about trying to make the game in a physical space, I started to wonder: how should I complete a recipe? Maybe... every 4 ingredients automatically forms into a recipe? I had an idea for a special "done" food (it was shown visually as the word "done", instead of looking like a stick of butter or whatever) which, when grabbed, would complete the recipe.

But... how would it complete the recipe? magically? all the ingredients on the ground at the proper y-position would get deleted and then you'd be scored? That didn't seem right. For a bit I entertained the idea that the "done" icon would _continue moving_ after the claw dropped it, pushing foods off the screen where they would be scored. This was cool! Because now you can make half a recipe on one side of the screen, and if you accidentally grab a potato in your icecream recipe, you can start over on the other half of the screen, salvaging whichever ingredients happened to be over there. You simply would grab the "done" icon to avoid the potato. Also, now that potato stays around for a while! Maybe no recipes for a while would need a potato so it's just sitting there, clogging up one side of your preparation area!

There were some cool ideas I noticed with the physical done icon/food, but it was just too _weird_; if I'm trying to make my game world a believable physical place... then what on earth is this "done" icon doing next to a strawberry and a slice of bread? It was pretty weird. This is when I realized that I could still do the "foods move to one side to get scored" idea, by reusing the conveyor belts I'd already programmed!
You can see a mishmash of these ideas here: there's a done icon, a conveyor belt as the destination, and also a bit of a HUD-based recipe holding area; the avocado in the top right was teleported there after the conveyor belt pushed it offscreen:

![a "done" item in-game](/assets/linecook/wip2.png)


This actually ended up making the code much nicer too-- the foods used to have a `dx`/`dy` stored in them, telling them how to move every time the conveyor belt ticked. This was a bit awkward, since the claws had to disable this when the food was grabbed, and then re-set it when the food was released into the destination conveyor belt. I changed that code to instead have foods check the tile they're on every conveyor tick and move based on the direction it told them to go, which could be movement in a specific direction if it was a conveyor belt, or no movement at all for the pink countertop.

### no more HUD

the big big breakthrough for this game came when I decided to curve the destination conveyor belts, keeping the grabbed food on-screen and in-world, instead of teleporting it off into some ethereal HUD-zone. again, this immediately made the game more fun, more chaotic, and more surprising - suddenly you can steal foods from the other side of the screen! this is quite funny to happen on accident the first time, but it can be used as a strategy to remove bad foods that you accidentally grabbed! also, the long vertical section of the turned conveyor belts is the _perfect_ spot to try and rescue bad ingredients, but it also is pushed right up against the edge of the world, making it a bit dangerous to go for it (you might accidentally grab a new food that spawns!)

<!-- TODO updated video with tweening? -->
<!-- ffmpeg.exe -i linecook_2.gif -t 00:06 -crf 28 -an out.mp4 -->



<!-- OUTLINE -->
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
<!-- bread icon :) -->

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
