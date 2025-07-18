<!DOCTYPE html>
<html lang="en">
<head>
<%- include ("/_header.ejs") %>
</head>
<body>
<div class="wrapper">
<%- include ("/_nav.ejs") %>
<section id="main-content">
<h1 class="post-title">PICO-8 rnd() Bug</h1>
<h4 class="post-meta">2020-08</h4>

(this page is under construction!)

<!--
  initial symptoms
  test cases
    rnd(tab)->rnd() fixed it
  is rnd(tab) busted? decompiler time
  how does rnd() work
  how does rnd(tab) work
  (summarize convo with val about why the IDA code gets 2<<16 v.s. 2)
  (lmao pico-8 is 1<<16 indexed)
  proof.c
  ping riley, ms rabbit
 -->

```c
// run this with `clang proof.c && ./a.exe`

#include <stdio.h>
#include <assert.h>
typedef unsigned int u32;

int bit(int b, u32 x) {
  return (x&(1<<b))!=0;
}

u32 _p8_m_high=0x01234567;
u32 _p8_m_low =0xDEADBEEF;
u32 _pico8_random(u32 n) {
  if (n == 0) return 0;
  u32 swap=(_p8_m_high << 16 | _p8_m_high >> 16);
  u32 old_low=_p8_m_low;
  _p8_m_high = swap + old_low;
  _p8_m_low = swap + (old_low<<1);
  // notice:
  // * (bit(3,n) means the 3rd-least-significant bit of n)
  // * Property 1: bit(0,_p8_m_high) == (bit(0,swap)+bit(0,old_low))%2
  // * Property 2: bit(0,_p8_m_low) == bit(0,swap)
  return _p8_m_high % n;
}

void test() {
  // Lowercase letters are placeholders for bits,
  //   different from each other and not important
  // Uppercase letters are variables that always hold
  //   the same value throughout this calculation;
  //   i.e., iff A is 1 at the start, it is still 1 at the end
  _pico8_random(100);
  u32 x=_p8_m_high;

  // _p8_m_high = 0xaaaaaaaa aaaaaaaA bbbbbbbb bbbbbbbb // new var: A
  // _p8_m_low  = 0xcccccccc cccccccc dddddddd dddddddd
  _pico8_random(42);
  // swap       = 0xbbbbbbbb bbbbbbbb aaaaaaaa aaaaaaaA // notice: A
  u32 y=_p8_m_high;

  // _p8_m_high = 0xeeeeeeee eeeeeeeE ffffffff ffffffff // new var: E
  // _p8_m_low  = 0xgggggggg gggggggg hhhhhhhh hhhhhhhA // A ends up copied here (Property 2)
  _pico8_random(1337);
  // swap       = 0xffffffff ffffffff eeeeeeee eeeeeeeE // notice: E
  u32 z=_p8_m_high;

  // _p8_m_high = 0xiiiiiiii iiiiiiii jjjjjjjj jjjjjjjJ // new var: J=(E+A)%2 (Property 1)
  // _p8_m_low  = 0xkkkkkkkk kkkkkkkk llllllll llllllll

  // notice:
  // * J=(E+A)%2 (follows from Property 1)
  // * (E+A)%2 == E xor A
  //   (can be proved easily by looking at all 4 possible values for A and E)
  // * proof completed!

  assert(bit(0,z)==(bit(16,x)^bit(16,y)));
}

int main() {
  for (int i=0; i<10000; ++i) {
    test();
  }
}
```

</section>
<%- include ("/_footer.ejs") %>
</body>
</html>
