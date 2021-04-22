<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#linecook"><div class="header-banner"></div></a>
</div>
<section class="main-content">
<h1 class="post-title">linecook / tangible code</h1>
<h4 class="post-meta">2021-03</h4>

### linecook

Linecook is a frantic arcade game about feeding birds from conveyor belts (very normal), made in about a week for [#ChainLetterJam](https://twitter.com/search?q=%23chainletterjam). Play it online [here](https://pancelor.itch.io/linecook)!

<a href="https://pancelor.itch.io/linecook">
<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/cover.mp4"></video>
  <figcaption>assembly line cooking chaos</figcaption>
</figure>
</a>

### inspiration

The idea for this game jam is super neat: you take 2 weeks to make a 1-minute game that is somehow inspired by the previous game in the chain, and then you nominate 2\~3 people to continue the chain. [Patrick](https://twitter.com/clockworkpat) nominated me, so I played his game [Arithmetic Bounce](https://patrickgh3.itch.io/arithmetic-bounce) to see what inspiration would strike:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/arithmetic-bounce.mp4"></video>
  <figcaption>add/subtract by bouncing off numbers; sum to the white number for points, but lose if you sum to red!</figcaption>
</figure>

It's a fun game! My highscore on hard mode is 24 :)

I found it interesting how the numbers scrolling by are neither good nor bad; their value changes entirely based on context. A four in one situation will give you a point of score, but in another situation, a four will kill you instantly, ending your run. I also really liked the time-pressure that the gravity caused, leading to forced decision-making and general chaos. These were the core pieces of Arithmetic Bounce that I wanted to play with in Linecook.

### context-dependent ingredients

I wasn't feeling inspired by the idea of making a game about arithmetic, so I started thinking of themes that would still have those two qualities I wanted to explore (context-dependent value, and time pressure/chaos). What if instead of combining numbers into sums, you combined ingredients into recipes? This seemed solid, so I began coding. The first thing I did was make foods that traveled back and forth on conveyor belts, mimicking the general structure of Arithmetic Bounce:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/wip1.mp4"></video>
  <figcaption>first prototype!</figcaption>
</figure>

I also added in the double-grabbers, because I thought it would lead to some good chaos (it did)

### tangible code: game processes as physical interactions

This idea of "tangible code" is the main reason I decided to write up this blog post at all. When I was iterating on the game design, making decisions and changing the mechanics, the guiding principle I stuck to was the idea that **the game world is a tangible, physical place**, not merely some Lua variables getting set to different values. Every time I stopped and let this idea guide my decision-making, the game got better, basically instantly. (!!!)

For example: I originally assumed that when an ingredient was grabbed, it would get added to some array of current recipe ingredients in the code, and then later when you pressed the "complete recipe" button on your controller, the recipe would check itself and give you some sort of score based on how well it matched the list of acceptable recipes. This would involve deleting the physical food object after it was grabbed, and moving it into some sort of HUD overlay, showing your currently-in-progress recipe.

On a bit of a whim, I decided to instead just... leave the food object on the floor, where the claw dropped it -- you can see this in the above gif. I think I just wanted a working prototype to show my partner, so I coded it in the simplest possible way: when grabbed, do nothing; I'll figure it out later.

_Immediately_ this led to cool surprises and interactions: once you grab a food, that column is forever blocked by the food you grabbed. Huh. That smells like interesting gameplay to me! Every time I followed my nose in this sort of direction, I discovered new interactions I hadn't explicitly intended, which encouraged me to keep designing around this idea of "tangible code".

The seed idea for all of this came vaguely from an aspect of some roguelikes, where your actions as a player are always available to be used. I really like how this works in Spelunky, for example, where you get powerups and upgrades that mostly all exist in-world, rather than being locked away inside menus. Instead of finding a weapon with an ammo count, you find a boomerang that physically flies away and needs to be picked back up. This leads to some amazing interactions, like the incredible [shopstorm](https://www.pentadact.com/2012-07-13-shopstorm-a-spelunky-story/):

> [...] My internal simulation of Spelunky's interacting systems kicks in, and I see the next few seconds flash before my eyes with pure horror.

In retrospect, my original idea of deleting the food object and putting it in a HUD overlay while you finish compiling your recipe seems much more prescriptive and confined than the physically-based interactions I ended up using in Linecook. With the HUD, **the player can only play the game my way**, and can only discover interactions that I specifically programmed. But, in this physical world/tangible code model, gameplay kept organically appearing, as if by spontaneous generation. I repeatedly discovered new surprising and fun interactions _in my own game!_ This happens to me sometimes, but it happened so _often_ while making Linecook, and I attribute that to this "tangible code" idea that I stumbled upon.

### how to finish a recipe?

Once I started thinking about trying to make the game in a physical space, I started to wonder: how should the player finish a recipe? Maybe... every 4 ingredients auto-cook themselves together? I had an idea for a special "done" food (it was shown visually as the word "done", instead of looking like a stick of butter or whatever) which, when grabbed, would complete the recipe.

But... how would it complete the recipe? ...magically? all the ingredients on the ground at the proper y-position onscreen would get deleted, and then you'd be scored by how well those ingredients work together? That didn't seem right. For a bit I entertained the idea that the "done" icon would continue moving after the claw dropped it, pushing foods offscreen, where they would be scored:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/done1.mp4"></video>
  <figcaption>pushing food offscreen to complete recipes</figcaption>
</figure>

This was cool -- now, if you accidentally grab a potato when trying to build an icecream recipe, you can try to grab the "done" icon in such a way that it avoids pushing the potato, leaving your ice cream deliciously potato-free. And, that potato will stick around for a while -- maybe the next few recipes won't need any potatoes, so it's just sitting there, clogging up one side of your preparation area! I really like that.

Also, you can edit the recipe while it's moving offscreen -- maybe you grabbed the "done" icon by accident, so now you're in a mad rush to try and piece together an acceptable recipe before it gets pushed off!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/done2.mp4"></video>
  <figcaption>removing sprinkles from a sandwich</figcaption>
</figure>

There's a bug you can see in this gif: the foods that get grabbed to the bottom continue moving as if they're being pushed by the "done" icon up top -- this is an example of how things can get weird if they have code variables telling them what to do, rather than physical interactions telling them what to do!

Another thing: I made extended claws block foods from moving, because they're physically solid. But this creates interesting gameplay, where you can use the claw as a wall to stop foods from moving, and grab more precisely with the other claw! Just be careful not to accidentally grab something you don't want while extending one claw to make a wall :)

### so uh, how does a "done" taste...?

I noticed all of these cool ideas and interactions with the physical "done" icon/food, and it was a much better idea than my first thought (pressing Z to complete a recipe), but it was just too _weird;_ if I'm trying to make my game world a believable physical place... then what on earth is this "done" icon doing next to a strawberry and a slice of bread? It was pretty weird. This is when I realized that I could still do the "foods move to one side to get scored" idea, by reusing the conveyor belts I'd already programmed!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/conveyors.mp4"></video>
  <figcaption>obvious in retrospect: more conveyors!</figcaption>
</figure>

Following my nose toward tangible interactions also elegantly fixed the bug in the previous gif: I made foods move based on what sort of conveyor belt they were on, instead of based on internal `dx`/`dy` variables and, tada! the bug disappeared.

This also made me realize that I could get rid of his HUD idea entirely and instead just curve the conveyor belts around on-screen so that the foods would be eaten/scored/etc still within the physical world, instead of being teleported offscreen into some sort of ethereal HUD-zone. This _again_ immediately made the game more fun, more chaotic, and more surprising -- you can steal foods from the other side of the screen, while they're being scored! This is funny when it happens on accident the first time, but it can be used as a strategy to remove bad foods that you accidentally grabbed.

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/rescue.mp4"></video>
  <figcaption>no chocolate sauce on my nachos, please!</figcaption>
</figure>

This was all possible before, but the long vertical section of the curved conveyor belts was new, and was the _perfect_ spot to try and rescue bad ingredients. But also, that straight section was right up against the edge of the world, making it a bit dangerous to try -- you might accidentally grab a new food that appears in the middle!

### interlude: finishing the game

There was a lot more work required to finish the game, but not much worth talking about in the context of tangible code. For completeness' sake, I'll summarize the major questions I had to settle before the game was done. I'm happy with the answers I came up with for the final version; here are some of the alternative answers I considered at various points in development:

#### Q: When/why are recipes completed?

* Press Z to finish both recipes at anytime
* Some sort of "done" icon (described above)
* Every 4 ingredients forms a recipe
* Each ingredient contributes a score towards the target recipe, and once the score is above some threshold the recipe is done

#### Q: When is the game over? / What's your score?

* Some sort of time limit
* The game continues forever, with infinite customers. You quit when you decide you're bored, I guess.
* At one point I had a version where there were only 8 customers who looped back to the end of the line after eating. To win, you had to feed them until all of their happiness levels were above a certain threshold. This was entirely non-obvious, and also pretty annoying when you only had one bird left to satisfy.

#### Q: How does changing the difficulty setting change the game?

* How many happiness points each good/bad ingredient is worth
* How happy a bird needed to be to be satisfied
* How leniently the game scored you on the game over screen

#### a note on playtesting:

Playtesting is really really good! I knew that in my head but apparently not in my gut; I was surprised at how incredibly useful it was to watch someone play for literally just the first 30 seconds. They immediately went into the cookbook help menu and wondered out loud how recipes would work. I realized that their imagined gameplay was both way better than the real gameplay, and also... it was what I had originally intended! I had just lost sight of it at some point.

You know how when someone is coming to visit soon, you suddenly realize how messy your house is? This is how playtesting felt -- suddenly, so many basic problems with the game were obvious, even before my testers ran into the issues themselves.

### wrapping up: adjacent reading

<figure>
  <img src="/assets/linecook/botw-shrine.jpg"/>
  <figcaption>a shrine from Breath of the Wild</figcaption>
</figure>

While writing this, I came across [this excellent excellent article](http://blog.runevision.com/2021/02/designing-for-sense-of-mystery-and.html) about designing around a sense of mystery and wonder. The author so clearly pinpoints multiple vague dissatisfactions I'd had towards the design of Breath of the Wild -- I'm still a bit blown away by how well they were able to articulate it! Their article feels related to mine in a way that's hard for me to verbalize, but here's my best attempt:

I think the core idea that resonated with me is the explanations of how the shrines in BotW are separate, predictable, self-contained worlds. This feels a lot like my original recipe HUD idea, where you can only experience the things that I've explicitly designed. But following the author's suggestions might lead to a more organic-feeling world where many parts can influence other parts in surprising ways.

### the end

Linecook is my favorite little game that I've made in a long while. I think a lot of that was due to me trying to make the code tangible. So many things just clicked and instantly turned into much better versions of themselves when I considered how they would interact if the game world was a real, physical place. I'm a programmer at heart: I think of game mechanics from a code perspective by default, so having this alternate paradigm was a very useful perspective shift that led me to make different and better decisions. (This is maybe how the BotW article ties into mine: the isolated shrines feel like they were designed code-first, rather than being designed around a tangible world, and it feels like they're missing something as a result)

Okay, that's it. Thanks for reading! Go play [linecook](https://pancelor.itch.io/linecook), and let me know if you manage to beat my high score :)

<figure>
  <img src="/assets/linecook/pb.png"/>
  <figcaption>my best run: 7-1-0 in 5:26.66 on hard mode</figcaption>
</figure>

And hey, since you've read this far, you might enjoy being on my [mailing list](/contact); that's probably the best way to be notified when I write more posts like this!

If you want to leave me a comment, drop it in [this dedicated twitter thread](https://twitter.com/pancelor) I guess? You could also [email me](mailto:hello@pancelor.com) if you like. (Sorry, I haven't figured out a good comments system for my site yet)

_secret note: there is no twitter thread yet; come back tomorrow after I tweet this out ;)_

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
