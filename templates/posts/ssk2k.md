<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">SPACESHARKKILLER2000</h1>
<h4 class="post-meta">2021-04 + 2021-10</h4>

_This game was made in 60\~90 minutes, for a 1-hour game jam. It's fun enough, but the main reason I've written this blog post is to dive into an unexpected glitch in the game. You can play our game here:_

<iframe frameborder="0" src="https://itch.io/embed/997728?bg_color=8ecc74&amp;fg_color=291814&amp;link_color=e0964c&amp;border_color=f2cfb8" width="552" height="167"><a href="https://pancelor.itch.io/space-shark-killer-2000">SPACE SHARK KILLER 2000 by pancelor, Mer Grazzini</a></iframe>

_(I wish the itch.io embedded widget said "by pancelor, Mer Grazzini", but itch apparently only shows a single author...)_

## 1-hour game jam

A few months ago, [Mer Grazzini](https://mergrazzini.itch.io/) and I teamed up for a 1-hour game jam. We did a brief bit of planning beforehand: we would use pico-8, I would write the code, and she would draw the art. I made sure to let her know that pico-8 only allows 16 colors, and sent her the palette. I hadn't forgot to tell her any other important restrictions, had I? The 16-color restriction was the main one an artist would need to know... right?

The theme was revealed ("floating") and the clock began ticking. 60 minutes left! We brainstormed and decided to make an arcade-style space shooter:

> possible actual idea: you're floating on a raft with a shotgun, you use the gun to both shoot sharks and also to make your raft move in the opposite direction

<figure>
  <img src="/assets/ssk2k/conceptart.png"/>
  <figcaption>my 15-second concept art</figcaption>
</figure>

After 20 or 30 minutes, the game was only half-playable, but the sprites were done. Mer moved on to make a menu screen and a gameover screen while I kept working on getting things working.

<figure>
  <img src="/assets/ssk2k/splashscreens.png"/>
  <figcaption>Mer's splash screens</figcaption>
</figure>

When she sent me two AMAZING splash screens with 10 minutes left to go, I suddenly realized: this was too much art! Pico-8's spritesheet is a fixed size (128x128), and two 128x128 images (alongside the game's sprites) took up well over twice that budget. With 5 minutes left in the jam, I was panicking trying to think of anything I could do to get the splash screens into the game. If I shipped the game in its current state, it would have the sprites Mer whipped up quickly at the start, but none of the splash screens she had spent most of her time working on. Luckily, I had just recently been playing around with zep's [PX9 sprite compression system](https://www.lexaloffle.com/bbs/?tid=34058), and over the next 20\~30 minutes I reminded myself how to use it, compressed the splash screens and added them to the game, and published it. (we went a bit over the 1-hour time limit)

Some other people in the jam played the game a few times, and said they really liked the "different versions of the death screen". Different versions...? I had them send some screenshots:

<figure>
  <img src="/assets/ssk2k/glitches.png"/>
  <figcaption>WHAT</figcaption>
</figure>

That is VERY COOL but also NOT INTENDED. what had happened??

## PX9

The PX9 compression tool works by predicting the next color to draw based on the nearby colors. If the it correctly predicts the next pixel, it increases a counter saying how many predictions it got right in a row, and then stores that counter instead of each individual pixel color, saving a lot of space. For instance, the long rows of dark blue of the background are easily compressed to just a few bytes this way. (for more details, see the author's description of the algorithm, or the code itself, [here](https://www.lexaloffle.com/bbs/?tid=34058))

At the time, I assumed the glitches were caused by the decompression algorithm interacting badly with the code that changes the screen palette to fade in and out. PX9 needs to read colors it previously decompressed, to act as an input to its prediction for the current pixel. So, I figured, the changing colors from the fade-in/fade-out post-processing were confusing PX9 about what pixels it had written earlier. I was tired from the adrenaline of finishing the game, the glitchy result was SO COOL, and the explanation was plausible enough, so I didn't investigate further. I saved an exact copy of the PX9 compression code I used, in case I wanted to investigate it later for bugs.

## investigation

Fast-forward to today, when I opened up the code to try to understand how those incredible glitches had happened. I had known for a while that the fade code wasn't the culprit -- it didn't make sense that half of the image would be unaffected if that was really the issue.

I removed the fade code -- yup, the glitches still (sometimes) appeared. I tried upgrading PX9 to the latest version, idly wondering if it was a glitch in the compression code itself. Nope, the glitches remained. I fixed the RNG seed to a particular value, and built a custom tool that would hijack the player's input and replay the exact same inputs every time. Somehow, the glitches were _still_ inconsistent?? Given the exact same seed and exact same input, the game was producing different end screens... was my console haunted?

<figure>
  <video preload="auto" controls loop autoplay muted src="/assets/ssk2k/inconsistent.mp4"></video>
  <figcaption>playing the game exactly the same and getting different ending screens</figcaption>
</figure>

## aha!

Something I noticed in that video was the key to figuring it all out -- you can try to figure it out yourself before continuing, if you like! It might help to view the video fullscreen.

The thing that caught my eye was this: while I built the input recording/replay harness, I whimsically added in some icons that showed whether the game was recording or replaying input. They were aligned in the top-right corner of the screen, but as you can see in that gif, their position was slightly off during the death screen. How could that happen? The death screen code just draws a 128x128 image to 0,0... but! the game's coordinate system gets offset to create the screenshake when you shoot, and that offset was persisting into the death screen! And this was causing PX9 to bug out, because when it writes, say, a red pixel offscreen and then later asks what color is at that (offscreen) location, pico-8 says, "oh, that location is offscreen, so let's just say the color there is black". And that small inconsistency sets off a whole series of chain reactions in the decompression, glitching out the rest of the image. Mystery solved!

## wait what about the nondeterminism

Oh, good point, yeah. Why was the game acting differently between two different runs with the exact same seed and the exact same input? Well, pico-8 lets you define an `_update60` and a `_draw` function, and then it calls them in sequence 60 times each second. But, if your code misses its frame window and takes too long, pico-8 will skip calling `_draw` half of the time, degrading the frame rate to 30FPS but keeping your game from lagging too badly.

<figure>
  <img src="/assets/ssk2k/updatedraw.png"/>
  <figcaption>function call order in pico-8</figcaption>
</figure>

Now, I was using the RNG during `_draw` to position the stars in the background, and this was advancing the state of the RNG inconsistently if `_draw` was sometimes skipped due to the CPU overhead of decompressing the splash screens, which then made the sharks wait for inconsistent amounts of time between their movements, causing the player to collide with them at different times, meaning that the camera offset due to screenshake was inconsistent, leading to PX9 getting confused if the screenshake hadn't fully decayed.

```lua
  -- the root cause of the nondeterminism:
  function draw_stars(starseed)
   local savedseed=rnd()
   -- revert to a consistent seed (temporarily)
   srand(starseed)
   for i=0,100 do
    -- draw stars at random locations
    pset(rnd(128),rnd(128),7)
   end
   srand(savedseed)
  end
```

It's not clear to me why pico-8 would modify the game's framerate inconsistently between runs, but the glitch inconsistencies happen only when `_update60` and `_draw` are executed a different number of times, so the mystery of the sometimes-glitchy end screens is finally solved in my eyes.

## thanks for reading!

To summarize, here are all the things that combined in a perfect storm to produce a glitch this confusing and interesting:

* Forgetting to communicate a crucial restriction to my teammate
* Pico-8's spritesheet size restriction, pushing me to compress the sprites to make them fit
* Screenshake adjusting the world camera during gameplay
* Only adjusting the screenshake offset midgame, and not resetting it on game over
* The exact details of how PX9's data compression algorithm works when trying to decompress to a partially offscreen location
* Pico-8's framerate compensation
* Calling `rnd()` during `_draw`

It's a wonderful tale of many many small things interacting in non-obvious ways to produce an incredible result -- Mer and I agree that the only-sometimes-glitched death screens are an unambiguous improvement to the game we meant to make. Play our game [here](https://pancelor.itch.io/space-shark-killer-2000) if you like, and check out [Mer's other games](https://mergrazzini.itch.io/)!

<hr>

[more posts](https://pancelor.bearblog.dev/)

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
