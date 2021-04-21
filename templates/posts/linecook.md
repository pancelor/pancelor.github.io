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
<h1 class="post-title">linecook / tangible code</h1>
<h4 class="post-meta">2021-03</h4>

### linecook

Linecook is a difficult arcade game about feeding birds from conveyor belts (very normal), made in about a week for [#ChainLetterJam](https://twitter.com/search?q=%23chainletterjam). Play it online [here](https://pancelor.itch.io/linecook)!

<a href="https://pancelor.itch.io/linecook">
<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/cover.mp4"></video>
  <figcaption>assembly line cooking chaos</figcaption>
</figure>
</a>

### inspiration

This was a really fun game jam! The idea is that you take 2 weeks to make a 1-minute game that is somehow inspired by the previous game in the chain, and then you nominate 2\~3 people to continue the chain. [Patrick](https://twitter.com/clockworkpat) nominated me, so I went and played his game [Arithmetic Bounce](https://patrickgh3.itch.io/arithmetic-bounce) to see what inspiration would strike:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/arithmetic-bounce.mp4"></video>
  <figcaption>add/subtract by bouncing off numbers; sum to the white number for points, but lose if you sum to red!</figcaption>
</figure>

It's a fun game! My highscore on hard mode is 24 :)

I found it interesting how none of the numbers scrolling by are good or bad; their value to you as a player changes entirely based on context. I also really liked the time-pressure that the gravity caused, leading to forced decisions and general chaos. These were the core pieces of Arithmetic Bounce that I wanted to play with in Linecook.

### context-dependent ingredients

Instead of combining numbers into sums, in Linecook you combine food ingredients into recipes. This was the core idea I started building Linecook on. The first thing I did was make foods that travelled back and forth on conveyor belts, mimicking the general structure of Arithmetic Bounce:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/wip1.mp4"></video>
  <figcaption>first prototype!</figcaption>
</figure>

I also added in the double-grabbers, because I thought it would lead to some good chaos (it did)

### tangible code: game processes as physical interactions

This idea is the main reason I decided to write up this blog post at all. When I was iterating on the game design, making decisions and changing the mechanics, the guiding principle I stuck to was the idea that **the game world is a tangible, physical place**, not just a bunch of lua variables getting set to different values. Every time I stopped and let this idea guide my decision-making, the game got better, basically instantly. (!!!)

For example: I originally assumed that when an ingredient was grabbed, it would get added to some array of current recipe ingredients in the code, and then later when you pressed the "complete recipe" button on your controller, the recipe would check itself and give you score or something based on how well it matched the list of premade recipes. This would involve deleting the physical food object and moving it into some sort of HUD overlay, showing your currently-in-progress recipe. On a bit of a whim, I decided to instead just... leave the food object on the floor, where the claw dropped it. (you can see this in the above gif)

_Immediately_ this led to cool surprises and interactions; in this case, this meant that once you grab a food from a column, that column is forever blocked by the food you grabbed! That smells like interesting gameplay to me!

The idea for doing this came vaguely from an aspect of some roguelikes, where your actions as a player are "non-modal", i.e. available to be used at any point during the game. I really like how this works in e.g. Spelunky, and I kept noticing surprising interactions ingame every time I followed my nose in this sort of direction.

In retrospect, the idea of deleting the food object and putting it in a HUD overlay while you finished compiling your recipe seems much more restrictive than the physically-based interactions I ended up making the game with. With the HUD, you can only play the game my way, and can only discover interactions that I specifically programmed. But, in this physical world/tangible code model, I repeatedly discovered new surprising and fun interactions _in my own game_! This in itself isn't new for me, but it happened so often while making linecook, and I attribute that to this "tangible code" idea that I stumbled upon.

### how to finish a recipe?

Once I started thinking about trying to make the game in a physical space, I started to wonder: how should I complete a recipe? Maybe... every 4 ingredients auto-cook themselves into a recipe? I had an idea for a special "done" food (it was shown visually as the word "done", instead of looking like a stick of butter or whatever) which, when grabbed, would complete the recipe.

But... how would it complete the recipe? magically? all the ingredients on the ground at the proper y-position onscreen would get deleted, and then you'd be scored by how well those ingredients work together? That didn't seem right. For a bit I entertained the idea that the "done" icon would _continue moving_ after the claw dropped it, pushing foods offscreen, where they would be scored.

This was cool -- now, if you accidentally grab a potato in your icecream recipe, if you make sure to grab the "done" icon at the right position, it wouldn't push off the potato, leaving your ice cream deliciously potato-free. Also, now that potato stays around for a while! Maybe the next few recipes wouldn't need any potatoes, so it's just sitting there, clogging up one side of your preparation area! I really like that.

Also, you can edit the recipe while it's moving offscreen! Maybe you grabbed the "done" icon by accident, so now you're in a mad rush to try and piece together an acceptable recipe before it gets pushed off!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/done.mp4"></video>
  <figcaption>removing sprinkles from a sandwich</figcaption>
</figure>

There's a bug you can see in this gif: the foods that get grabbed to the bottom continue moving as if they're being pushed by the "done" icon up top -- this is an example of how things can get weird if they have code variables telling them what to do, rather than the physical world telling them what to do!

Another thing: I made extended claws block foods from moving, because they're physically solid. But this creates interesting gameplay, where you can use the claw as a wall to stop foods from moving, and grab more precisely with the other claw! Just be careful not to accidentally grab something you don't want while extending one claw to make a wall :)

### so uh, how does a "done" taste...?

There were all of these cool ideas and interactions I noticed with the physical "done" icon/food, but it was just too _weird_; if I'm trying to make my game world a believable physical place... then what on earth is this "done" icon doing next to a strawberry and a slice of bread? It was pretty weird. This is when I realized that I could still do the "foods move to one side to get scored" idea, by reusing the conveyor belts I'd already programmed!

Following my nose toward tangible interactions also nicely fixed the bug in the above gif: I made foods move based on what sort of conveyor belt they were on, instead of based on internal `dx`/`dy` variables and, tada! the bug is gone.

This also made me realize that I could get rid of his HUD idea entirely and instead just curve the conveyor belts around on-screen so that the foods would be eaten/scored/etc still within the physical world, instead of being teleported offscreen into some sort of ethereal HUD-zone. This _again_ immediately made the game more fun, more chaotic, and more surprising -- you can steal foods from the other side of the screen, as they're being scored! This is funny when it happens on accident the first time, but it can be used as a strategy to remove bad foods that you accidentally grabbed! This was all present in the previous gif, but the long vertical section of the curved conveyor belts was new, and was the _perfect_ spot to try and rescue bad ingredients. But also, that straight section is right up against the edge of the world, making it a bit dangerous to try -- you might accidentally grab a new food that spawns!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/rescue.mp4"></video>
  <figcaption>no chocolate sauce on my nachos, please!</figcaption>
</figure>

### finishing the game

There was a lot more work I put into tweaking the game from this point. The main point of this post is to talk about how making code tangible led to so many wins, but for completeness' sake, here's a summary of the major questions I had to settle to finish the game. I'm happy with the answers I came up with for the final game; here are some of the worse alternatives I considered at various points in development:

#### Q: When/why are recipes completed?

* Press Z to finish both recipes at anytime
* Some sort of "done" icon (described above)
* Every 4 ingredients forms a recipe
* Each ingredient contribute a score towards the target recipe, and once the score is above some threshhold the recipe is done? (sounds hard to communicate to the player...)

These ideas eventually morphed into the bird emotions that you can see in the final game, although it took a lot of refining to get to the final version -- the birds' emotions used to be a lot more complicated and inscrutable.

#### Q: When is the game over? / What's your score?

* Some sort of time limit?
* The game continues forever, with infinite customers. You quit when you decide you're bored, I guess.
* At one point I had a version where there were only 8 customers, but they looped back to the end of the line after eating, and you had to feed them until all of their happiness levels were above a certain threshhold. (This was entirely non-obvious to my playtesters, and also pretty annoying if you only had one bird left to satisfy!)

#### Q: How does changing the difficulty setting change the game?

(Lots of bad ideas here that finally became good when the I changed the game to it's current run-based structure.)

I considered removing difficulty altogether; I'd love it if I could somehow design the difficulty to be chooseable in-game rather than in-menu, like how in Spelunky you can choose to do the harder route in-game. In the end I like how it turned out, and I think I got the balance right -- I personally wasn't able to get anywhere near a perfect score on hard mode on release day, and although I've gotten much closer since then, my best is still 7-1-0. There are some strats that make the game easier, but they're not foolproof. And they're fun to figure out, as a player!

### A note on playtesting

Playtesting is really really good! I knew that in my head but apparently not my gut; I was surprised at how incredibly useful it was to watch someone play for literally just the first 30 seconds. They went into the help menu, wondered out loud how recipes would work, and I realized that their imagined gameplay was both way better than the real gameplay, and also it was what I had originally intended! I had just lost sight of the idea at some point.

It felt similar to how you suddenly realize how messy your house is when you know someone is coming over to visit -- suddenly so many basic problems with the game were obvious, even before my playtesters ran into the issues themselves.

### the end

Linecook is my favorite little game that I've made in a long while. I think a lot of that was due to me trying to make the code tangible. So many things just clicked and instantly turned into much better versions of themselves when I considered how they would interact if the game world was a real, physical place. Three cheers for tangible code!

Okay, that's it. Thanks for reading! Go play linecook! Let me know if you can beat my high score :)

<figure>
  <img src="/assets/linecook/pb.png"/>
  <figcaption>my best run: 7-1-0 in 5:26.66 on hard mode</figcaption>
</figure>

And hey, if you've read all the way this far, you might enjoy being on my [mailing list](/contact); signing up there is probably the best way to be notified when I write more posts like this!

If you want to leave me a comment, drop it in [this dedicated twitter thread](https://twitter.com/pancelor) I guess? You could also [email me](hello@pancelor.com) if you like. (Sorry, I haven't figured out a good comments system for my site yet!)

<!-- ### other ideas that didn't quite fit into this article but hey I'm mashing them in here at the end anyway -->

<!-- I came across [this excellent excellent article](http://blog.runevision.com/2021/02/designing-for-sense-of-mystery-and.html) while writing this post. The author so clearly pinpoints multiple different vague feelings I'd had about Breath of the Wild's design, and articulates it so well! I'm kinda blown away reading it all precisely identified like this. -->

<!-- It's hard to verbalize how this fits in to what I'm saying about keeping the game in a consistent physical space... the world geometry / multiple entrances to shrine stuff seems clearly related, but that's not the part that rang most true for me... I think the core thing that resonated with me is how the shrines are their own separate, predictable, self-contained worlds. This feels a lot like my original recipe HUD idea, where you can only experience the things that I've explicitly designed. But following the author's suggestions from that article might lead to a more organic, surprising world where many parts can influence other parts in surprising ways. -->

<!-- Or maybe: I'm a programmer at heart and default to making programmer-y decisions, which lead to the sort of issues described in that article. But now I have an alternative approach to concretely think about: how would I make the world a physical place? and that will lead to better results -->

<!-- tangible games -->
<!-- embodied games -->
<!-- incarnate games -->
<!-- manifested games -->
<!-- substance games -->
<!-- physical games -->
<!-- not-apparition data -->
<!-- not-illusory data -->
<!-- formless data -->
<!-- data delusions -->
<!-- smoke and mirrors -->
<!-- data with presence -->
<!-- realized data -->
<!-- eschew illusory variables, prefer realized data -->

<!-- no syntax errors!!! / playground -->
<!-- minecraft redstone -->
<!-- loom zachtronics game -->
<!-- music synth community -->
<!-- nikoli online solvers (puzz.link), vs tametsi drawing tools -->
<!-- factorio -->



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
