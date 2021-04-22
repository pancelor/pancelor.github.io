<!DOCTYPE html>
<html>
<head>
<link href="/stylesheets/mailchimp.css" rel="stylesheet" type="text/css">
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<div class="header">
  <a href="/index"><img class="header-banner" src="/assets/banner.png"></a>
</div>
<section class="main-content">

### contact me:

* **email**: [hello@pancelor.com](mailto:hello@pancelor.com)
* **twitter DM**: [@pancelor](https://twitter.com/pancelor)

### follow me:

* **twitter**: [@pancelor](https://twitter.com/pancelor) (warning: weird)
* **twitch**: [pancelor](https://twitch.com/pancelor) for game dev streams and indie variety streams
* **itch**: [pancelor](https://pancelor.itch.io) for published games

<div class="mailing-list-card">

### join my mailing list!

If you like my projects, join my mailing list! I'll email you about the cool stuff I'm making, you'll be the first place I turn to when looking for playtesters for [Inbox Unbox](/posts/inbox-unbox). If you're interested, enter your email here:

<div><%- md("/_mail.ejs") %></div>
</div>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
