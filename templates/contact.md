<!DOCTYPE html>
<html>
<head>
<link href="/stylesheets/mailchimp.css" rel="stylesheet" type="text/css">
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section class="main-content">

### contact me:

* **email**: [hello@pancelor.com](mailto:hello@pancelor.com)
* **twitter DM**: [@pancelor](https://twitter.com/pancelor)

### follow me:

* **twitter**: [@pancelor](https://twitter.com/pancelor) (warning: weird)
* **itch**: [pancelor](https://pancelor.itch.io) for published games
* **twitch**: [pancelor](https://twitch.com/pancelor) for game dev streams and indie variety streams

### patreon

* If you want to help me keep making small free games, you can send me a couple of bucks on [patreon](https://pancelor.com/patreon)!

<div class="mailing-list-card">

### join my mailing list!

If you like my projects, join my mailing list! I'll email you about the cool stuff I'm making, you'll be the first place I turn to when looking for playtesters for [Inbox Unbox](/posts/inbox-unbox). If you're interested, enter your email here:

<div><%- md("/_mail.ejs") %></div>
</div>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
