<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section class="main-content">
<h1 class="post-title">Monster Mash</h1>
<h4 class="post-meta">2020-10</h4>

A cute game that [@princryss](https://www.twitter.com/princryss) and I made together for halloween! Cryss did the game design + art + sound, I did the programming.

Play it online [here](https://pancelor.itch.io/monster-mash)! It's a 5\~10 minute game.

<video preload="auto" controls loop muted src="/assets/monster-mash.mp4"></video>

### engine + tech

This was made in pico-8. So in one sense pico-8 is the "engine", but I built a general-purpose object system/engine-y type thing inside it that I want to talk about for a bit here.

Pico-8 is a fairly low-level engine in terms of expressiveness; it's no GameMaker, which handles objects and collisions for you. It has some graphics and input primitives, and a really nice IDE-like environment where it's easy to make sprites and sounds and then access them from your game code, but it doesn't have much else. (Check out the [API reference](https://pico-8.fandom.com/wiki/APIReference) for a more complete picture of what it can do.)

To be clear, I'm not complaining! I love pico-8! It's such a comfy environment to work in. It's hard to pinpoint exactly what's so great about it... the integrated sprite editor / map editor / etc keeping you in the flow? the well-designed API? the artificial limits put in place, that force you to make small things and then move on? I've made 15+ semi-interesting projects using it in the last 3 months which shows you how much I like it :)

Anyway, whenever I make a pico-8 game, I normally build a general-purpose game engine that provides all the architecture that pico-8 has left undecided. (For example, setting up the game loop to update and then draw all objects in my game.) When I start a new project, I don't just copy over my old engine, which might be surprising! I start from scratch each time, which is useful because I've never felt like my engines were really all that great, so by starting over with a clean slate I get a fresh chance to try again, incorporating all my past learnings. (Also, it's just fun to write a new engine each time!)

But! This time I really like my engine! It makes it easy to add new functionality and test out new ideas, but it also keeps all the code organized and isolated into their own bubbles that makes me feel like the code won't become a horrible tangled mess that becomes un-editable. I'm pumped that I was able to make an engine I feel this good about!

### so how does the engine work

Take a brief look at this sample usage code, so you have some context about how the engine ended up:

```lua
function load_overworld_7R()
  -- setup some globals for PlaceWithContext():
  place_context_room_n=7
  place_context_dim=0

  -- hitbox that pans the camera
  -- when the player enters this room:
  Actor({
    place=PlaceWithContext({
      x=4,y=0,
      w=56,h=64,
    }),
    on_collide=OnCollidePan({}),
  })
  -- ground collider:
  Actor({
    is_platform=true,
    place=PlaceWithContext({
      x=0,y=64-12,
      w=64,h=12,
    }),
    draw=DrawGround({
      color=color,
      filled=true,
    }),
    on_collide=OnCollideFloor({}),
  })
  -- world border wall:
  Actor({
    place=PlaceWithContext({
      x=64,y=0,
      w=1,h=64,
    }),
    on_collide=OnCollideWall({}),
  })

  -- tree 1:
  Actor({
    place=PlaceWithContext({
      x=24,y=12,
    }),
    draw=DrawSprite({
      frames={203},
      w=2,h=4,
      z=500,
    }),
  })
  -- tree 2:
  Actor({
    place=PlaceWithContext({
      x=2,y=29,
    }),
    draw=DrawSprite({
      frames={203},
      w=2,h=4,
      z=-160,
      pal={[2]=9,[9]=10},
    }),
  })
  -- iron fence:
  for x=0,7 do
    Actor({
      place=PlaceWithContext({
        x=i*8,y=42,
      }),
      draw=DrawSprite({
        frames={239},
        w=1,h=2,
        z=-150,
      }),
    })
  end

  ghost=Actor({
    stage=0,
    place=PlaceWithContext({
      x=46,y=16,
      dx=1,dy=1,w=7,h=13,
    }),
    draw=DrawSprite({
      frames={13,14},
      w=1,h=2,
      palt=15,
      z=-50,
    }),
    on_interact=OnInteract({
      hover=function(self,actor)
        hud.hud_color=7
        return true
      end,
      interact=function(self,actor)
        if player.item==bone2 then
          dtb_disp("hey, that's my leg!")
          return true
        end
        dtb_disp("that's my grave \nover there.")
        dtb_disp("watch your step please.")
        return true
      end,
    }),
  })
end
```

My inspiration for the engine came from a few different places. (I don't think my engine is particularily new or innovative, but it's similar-and-yet-slightly-different to a couple specific things, and I'm hoping that by writing about it I'll come to understand it better) [This article](https://www.rockpapershotgun.com/2016/03/04/making-of-spelunky/2/") and my experience modding [NecroDancer](https://braceyourselfgames.com/crypt-of-the-necrodancer/) make me think that both games (Spelunky and NecroDancer) have pretty similar systems for organizing their objects. In this type of system, everything is a single type that can theoretically do anything, but only a few specific behaviors are actually enabled for any given object. For example, every enemy in necrodancer has an `isMonkeyLike` flag, but almost all enemies have it set to `false`.

The third and most direct source of inspiration was [this talk about ECS](https://www.youtube.com/watch?v=JxI3Eu5DPwE) (or rather, alternatives to ECS). The section from 10:27 to 13:10 (which he summarizes as "that old principal of choosing composition over inheritance") was especially on my mind while designing this engine.

So, what does this engine do, exactly? Well, each frame, the engine calls `update()` on each actor that has an `update` function. (There are none shown here, but the player has an `update` and every actor that paces around or does other scripted behavior has an `update` function.) The player's `update` checks for collisions between the player and all other actors, using the `x,y,w,h` data stored in each actor's `place` component. If it finds a collision and the other actor has an `on_collide` component, then that component's behavior gets executed. This is a great way for different types of actors to have different collision behavior -- one actor can handle panning the camera when the player collides with it, another actor can handle stopping the player when they fall onto the ground, and both actors can live in the same simple system that isn't too complicated to think about.

Another thing I particularily like is how you can choose your level of granularity when interacting with this engine. If you want to draw an actor as a simple static image, giving it `draw=DrawSprite({frames={123}})` will work. But if you want full custom control over what it draws (maybe it uses shape primitives like `rectfill` or `circ`), you can give it this component instead:

```lua
Actor({
  place=PlaceWithContext({
    x=10,y=20,
  }),
  draw=CustomDraw({
    draw=function(self,actor)
      circ(actor.place.x,actor.place.y,10)
    end,
  }),
})
```

This made things easy to get working quickly, but allowed us to refine things later if needed.

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
