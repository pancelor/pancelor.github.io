<!DOCTYPE html>
<html>
<head>
<link href="/stylesheets/mailchimp.css" rel="stylesheet" type="text/css">
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">

<div hidden style="display: none;">
bot email: <a href="mailto:honeypot@pancelor.com">honeypot@pancelor.com</a>
</div>

### contact / follow / etc:

* **email**: [hello@pancelor.com](mailto:hello@pancelor.com)
* **itch**: [pancelor](https://pancelor.itch.io). for published games
* **blog**: [pancelor](https://pancelor.bearblog.dev/). for blog posts and devlogs ([rss](https://pancelor.bearblog.dev/feed/?type=rss))
* **mastodon**: [@pancelor@mastodon.social](https://mastodon.social/@pancelor). the hot new internet town square
* **bluesky**: [@pancelor.bsky.social](https://bsky.app/profile/pancelor.bsky.social). the other hot new internet town square
* **twitch**: [pancelor](https://twitch.com/pancelor). for game dev streams and indie variety streams

<div class="mailing-list-card">

### join my mailing list!

If you like my projects, join my mailing list! I occasionally send emails, usually when I release a major project. If you're interested, enter your email here:

<div><%- md("/_mail.ejs") %></div>
</div>

### patreon

* If you want to help me keep making small free games, you can send me a couple of bucks on [patreon](https://pancelor.com/patreon)!

### contact me right here directly from this website, pancelor dot com:

leave me a note here:

<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe8o5Fr7OIhgRqF6QUxTTKGJLWOerumoWotJeXFd9iupRlOsA/viewform?embedded=true" width="720" height="405" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
