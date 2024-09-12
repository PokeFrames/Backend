export class MT19937 {
  static n = 624;
  static m = 397;
  static w = 32;
  static r = 31;
  static UMASK = 0xffffffff << MT19937.r;
  static LMASK = 0xffffffff >>> (MT19937.w - MT19937.r);
  static a = 0x9908b0df;
  static u = 11;
  static s = 7;
  static t = 15;
  static l = 18;
  static b = 0x9d2c5680;
  static c = 0xefc60000;
  static f = 1812433253;

  constructor(seed) {
      this.stateArray = new Array(MT19937.n);
      this.stateIndex = 0;
      this.initializeState(seed);
  }

  initializeState(seed) {
      this.stateArray[0] = seed >>> 0;
      for (let i = 1; i < MT19937.n; i++) {
          seed = MT19937.f * (seed ^ (seed >>> (MT19937.w - 2))) + i;
          this.stateArray[i] = seed >>> 0;
      }
      this.stateIndex = 0;
  }

  randomUint32() {
      const { n, m, UMASK, LMASK, a } = MT19937;
      let k = this.stateIndex;

      let j = k - (n - 1);
      if (j < 0) j += n;

      let x = ((this.stateArray[k] ?? 0) & UMASK) | ((this.stateArray[j] ?? 0) & LMASK);

      let xA = x >>> 1;
      if (x & 0x00000001) xA ^= a;

      j = k - (n - m);
      if (j < 0) j += n;

      x = (this.stateArray[j] ?? 0) ^ xA;
      this.stateArray[k] = x;

      if (++k >= n) k = 0;
      this.stateIndex = k;

      let y = x;
      y ^= (y >>> MT19937.u);
      y ^= (y << MT19937.s) & MT19937.b;
      y ^= (y << MT19937.t) & MT19937.c;
      y ^= (y >>> MT19937.l);

      return y >>> 0;
  }

  randomPokemon(min, max) {
      return min + ((this.randomUint32() % (max - min)) + 1);
  }
}
