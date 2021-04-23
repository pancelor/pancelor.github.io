<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
<%- include ("/_meta.ejs") %>
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

I found it interesting how the numbers scrolling by are neither good nor bad; their value changes entirely based on context. In some situations, hitting a 4 will increase your score, but in other situations, it will kill you instantly. I also really liked the time-pressure that the gravity caused, leading to forced decision-making and general chaos. These were the core pieces of Arithmetic Bounce that I wanted to play with in Linecook.

### context-dependent ingredients

I wasn't feeling inspired by the idea of making a game about arithmetic, so I started thinking of themes that would still have those two qualities I wanted to explore (context-dependent value, and time pressure/chaos). What if instead of combining numbers into sums, you combined ingredients into recipes? This seemed solid, so I began coding. The first thing I did was make foods that traveled back and forth on conveyor belts, mimicking the general structure of Arithmetic Bounce:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/wip1.mp4"></video>
  <figcaption>first prototype!</figcaption>
</figure>

I also added in the double-grabbers, because I thought it would lead to some good chaos (it did)

### tangible code: game processes as physical interactions

I originally assumed that when an ingredient was grabbed, it would get added to some array of current recipe ingredients in the code, and then later when you pressed the "complete recipe" button on your controller, the recipe would check itself and give you some sort of score based on how well it matched the list of acceptable recipes. This would involve deleting the physical food object after it was grabbed, and moving it into some sort of HUD overlay, showing your currently-in-progress recipe.

On a bit of a whim, I decided to instead just... leave the food object on the floor, where the claw dropped it. I think I just wanted a working prototype to show my partner, so I coded it in the simplest possible way: when grabbed, do nothing; I'll figure it out later.

_Immediately_ this led to cool surprises and interactions: once you grab a food, that column is forever blocked by the food you grabbed. That smells like interesting gameplay to me! Wait actually, it's not quite forever: the opposite claw can steal that food, since it hasn't physically left the play area yet. Huh.

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/tangible.mp4"></video>
  <figcaption>"do nothing": more interesting than expected!</figcaption>
</figure>

It was pretty exciting to have cool gameplay show up out of nowhere, so I tried to examine what had just happened, to see if I could learn anything from it. Essentially, I had wanted to create a process in the game that kept track of your currently-in-progress recipe until the full recipe was completed, and I had accidentally made a crucial choice. One option was to rigidly define this process as Lua code that moves the ingredient into some sort of HUD, while the other option was to let the physical simulation of the world be a part of the process.

If I had made a mistake or not thought something through fully while coding things in Lua, pico-8 would crash and cry bloody murder over my audacity for passing it a nil value or whatever. However, because I chose the physical simulation option, the things I didn't anticipate didn't crash anything -- they instead led to surprising and interesting gameplay! I had moved my "code" out of one picky engine (pico-8 + Lua) and into a _much_ more lenient engine: the physical space of my game's world. In a sense, I had made my code **tangible**.

This reminded me of the "non-modal" aspect of some roguelikes, meaning that all of your possible actions as a player are always available to you. I like how this works in Spelunky, where your powerups and upgrades mostly all exist in-world, rather than lying dormant in some inventory menu until you use them. For example, instead of finding a weapon with an ammo count, you find a boomerang that physically flies away and needs to be picked back up. This mostly serves the same purpose, but this kind of design leads to some amazing interactions, like the incredible [shopstorm](https://www.pentadact.com/2012-07-13-shopstorm-a-spelunky-story/):

> [...] My internal simulation of Spelunky's interacting systems kicks in, and I see the next few seconds flash before my eyes with pure horror.

In retrospect, my original idea (deleting the food object and putting it in a HUD overlay while you finish compiling your recipe) seems much more prescriptive and confined than the physically-based interactions I ended up using in Linecook. With the HUD system, the player can only play the game my way, and can only discover interactions that I specifically programmed. But, in this physical world/tangible code model, gameplay kept organically appearing, as if by spontaneous generation. I repeatedly discovered new surprising and fun interactions _in my own game!_ This happens to me sometimes, but it happened so _often_ while making Linecook, and I attribute that to this "tangible code" idea that I stumbled upon.

As I iterated on the game's design, my guiding principle was this idea that **the game world is a tangible, physical place**, not merely some Lua variables getting set to different values. Every time I stopped and let this idea guide my decision-making, the game got better, basically instantly. (!!!)

### how to finish a recipe?

My translation of numbers and sums into foods and recipes was coming along nicely, but I still hadn't decided how or why recipes would be finished. I had an idea for a special "done" food (it was shown visually as the word "done", instead of looking like a stick of butter or whatever) which, when grabbed, would complete the recipe.

But... how would it complete the recipe? Maybe, all the ingredients on the ground at the proper y-position onscreen would get instantly deleted, and then you'd be scored by how well those ingredients worked together in a dish? That didn't seem right. I thought back to my principle of making the code tangible, and it occurred to me that the "done" icon could just continue moving after the claw dropped it, gradually pushing foods offscreen to be scored:

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/done1.mp4"></video>
  <figcaption>pushing food offscreen to complete recipes</figcaption>
</figure>

Again, this was immediately way more interesting than my first idea! With these gradually moving "done" icons, if you accidentally grab a potato when trying to build an icecream recipe, you can try to grab the "done" icon in such a way that it avoids pushing the potato, leaving your ice cream deliciously potato-free. And, that potato will stick around for a while -- maybe the next few recipes won't need any potatoes, so it's just sitting there, clogging up one side of your preparation area! I really like that.

Also, you can edit the recipe while it's moving offscreen -- maybe you grabbed the "done" icon by accident, so now you're in a mad rush to try and piece together an acceptable recipe before it gets pushed off!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/done2.mp4"></video>
  <figcaption>removing sprinkles from a sandwich</figcaption>
</figure>

(There's a bug you can see in this gif: the foods that get grabbed to the bottom continue moving as if they're being pushed by the "done" icon up top -- this is an example of how things can get weird if they have code variables telling them what to do, rather than physical interactions telling them what to do)

Another decision that I made while following this "tangible code" principle: I made extended claws block foods from moving, because they're physically solid. But this creates interesting gameplay, where you can use the claw as a wall to stop foods from moving, and grab more precisely with the other claw! Just be careful not to accidentally grab something you don't want while extending one claw to make a wall :)

### so uh, how does a "done" taste...?

I noticed all of these cool ideas and interactions with the physical "done" icon/food, and it was a much better idea than my first thought (pressing Z to complete a recipe), but it was just too _weird;_ if I'm trying to make my game world a believable physical place... then what on earth is this "done" icon doing next to a strawberry and a slice of bread? It was pretty out of place. Then it hit me: I could still use the "foods move to the side to get scored" idea, by re-using the conveyor belts I'd already made!

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/conveyors.mp4"></video>
  <figcaption>obvious in retrospect: more conveyors!</figcaption>
</figure>

Following my nose toward tangible interactions also elegantly fixed the bug in the previous gif: I made foods move based on which conveyor belt they were physically above, instead of based on internal variables that I had to remember to set and unset at the right times, and tada! the bug disappeared.

This also made me finally realize that I could ditch this HUD idea entirely, curving the conveyor belts on-screen and scoring the foods within the physical world. This _again_ immediately made the game more fun, more chaotic, and more surprising -- the foods stay onscreen longer, so it's suddenly a lot more likely to accidentally steal foods from the other side of the screen. This is funny when it happens on accident the first time, but it's also a useful strategy. (like in the "removing sprinkles from a sandwich" gif, above)

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/linecook/rescue.mp4"></video>
  <figcaption>no chocolate sauce on my nachos, please!</figcaption>
</figure>

This was all possible before, but the long vertical section of the curved conveyor belts was new, and was the _perfect_ spot to rescue bad ingredients. But also, that straight section was right up against the edge of the world, making it a bit dangerous to try -- you might accidentally grab a new food that appears in the middle!

(In the end, I did end up with a kind of magical, intangible HUD-zone that held the currently-in-progress ingredients, but keeping the foods onscreen as long as possible before they end up there was a big win.)

### interlude: finishing the game

There was a lot more work required to finish the game, but not much worth talking about in the context of tangible code. For completeness' sake, I'll summarize the major questions I had to settle before the game was done. I'm happy with the answers I came up with for the final version; here are some of the alternative answers I considered at various points in development:

#### Q: When/why are recipes completed?

* Press Z to finish both recipes at anytime
* Some sort of special "done" icon
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

Playtesting is so useful! I knew that in my head but apparently not in my gut; I was surprised at how incredibly valuable it was to watch someone play for literally just the first 30 seconds. They immediately went into the cookbook help menu and wondered out loud how recipes would work. I realized that their imagined gameplay was both way better than the real gameplay, and also... it was what I had originally intended! I had just lost sight of it at some point.

You know how when someone is coming to visit soon, you suddenly realize how messy your house is? This is how playtesting felt -- suddenly, so many basic problems with the game were obvious, even before my testers ran into the issues themselves.

### wrapping up: adjacent reading

<figure>
  <img src="/assets/linecook/botw-shrine.jpg"/>
  <figcaption>a shrine from Breath of the Wild</figcaption>
</figure>

While writing this, I came across [this excellent excellent article](http://blog.runevision.com/2021/02/designing-for-sense-of-mystery-and.html) about designing around a sense of mystery and wonder. The author so clearly pinpoints multiple vague dissatisfactions I'd had towards the design of Breath of the Wild -- I'm still a bit blown away by how well they were able to articulate it! Their article feels related to mine in a way that's hard for me to verbalize, but here's my best attempt:

I think the core idea that resonated with me is the explanations of how the shrines in BotW are separate, predictable, self-contained worlds. This feels a lot like my original recipe HUD idea, where you can only experience the things that I've explicitly designed. But following the author's suggestions might lead to a more organic-feeling world where many parts can influence other parts in surprising ways.

### the end

Linecook is my favorite little game that I've made in a long while, and I credit a lot of that to this "tangible code" principle I tried to follow. So many things just clicked and instantly turned into much better versions of themselves when I considered how they would interact if the game world was a real, physical place. I'm a programmer at heart: I think of game mechanics from a code perspective by default, so having this alternate paradigm was a very useful perspective shift that led me to make different and better decisions. (This is maybe how the BotW article ties into mine: the isolated shrines feel like they were designed code-first, rather than being designed as part of a tangible physical world, and it feels like they're missing something as a result)

Okay, that's it. Thanks for reading! Go play [linecook](https://pancelor.itch.io/linecook), and let me know if you manage to beat my high score :)

<figure>
  <img src="/assets/linecook/pb.png"/>
  <figcaption>my best run: 7-1-0 in 5:26.66 on hard mode</figcaption>
</figure>

And hey, since you've read this far, you might enjoy being on my [mailing list](/contact); that's probably the best way to be notified when I write more posts like this!

---

_If you want to leave me a comment, drop it in [this dedicated twitter thread](https://twitter.com/pancelor) I guess? You could also [email me](mailto:hello@pancelor.com) if you like. (Sorry, I haven't figured out a good comments system for my site yet)_

_secret note: there is no twitter thread yet; come back tomorrow after I tweet this out ;)_

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
