<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">Software Renderer</h1>
<h4 class="post-meta">2020-09</h4>

This is a 3D renderer that doesn't use the GPU at all; it does all the triangle math manually on the CPU and individually sets the color of each pixel shown onscreen. This was a fun experience learning a bit about how 3D graphics work. I only use "fast" operations while rasterizing the triangles (i.e. no floating-point division).

I looked up <a href="https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm">how to draw 2D lines</a> but had to figure out the rest on my own.

### video

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/XfQZR6Vfens?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

(with music from <a href="https://www.youtube.com/watch?list=PLFAB3E682EBF46BDB&v=Z4lqyFcEn3Q">The Smurfs' Nightmare</a>)

### progress

Check out this <a href="https://twitter.com/pancelor/status/1307774529565896705">twitter thread</a> showing my step-by-step progress, from individual triangles all the way up to a lit 3D scene!

### performance

The teapot is made of 3752 triangles / 1976 vertices, and the renderer runs at around 5ms per frame. I haven't done the research to figure out how good that really is (and I haven't attempted to optimize the renderer, beyond my "fast math" design restrictions) but I can spin this particular teapot around at 60fps with plenty of time to spare :)

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
