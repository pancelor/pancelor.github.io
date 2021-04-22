<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#fishy"><div class="header-banner"></div></a>
</div>
<section class="main-content">
<h1 class="post-title">Fishy</h1>
<h4 class="post-meta">2020-11</h4>

This was a submission to [TweetTweetJam 5](https://itch.io/jam/tweet-tweet-jam-5), a game jame where your entire game must fit into 560 characters (aka the length of two tweets).

Play it online [here](https://pancelor.itch.io/fishy)! It's pretty small but I'm proud of how fun I managed to make it, given the space constraints.

### gameplay video

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/fishy.mp4" type="video/mp4">
  </video>
  <figcaption>my highscore is getting to level 11; <a href="https://twitter.com/pancelor/status/1326391289676443648">let me know</a> if you manage to get farther!</figcaption>
</figure>

### the code

In the end, the final character count was 555:

```lua
l=1poke2(12800,582)r=rnd::t::q="g=128h=1.5f={64,64,h,0}for i=5,g,4do
f[i]=r(g)f[i+1]=r(g)f[i+2]=r(2+l/4)f[i+3]=r(3)-1end::b::cls(1)u=0for i=1,#f,4do
x=f[i]+f[i+3]if i<2then
b=btn()x+=b\2%2-b%2f[i+1]+=b\8%2-b\4%2end
f[i]=x%g
y=f[i+1]s=f[i+2]u+=s
for j=i+4,#f,4do
w=f[j+2]e=s+w
if e>abs(x-f[j])and e>abs(y-f[j+1])then
k=j+i
if(s<w)j=i
k-=j
f[j]=j
sfx(0)f[j+1]=-9f[j+2]=0f[k+2]+=w/8if(j<2)q="lose\n ❎"end
end
ovalfill(x-s*h,y-s,x+s*h,y+s,8+i%7+sgn(i-2))end
?l,62,4,7
if(u==f[3])q="win!\n ❎"l+=1
flip()::a::
if(btnp(5))goto t
if(#q<1)goto b
?q,56,64,7
goto a
```

### okay what

Yeah, it's certainly not optimized for readability, heh. Here's a much earlier version that should give you an idea of how it works:

```lua
r=rnd

n=6
-- 0,1,2   ,3 ,4  ,5
-- x,y,size,dx,col,dy
f={
  64,64,1,0,8,0
}
function gen(i)
 f[i]=r(120)+4
 f[i+1]=r(128)
 f[i+2]=r(2)
 f[i+3]=r(4)-2
 f[i+4]=7
-- f[i+5]=r(1)-0.5
 f[i+5]=0

 if(i==1)lose=1
end

for i=1+n,n*20,n do
  gen(i)
end

::b::
cls(1)
 for i=1,#f,n do
  if i==1 then
   if lose then
    print("lose",56,64)
   else
     f[1]+=1-(1+btn()&3)%3
     f[2]+=1-(1+(btn()&12))%3
    end
  end
  x=f[i]+f[i+3]
  if(x>128)f[i+3]*=-1
  if(x<1)f[i+3]*=-1
  f[i]=x
  y=f[i+1]+f[i+5]
  f[i+1]=y
  s=f[i+2]
  -- collide
  for j=i+n,#f,n do
   dx=abs(x-f[j])
   dy=abs(y-f[j+1])
   s2=f[j+2]
   d=s+s2
   if dx<d and dy<d then
    ismall=s<s2 and i or j
    ibig=ismall^^i^^j
    gen(ismall)
    pre=f[ibig+2]
    f[ibig+2]+=0.5--f[ismall+2]^0.2
    f[ibig+3]*=0.7
    if ismall==1 then
     f[ibig+4]=12
    end
   end
  end
  ovalfill(x-s,y-s/2,x+s,y+s/2,f[i+4])
 end
flip()
goto b
```

The basic idea is that all the fish are stored in a giant flattened array of attributes. So, `f[1]` through `f[6]` are the data values for the player, `f[7]` through `f[12]` are the data values for the first random fish, and so on. (The player is stored in the same array as everyone else to make the code simpler and smaller)

Each frame, all the fish update according to their `dx` attribute. The fish check for (rectangular) collisions against every other fish, and consume and grow if they were the bigger fish. In this old version, the dead fish gets re-generated at a random other point in the world, buuut this made the endgame slightly... weird, so I ended up changing that for the final version:

<figure>
  <video loop controls muted>
    <source src="/assets/fishy-old.mp4" type="video/mp4">
  </video>
  <figcaption>hmmmm (flashing lights warning)</figcaption>
</figure>

### cool trick: 8-way movement

For the player movement, I wanted to figure something out that did this logic in fewer characters:

```lua
if(btn(0))x-=1
if(btn(1))x+=1
if(btn(2))y-=1
if(btn(3))y+=1
```

That's 59 characters; can we do better? What do we need to do to make `x+=magic(...)` do exactly what I want? Well, `btn()` (when called with no arguments) returns a bitfield of all currently-held buttons, and I knew I wanted the output of my hypothetical `magic` function to be either 0, -1, or 1, so I tried defining `magic` to be `1-(more_magic(btn())%3)`. After messing around with this for a while, I came up with this:

```lua
b=btn()
x+=1-(1+b&3)%3
y+=1-(1+(b&12))%3
```

40 characters! And the linebreaks are optional in this snippet (but not the first one, for arcane pico-8 parser reasons). I used this incantation for a while until I saw someone post something [even shorter](https://twitter.com/DaleJ_Dev/status/1324856184470446080), saving another 5 characters.

### cool trick: xor swap

Another cool trick I used was using the xor operator to swap the value of two variables:

```lua
ismall=s<s2 and i or j
ibig=ismall^^i^^j
```

Here, I wanted to figure out which fish index was the bigger fish, `i` or `j`. That first line figures out which fish is smaller, but I also want to know which fish is bigger! A similar line of code works of course (`ibig=s<s2 and j or i`), but using xor like this (`^^`) saves precious characters.

...oh, and now that I've written this all up, I've suddenly realized that I can save an additional 2 characters by doing the swap this way instead:

```lua
ismall=s<s2 and i or j
ibig=i+j-ismall
```

If only pico-8's xor was spelled with one character instead of two... using xor for stuff like this is cool!! Oh well, gotta save those characters. :D

### game design

This project taught me a surprising amount about game design. My initial attempts at making this weren't very fun, and they were a bit too chaotic (see the above video, lol). But, as I specifically worked on addressing those issues, the game become more and more fun, which was exciting to notice as it happened.

The first big improvement was getting rid of fish permanently when they get eaten, instead of respawning them. This removed the endgame chaos, and gave the game a nice goal state. Then later, I had saved enough characters in various ways to be able to add in a level progression system, which made the game a lot more compelling.

It's often easy to imagine that game design is some ineffable magic secret sauce that can't be broken down or examined, so it was illuminating to notice that no actually, for this game I was able to identify and concretely address multiple game design issues, leading to a more fun game in the end.

Overall this was a really fun project! Tweetcarts are fun to make :)

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
