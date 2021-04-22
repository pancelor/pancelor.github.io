<!DOCTYPE html>
<html>
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index#worms"><div class="header-banner"></div></a>
</div>
<section class="main-content">
<h1 class="post-title">Worms Tweetcart</h1>
<h4 class="post-meta">2020-08</h4>

A fun little animation, written as a pico-8 cartridge that fits inside a tweet.

### final product

<blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">had fun today makin a little <a href="https://twitter.com/hashtag/pico8?src=hash&amp;ref_src=twsrc%5Etfw">#pico8</a> <a href="https://twitter.com/hashtag/tweetcart?src=hash&amp;ref_src=twsrc%5Etfw">#tweetcart</a>:<br><br>pal({11,2,140,136,135,129,1,138,130,143,139,3,7,128,142},1)<br>t=0 e=128 cls(6) ::e:: t+=1 for c=0,15 do<br>d=c*21%16*2<br>fillp(65&lt;&lt;(t/7%4))<br>circfill(64+64*sin(t/64+c/16),(t+9*d)%(e+d)+(d^^3)/2*sin(c*t/e),d/2,c)<br>end flip() goto e <a href="https://t.co/arEqT4TTQv">pic.twitter.com/arEqT4TTQv</a></p>&mdash; pancelor (@pancelor) <a href="https://twitter.com/pancelor/status/1298093163878391808?ref_src=twsrc%5Etfw">August 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### engine

Made in pico-8.

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
