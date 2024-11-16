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

email: [hello@pancelor.com](mailto:hello@pancelor.com)

### You Can Follow Me On The Internet:

* **[itch.io](https://pancelor.itch.io)**: for published games
* **[blog](https://pancelor.bearblog.dev/)**: for blog posts and devlogs ([rss](https://pancelor.bearblog.dev/feed/?type=rss))
* **[mastodon](https://mastodon.social/@pancelor)**: the hot new internet town square
* **[bluesky](https://bsky.app/profile/pancelor.bsky.social)**: the other hot new internet town square
* **[twitch](https://twitch.com/pancelor)**: for game dev streams and indie variety streams

### Patreon

If you want to help me keep making small free games, you can send me a couple of bucks on [patreon](https://pancelor.com/patreon)!

<div class="mailing-list-card">

If you like my projects, join my mailing list! I occasionally send emails, usually when I release a major project. If you're interested, enter your email here:

<div><%- md("/_mail.ejs") %></div>
</div>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
