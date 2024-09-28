<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">Raccoon Tweetcarts</h1>
<h4 class="post-meta">2021-07</h4>

I had some fun playing around with data compression this month.

My first result was fine enough:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">playing around with data compression; the source code (next tweet) is only 279 bytes!<a href="https://twitter.com/hashtag/pico8?src=hash&amp;ref_src=twsrc%5Etfw">#pico8</a> <a href="https://twitter.com/hashtag/tweetcart?src=hash&amp;ref_src=twsrc%5Etfw">#tweetcart</a> <a href="https://t.co/pddyY1JbKq">pic.twitter.com/pddyY1JbKq</a></p>&mdash; pancelor (@pancelor) <a href="https://twitter.com/pancelor/status/1418016317295132673?ref_src=twsrc%5Etfw">July 22, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

but it wasn't very eye-catching. So I tried again, and I love what I made:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Washing Dinner At Sunset<a href="https://twitter.com/hashtag/pico8?src=hash&amp;ref_src=twsrc%5Etfw">#pico8</a> <a href="https://twitter.com/hashtag/tweetcart?src=hash&amp;ref_src=twsrc%5Etfw">#tweetcart</a> <a href="https://twitter.com/hashtag/pixelart?src=hash&amp;ref_src=twsrc%5Etfw">#pixelart</a> <a href="https://t.co/tmUGI8U4Jl">pic.twitter.com/tmUGI8U4Jl</a></p>&mdash; pancelor (@pancelor) <a href="https://twitter.com/pancelor/status/1418664730684649472?ref_src=twsrc%5Etfw">July 23, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Here's the code:

```lua
fillp(0x8520.2)pal{[0]=2,4,9,15}::_::for i=0,255do
x=i%16*8+rnd(3)-1y=i\16*8+(i\16+t()*2)%4rectfill(x,y,x+7,y+7,ord("?????_ISS_A=USda4RTX+HUXT0QeYPDHYiYiPiiEgiiY+?:iiJ>JfU:VH*X@ga1RTcQV>D?7:>OP@??O@@>?S,",1+i\3)-42>>i%3*2&3)end
?"\^4\^j00"
goto _
```

That long string in the middle (`"?????_ISS_A..."`) holds the image data; each character holds 6 bits of custom-encoded data.
When interpreted, those 6 bits are displayed as three 2-bit pixels.

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
