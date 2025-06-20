<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">Purple Gun Game</h1>
<h4 class="post-meta">2020-07</h4>

At some point (probably due to the many annoyances inherent in making a [game engine in javascript](/posts/inbox-unbox)), I decided to finally write some C++ games. I'd used C++ before, but it always felt so cumbersome to use, like I didn't really know what I was doing. I sat down and started watching the excellent [handmade hero series](https://handmadehero.org/watch), and began following along on my own. It was really nice having someone explain everything and candidly talk about the annoyances that he found in this workflow, but also how to minimize that friction.

Also, the architecture that Casey sets up in the first \~25 episodes of Handmade Hero is _really_ cool. It's a slow burn but the [payoff](https://guide.handmadehero.org/code/day023/) is worth it! If you don't have 25 hours to spend watching that, then just read the rest of this blog post talking; hopefully I can explain it well enough to show you why I think it's so cool!

### so what's so cool about the handmade hero architecture

This:

<figure>
  <video loop controls autoplay muted>
    <source src="/assets/pgg-loop.mp4" type="video/mp4">
  </video>
  <figcaption>looped live code editing</figcaption>
</figure>

I'm editing C++, compiling, and seeing the results of my changes instantly, without needing to context-switch and interact with my game!

### okay I'm interested, tell me more

In any given project, you likely have your project split into a layer of game code (this moves monsters around, draws the player, etc) and a layer of platform code (this displays windows, does file IO, allocates memory, etc).

(Your "platform code" might be as simple as importing SDL2 or some similar library, but _someone_ wrote that code, and I'm always interested in digging to the bottom and understanding what's going on, so I'm not using SDL yet!)

The default way these two code halves interact is usually like this:

<figure>
  <img src="/assets/pgg-hmh1.png">
  <figcaption>typcial game architecture</figcaption>
</figure>

The game layer is always in control, and when it needs to, it calls out to services that the platform layer provides to interact with the physical platform it's running on. For example, when the game needs to load a sprite, it calls `Platform->LoadImage("player.png");`, and when it wants to draw a sprite, it calls `Platform->DrawImage(mySprite);`.

However, there's a wacky alternate way that ends up enabling some extremely cool stuff later on:

<figure>
  <img src="/assets/pgg-hmh2.png">
  <figcaption>handmade hero game architecture</figcaption>
</figure>

In this architecture, the _platform layer_ is always in control, and the game layer is providing its services to the platform, instead of the other way around. In fact, the game code _doesn't even import `windows.h`_; the only way it can communicate with the user is by setting pixels in the screen array that the platform layer passes it! (Okay, it can also send sound output and receive user input, but all of this is mediated through the platform layer; the game never does any of this directly.)

What "services" does the game provide? Just two: it responds to an `UpdateAndRender(game_state *State)` call and a `GetSoundSamples(game_state *State)` call. These functions both are passed a pointer to the current game state – _this is because the game does not own it's state; the game state is owned by the platform layer!_

Now I know this sounds _bizarre_, but it has some incredible advantages. For example, you can **hot-reload the game code**. Like, you can tweak the player's friction value, press "recompile", and tab over to the running game and see your new physics changes _immediately_ in effect. (This feature was super useful while building my [tetris clone](/posts/tetris-clone) for tweaking the keyrepeat delay and adjusting the animation speed for the line clear and "you lose" animations)

### hot-loading C++ game code??

How does this work, exactly? Well, you compile the platform layer as the main EXE, and then compile your game layer as a separate DLL. Then, every frame, the platform layer checks to see whether the game layer DLL has been updated. If it has, it updates the two pointers it knows about (`UpdateAndRender` and `GetSoundSamples`), and continues to simulate the game, without disrupting the game state at all, _because the platform layer is the one holding onto the memory for the game state_.

Also, with this architecture, you can easily record a sequence of inputs, and then restore the game state back to the start of the recording and replay the inputs, sort of like a looping synthesizer. This is incredible for, e.g., tuning physics parameters, because you can tweak the values and see the results _immediately_, without needing to relaunch the game, get back to the specific cliff you're testing your jump code at, and try to execute the same inputs manually. (This is what's happening in the video up at the top of this post.)

### show me some code!

Here's a pared-down version of this game architecture. (this code is all in the platform layer, in the EXE)

```C++
typedef void game_update_and_render(
  game_state *GameState,
  game_input *GameInput,
  /*...*/);
typedef void game_get_sound_samples(/*...*/);

struct win32_game_code {
  HMODULE Library;
  uint64 LastWriteTime;
  // function pointers to the "services"
  //  the game provides:
  game_get_sound_samples *GetSoundSamples;
  game_update_and_render *UpdateAndRender;
};

void Win32RefreshGameCode(win32_game_code *GameCode) {
  // Check to see if the game DLL has been updated
  //   since the last time we checked (last frame)
  // If it has been updated, call LoadLibrary()
  //   and update the function pointers in GameCode
}

struct recording_harness {
  /*...*/
};

int WinMain(/*...*/) {
  win32_game_code GameCode = {};
  game_input GameInput = {};
  game_state GameState = {};
  recording_harness RecordingHarness = {};
  while (true) {
    // code hot-reloading!
    Win32RefreshGameCode(&GameCode);

    ReadUserInput(&GameInput);
    if (RecordingHarness.PlaybackHandle) {
      // hijack the input!
      Win32RecordingHarnessPlaybackOnce(
        &RecordingHarness, &GameInput);
    }
    if (RecordingHarness.RecordingHandle) {
      // record the input, for later playback
      Win32RecordingHarnessRecordOnce(
        &RecordingHarness, &GameInput);
    }

    if (GameCode.UpdateAndRender) {
      GameCode.UpdateAndRender(
        &GameState, &GameInput, /*...*/);
    }
    if (GameCode.GetSoundSamples) {
      GameCode.GetSoundSamples(&GameState);
    }

    // Sleep() until it's time for the next frame
  }
}
```

Does the `game_state` structure get unwieldy? Yeah, a bit. It gets a bit annoying to type `State->Foo` everywhere instead of just using a global variable `Foo`, but the code hot-reloading is worth it. By using sub-structures, the code remains pretty readable. Here's an example of the final `game_state` struct from my tetris clone:

```C++
struct game_state {
  int Size; // size of this struct (helps
            // prevent hotreloading issues)
  simple_arena TempArena;
  simple_arena Arena;
  bool32 Muted;
  continuous_sound Music;
  game_sound MusicTitle;
  game_sound MusicTypeA;
  game_sound MusicTypeB;
  game_sound MusicTypeC;
  game_sound MusicLose;
  simple_pool CurrentSFX;
  game_sound SfxMenuSelectHigh;
  game_sound SfxMenuSelectLow;
  game_sound SfxPieceMove;
  game_sound SfxPieceRotate;
  game_sound SfxPieceLand;
  game_sound SfxGameOver;
  game_sound SfxLineClear;
  game_sound SfxLineFall;
  game_sound SfxLevelUp;
  game_sound SfxGotTetris;
  game_sound SfxBootClick;
  rng_state RngState;
  bool32 HasShownDemo;
  game_bitmap TileBitmap;
  tile *ScreenArea;
  tile *PlayArea;
  struct {
    highscore_entry Entries[3];
  } HighscoresByLevel[10];
  int CurrentLevel;

  game_mode Mode;
  game_mode NextMode;
  struct {
    bool32 IsInitialized;
    int64 FrameCount;
    tetris_piece CurrentPiece;
    piece_tag NextPieceTag;
    float32 AutoFallDelaySeconds;
    int64 FrameForNextFall;
    int Score;
    int LinesCleared;
    int Level;
    bool32 ShouldSpawnPiece;
    int StartOfDropY;
  } PlayState;
  struct {
    game_mode ReturnMode;
  } PauseState;
  struct {
    game_mode ReturnMode;
    int64 FrameCount;
    int YToClear[4];
    int LinesCleared;
    int YCursor;
  } LineClearState;
  struct {
    int64 FrameCount;
    int YCursor;
  } LoseState;
  struct {
    int64 FrameCount;
    bool32 IsInEntryMode;
    highscore_entry *Entry;
    int Rank; // 1-3; 0 for no high score
    int EntryCursor;
    int LevelSelectCursor;
  } HighScoreState;
  struct {
    int64 FrameCount;
  } CopyrightState;
  struct {
    int64 FrameCount;
    int SelectedOption;
  } TitleState;
  struct {
    int64 FrameCount;
    int SequenceIndex;
  } DemoState;
  struct {
    int64 FrameCount;
    void *RecordingBuffer;
    int RecordingBufferSize;
    int RecordingBufferCap;
  } RecDemoState;
  struct {
    int64 FrameCount;
    bool32 IsInMusicSelect;
    int GameCursor;
    int MusicCursor;
  } TypeSelectState;
};
```

Yup.

### wait wasn't this supposed to be about something called "purple gun game"

Yeah, but the game itself isn't particularily interesting, especially when compared against how cool the code architecture is! Okay, also, I _technically_ did all of this architecture work for the first time while building [Tetris](/posts/tetris-clone), but that post was long enough as-is, and I reused the architecture for this game too. (It's the default thing I use nowadays when I start something in C++.)

Also, purple gun game is released and publically available -- If you want to check it out (windows-only), download it [here](https://pancelor.itch.io/purple-gun-game)! The goal of this project wasn't to make a fun game, it was to try out making a prototype in this cool architecture, so keep that in mind when playing.

<iframe frameborder="0" src="https://itch.io/embed/702486?bg_color=8ecc74&amp;fg_color=291814&amp;link_color=e0964c&amp;border_color=f2cfb8" width="552" height="167"><a href="https://pancelor.itch.io/purple-gun-game">Purple Gun Game by pancelor</a></iframe>

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
