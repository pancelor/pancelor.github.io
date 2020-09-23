# portfolio

## [escalator world](https://pancelor.itch.io/escalator-world)

An exercise in really really polishing up all of the non-core parts of a game.

Based on an old game maker game back in the yoyogames era called "Escalator World" by LeGuy. It's one of my favorites; one of the few I made sure to download before the yoyogames forums were lost to time...

(well, you can apparently get the games from the forums at www.archive.org somewhere, but it was more complication than I was willing to deal with last time I tried)

## [necrodecorator](https://pancelor.itch.io/necrodecorator)

A game about decorating an inn to make the denizens from [Crypt of the NecroDancer](https://braceyourselfgames.com/crypt-of-the-necrodancer/) feel cozy when they visit. Made for a 7-day game jam with [cryss](twitter.com/princryss); I did all the code and cryss did all of the art/sound.

This was a really fun project that taught me a lot about scoping a game, and how difficult even the most basic 3d stuff can be. (the game is hardly 3D but I spent most of my time making the objects render in the correct order)

## [software renderer](https://twitter.com/pancelor/status/1307774529565896705?s=20)

I wrote a 3D renderer that doesn't use the GPU at all; it does all the triangle math manually on the CPU and calls a `SetPixel` function many times. This was a fun experience learning a bit about how 3D graphics work. I only use "fast" operations while rasterizing the triangles (i.e. no floating-point division).

I looked up [how to draw 2D lines](https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) but had to figure out the rest on my own.

## [upgo](https://pancelor.itch.io/upgo)

Made over 2 weeks for [lowrezjam 2020](https://itch.io/jam/lowrezjam-2020). An exercise in making a platformer with "good game feel" (coyote frames, automatic x-adjustment when hitting the edge of an overhang, queued jump inputs, etc)

This was my first time doing procgen I think? That was a fun learning experience. I basically re-implemented Spelunky's level generation by following this excellent [explanation](http://tinysubversions.com/spelunkyGen/). Also, I feel like a switch has flipped in my brain about coordinate systems - there is no "correct" way to do coordinates you just interpret some numbers however you want.

I wish I had spent more time making this into a real game - there's some good platformer feel and some decent level generation, but not much game to speak of. I would have like to add powerups or items or something.

## [hexringer](https://pancelor.itch.io/hexringer)

A recreation (with a twist!) of a boss from Crypt of the NecroDancer. Made for a 1-day long game jam. I just like this boss and wanted to see how hard it would be to make. Also, I mainly just wanted to see how hard/fun it would be to fight Dead Ringer on a hexagonal grid.

I'm surprised that this went as smoothly as it did. I scraped together some html game code from another game I'm making, so writing that boilerplate wasn't a hurdle, but I'm surprised the first thing I tried for enemy AI actually worked.

## [worms tweetcart](https://twitter.com/pancelor/status/1298093163878391808?s=20)

a fun little pico-8 cartridge that fits inside a tweet

## GameJamDOR

I've organized and run 2 gamejams:

* https://itch.io/jam/gamejamdor
* https://itch.io/jam/gamejamdor2

These were both Crypt of the NecroDancer-themed game jams and were wildly successful by my metric: anyone else at all joined and had a good time :)
Both had about 6 submissions.

A video of me playing all games from GJD2 in a call with the creators: https://www.twitch.tv/videos/691855470?t=00h04m39s

## [skewdence mod](https://steamcommunity.com/sharedfiles/filedetails/?id=905808003) for Crypt of the NecroDancer

[gameplay video](https://www.twitch.tv/videos/696751030?t=00h09m53s)

Normally in this game, you move in the 4 orthogonal directions.
I made a mod where you can only move in 4 directions... but 4 weird directions (N, NE, S, and SW), which makes the game completely different and very fun, in a mind-expanding/headache sort of way.

---

[back to homepage](index.html)
