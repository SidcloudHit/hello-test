/*
 *  jssha256 version 0.1  -  Copyright 2006 B. Poettering
 *
 *  This program is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU General Public License as
 *  published by the Free Software Foundation; either version 2 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program; if not, write to the Free Software
 *  Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
 *  02111-1307 USA
 */

/*
 * http://point-at-infinity.org/jssha256/
 *
 * This is a JavaScript implementation of the SHA256 secure hash function
 * and the HMAC-SHA256 message authentication code (MAC).
 *
 * The routines' well-functioning has been verified with the test vectors 
 * given in FIPS-180-2, Appendix B and IETF RFC 4231. The HMAC algorithm 
 * conforms to IETF RFC 2104. 
 *
 * The following code example computes the hash value of the string "abc".
 *
 *    SHA256_init();
 *    SHA256_write("abc");
 *    digest = SHA256_finalize();  
 *    digest_hex = array_to_hex_string(digest);
 * 
 * Get the same result by calling the shortcut function SHA256_hash:
 * 
 *    digest_hex = SHA256_hash("abc");
 * 
 * In the following example the calculation of the HMAC of the string "abc" 
 * using the key "secret key" is shown:
 * 
 *    HMAC_SHA256_init("secret key");
 *    HMAC_SHA256_write("abc");
 *    mac = HMAC_SHA256_finalize();
 *    mac_hex = array_to_hex_string(mac);
 *
 * Again, the same can be done more conveniently:
 * 
 *    mac_hex = HMAC_SHA256_MAC("secret key", "abc");
 *
 * Note that the internal state of the hash function is held in global
 * variables. Therefore one hash value calculation has to be completed 
 * before the next is begun. The same applies the the HMAC routines.
 *
 * Report bugs to: jssha256 AT point-at-infinity.org
 *
 */

/******************************************************************************/

/* Two all purpose helper functions follow */

/* string_to_array: convert a string to a character (byte) array */

function string_to_array(str) {
  var len = str.length;
  var res = new Array(len);
  for(var i = 0; i < len; i++)
    res[i] = str.charCodeAt(i);
  return res;
}

/* array_to_hex_string: convert a byte array to a hexadecimal string */

function array_to_hex_string(ary) {
  var res = "";
  for(var i = 0; i < ary.length; i++)
    res += SHA256_hexchars[ary[i] >> 4] + SHA256_hexchars[ary[i] & 0x0f];
  return res;
}

/******************************************************************************/

/* The following are the SHA256 routines */

/* 
   SHA256_init: initialize the internal state of the hash function. Call this
   function before calling the SHA256_write function.
*/

function SHA256_init() {
  SHA256_H = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
  SHA256_buf = new Array();
  SHA256_len = 0;
}

/*
   SHA256_write: add a message fragment to the hash function's internal state. 
   'msg' may be given as string or as byte array and may have arbitrary length.

*/

function SHA256_write(msg) {
  if (typeof(msg) == "string")
    SHA256_buf = SHA256_buf.concat(string_to_array(msg));
  else
    SHA256_buf = SHA256_buf.concat(msg);
  for(var i = 0; i + 64 <= SHA256_buf.length; i += 64)
    SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf.slice(i, i + 64));
  SHA256_buf = SHA256_buf.slice(i);
  SHA256_len += msg.length;
}

/*
   SHA256_finalize: finalize the hash value calculation. Call this function
   after the last call to SHA256_write. An array of 32 bytes (= 256 bits) 
   is returned.
*/

function SHA256_finalize() {
  SHA256_buf[SHA256_buf.length] = 0x80;

  if (SHA256_buf.length > 64 - 8) {
    for(var i = SHA256_buf.length; i < 64; i++)
      SHA256_buf[i] = 0;
    SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);
    SHA256_buf.length = 0;
  }

  for(var i = SHA256_buf.length; i < 64 - 5; i++)
    SHA256_buf[i] = 0;
  SHA256_buf[59] = (SHA256_len >>> 29) & 0xff;
  SHA256_buf[60] = (SHA256_len >>> 21) & 0xff;
  SHA256_buf[61] = (SHA256_len >>> 13) & 0xff;
  SHA256_buf[62] = (SHA256_len >>> 5) & 0xff;
  SHA256_buf[63] = (SHA256_len << 3) & 0xff;
  SHA256_Hash_Byte_Block(SHA256_H, SHA256_buf);

  var res = new Array(32);
  for(var i = 0; i < 8; i++) {
    res[4 * i + 0] = SHA256_H[i] >>> 24;
    res[4 * i + 1] = (SHA256_H[i] >> 16) & 0xff;
    res[4 * i + 2] = (SHA256_H[i] >> 8) & 0xff;
    res[4 * i + 3] = SHA256_H[i] & 0xff;
  }

  delete SHA256_H;
  delete SHA256_buf;
  delete SHA256_len;
  return res;
}

/*
   SHA256_hash: calculate the hash value of the string or byte array 'msg' 
   and return it as hexadecimal string. This shortcut function may be more 
   convenient than calling SHA256_init, SHA256_write, SHA256_finalize 
   and array_to_hex_string explicitly.
*/

function SHA256_hash(msg) {
  var res;
  SHA256_init();
  SHA256_write(msg);
  res = SHA256_finalize();
  return array_to_hex_string(res);
}

/******************************************************************************/

/* The following are the HMAC-SHA256 routines */

/*
   HMAC_SHA256_init: initialize the MAC's internal state. The MAC key 'key'
   may be given as string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_init(key) {
  if (typeof(key) == "string")
    HMAC_SHA256_key = string_to_array(key);
  else
    HMAC_SHA256_key = new Array().concat(key);

  if (HMAC_SHA256_key.length > 64) {
    SHA256_init();
    SHA256_write(HMAC_SHA256_key);
    HMAC_SHA256_key = SHA256_finalize();
  }

  for(var i = HMAC_SHA256_key.length; i < 64; i++)
    HMAC_SHA256_key[i] = 0;
  for(var i = 0; i < 64; i++)
    HMAC_SHA256_key[i] ^=  0x36;
  SHA256_init();
  SHA256_write(HMAC_SHA256_key);
}

/*
   HMAC_SHA256_write: process a message fragment. 'msg' may be given as 
   string or as byte array and may have arbitrary length.
*/

function HMAC_SHA256_write(msg) {
  SHA256_write(msg);
}

/*
   HMAC_SHA256_finalize: finalize the HMAC calculation. An array of 32 bytes
   (= 256 bits) is returned.
*/

function HMAC_SHA256_finalize() {
  var md = SHA256_finalize();
  for(var i = 0; i < 64; i++)
    HMAC_SHA256_key[i] ^= 0x36 ^ 0x5c;
  SHA256_init();
  SHA256_write(HMAC_SHA256_key);
  SHA256_write(md);
  for(var i = 0; i < 64; i++)
    HMAC_SHA256_key[i] = 0;
  delete HMAC_SHA256_key;
  return SHA256_finalize();
}

/*
   HMAC_SHA256_MAC: calculate the HMAC value of message 'msg' under key 'key'
   (both may be of type string or byte array); return the MAC as hexadecimal 
   string. This shortcut function may be more convenient than calling 
   HMAC_SHA256_init, HMAC_SHA256_write, HMAC_SHA256_finalize and 
   array_to_hex_string explicitly.
*/

function HMAC_SHA256_MAC(key, msg) {
  var res;
  HMAC_SHA256_init(key);
  HMAC_SHA256_write(msg);
  res = HMAC_SHA256_finalize();
  return array_to_hex_string(res);
}

/******************************************************************************/

/* The following lookup tables and functions are for internal use only! */

SHA256_hexchars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 
  'a', 'b', 'c', 'd', 'e', 'f');

SHA256_K = new Array(
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 
  0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 
  0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 
  0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 
);

function SHA256_sigma0(x) {
  return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}

function SHA256_sigma1(x) {
  return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}

function SHA256_Sigma0(x) {
  return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ 
    ((x >>> 22) | (x << 10));
}

function SHA256_Sigma1(x) {
  return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ 
    ((x >>> 25) | (x << 7));
}

function SHA256_Ch(x, y, z) {
  return z ^ (x & (y ^ z));
}

function SHA256_Maj(x, y, z) {
  return (x & y) ^ (z & (x ^ y));
}

function SHA256_Hash_Word_Block(H, W) {
  for(var i = 16; i < 64; i++)
    W[i] = (SHA256_sigma1(W[i - 2]) +  W[i - 7] + 
      SHA256_sigma0(W[i - 15]) + W[i - 16]) & 0xffffffff;
  var state = new Array().concat(H);
  for(var i = 0; i < 64; i++) {
    var T1 = state[7] + SHA256_Sigma1(state[4]) + 
      SHA256_Ch(state[4], state[5], state[6]) + SHA256_K[i] + W[i];
    var T2 = SHA256_Sigma0(state[0]) + SHA256_Maj(state[0], state[1], state[2]);
    state.pop();
    state.unshift((T1 + T2) & 0xffffffff);
    state[4] = (state[4] + T1) & 0xffffffff;
  }
  for(var i = 0; i < 8; i++)
    H[i] = (H[i] + state[i]) & 0xffffffff;
}

function SHA256_Hash_Byte_Block(H, w) {
  var W = new Array(16);
  for(var i = 0; i < 16; i++)
    W[i] = w[4 * i + 0] << 24 | w[4 * i + 1] << 16 | 
      w[4 * i + 2] << 8 | w[4 * i + 3];
  SHA256_Hash_Word_Block(H, W);
}


////////////////////////////////////////////////////// another script

//
///**
// * [js-sha256]{@link https://github.com/emn178/js-sha256}
// *
// * @version 0.3.2
// * @author Chen, Yi-Cyuan [emn178@gmail.com]
// * @copyright Chen, Yi-Cyuan 2014-2016
// * @license MIT
// */
//(function (root) {
//  'use strict';
//
//  var NODE_JS = typeof process == 'object' && process.versions && process.versions.node;
//  if (NODE_JS) {
//    root = global;
//  }
//  var COMMON_JS = !root.JS_SHA256_TEST && typeof module == 'object' && module.exports;
//  var HEX_CHARS = '0123456789abcdef'.split('');
//  var EXTRA = [-2147483648, 8388608, 32768, 128];
//  var SHIFT = [24, 16, 8, 0];
//  var K =[0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
//          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
//          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
//          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
//          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
//          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
//          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
//          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
//
//  var blocks = [];
//
//  var sha224 = function (message) {
//    return sha256(message, true);
//  };
//
//  var sha256 = function (message, is224) {
//    var notString = typeof message != 'string';
//    if (notString && message.constructor == root.ArrayBuffer) {
//      message = new Uint8Array(message);
//    }
//
//    var h0, h1, h2, h3, h4, h5, h6, h7, block, code, first = true, end = false,
//        i, j, index = 0, start = 0, bytes = 0, length = message.length,
//        s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
//
//    if (is224) {
//      h0 = 0xc1059ed8;
//      h1 = 0x367cd507;
//      h2 = 0x3070dd17;
//      h3 = 0xf70e5939;
//      h4 = 0xffc00b31;
//      h5 = 0x68581511;
//      h6 = 0x64f98fa7;
//      h7 = 0xbefa4fa4;
//    } else { // 256
//      h0 = 0x6a09e667;
//      h1 = 0xbb67ae85;
//      h2 = 0x3c6ef372;
//      h3 = 0xa54ff53a;
//      h4 = 0x510e527f;
//      h5 = 0x9b05688c;
//      h6 = 0x1f83d9ab;
//      h7 = 0x5be0cd19;
//    }
//    block = 0;
//    do {
//      blocks[0] = block;
//      blocks[16] = blocks[1] = blocks[2] = blocks[3] =
//      blocks[4] = blocks[5] = blocks[6] = blocks[7] =
//      blocks[8] = blocks[9] = blocks[10] = blocks[11] =
//      blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
//      if (notString) {
//        for (i = start;index < length && i < 64;++index) {
//          blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
//        }
//      } else {
//        for (i = start;index < length && i < 64;++index) {
//          code = message.charCodeAt(index);
//          if (code < 0x80) {
//            blocks[i >> 2] |= code << SHIFT[i++ & 3];
//          } else if (code < 0x800) {
//            blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
//          } else if (code < 0xd800 || code >= 0xe000) {
//            blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
//          } else {
//            code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
//            blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
//            blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
//          }
//        }
//      }
//      bytes += i - start;
//      start = i - 64;
//      if (index == length) {
//        blocks[i >> 2] |= EXTRA[i & 3];
//        ++index;
//      }
//      block = blocks[16];
//      if (index > length && i < 56) {
//        blocks[15] = bytes << 3;
//        end = true;
//      }
//
//      var a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;
//      for (j = 16;j < 64;++j) {
//        // rightrotate
//        t1 = blocks[j - 15];
//        s0 = ((t1 >>> 7) | (t1 << 25)) ^ ((t1 >>> 18) | (t1 << 14)) ^ (t1 >>> 3);
//        t1 = blocks[j - 2];
//        s1 = ((t1 >>> 17) | (t1 << 15)) ^ ((t1 >>> 19) | (t1 << 13)) ^ (t1 >>> 10);
//        blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
//      }
//
//      bc = b & c;
//      for (j = 0;j < 64;j += 4) {
//        if (first) {
//          if (is224) {
//            ab = 300032;
//            t1 = blocks[0] - 1413257819;
//            h = t1 - 150054599 << 0;
//            d = t1 + 24177077 << 0;
//          } else {
//            ab = 704751109;
//            t1 = blocks[0] - 210244248;
//            h = t1 - 1521486534 << 0;
//            d = t1 + 143694565 << 0;
//          }
//          first = false;
//        } else {
//          s0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
//          s1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
//          ab = a & b;
//          maj = ab ^ (a & c) ^ bc;
//          ch = (e & f) ^ (~e & g);
//          t1 = h + s1 + ch + K[j] + blocks[j];
//          t2 = s0 + maj;
//          h = d + t1 << 0;
//          d = t1 + t2 << 0;
//        }
//        s0 = ((d >>> 2) | (d << 30)) ^ ((d >>> 13) | (d << 19)) ^ ((d >>> 22) | (d << 10));
//        s1 = ((h >>> 6) | (h << 26)) ^ ((h >>> 11) | (h << 21)) ^ ((h >>> 25) | (h << 7));
//        da = d & a;
//        maj = da ^ (d & b) ^ ab;
//        ch = (h & e) ^ (~h & f);
//        t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
//        t2 = s0 + maj;
//        g = c + t1 << 0;
//        c = t1 + t2 << 0;
//        s0 = ((c >>> 2) | (c << 30)) ^ ((c >>> 13) | (c << 19)) ^ ((c >>> 22) | (c << 10));
//        s1 = ((g >>> 6) | (g << 26)) ^ ((g >>> 11) | (g << 21)) ^ ((g >>> 25) | (g << 7));
//        cd = c & d;
//        maj = cd ^ (c & a) ^ da;
//        ch = (g & h) ^ (~g & e);
//        t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
//        t2 = s0 + maj;
//        f = b + t1 << 0;
//        b = t1 + t2 << 0;
//        s0 = ((b >>> 2) | (b << 30)) ^ ((b >>> 13) | (b << 19)) ^ ((b >>> 22) | (b << 10));
//        s1 = ((f >>> 6) | (f << 26)) ^ ((f >>> 11) | (f << 21)) ^ ((f >>> 25) | (f << 7));
//        bc = b & c;
//        maj = bc ^ (b & d) ^ cd;
//        ch = (f & g) ^ (~f & h);
//        t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
//        t2 = s0 + maj;
//        e = a + t1 << 0;
//        a = t1 + t2 << 0;
//      }
//
//      h0 = h0 + a << 0;
//      h1 = h1 + b << 0;
//      h2 = h2 + c << 0;
//      h3 = h3 + d << 0;
//      h4 = h4 + e << 0;
//      h5 = h5 + f << 0;
//      h6 = h6 + g << 0;
//      h7 = h7 + h << 0;
//    } while (!end);
//
//    var hex = HEX_CHARS[(h0 >> 28) & 0x0F] + HEX_CHARS[(h0 >> 24) & 0x0F] +
//              HEX_CHARS[(h0 >> 20) & 0x0F] + HEX_CHARS[(h0 >> 16) & 0x0F] +
//              HEX_CHARS[(h0 >> 12) & 0x0F] + HEX_CHARS[(h0 >> 8) & 0x0F] +
//              HEX_CHARS[(h0 >> 4) & 0x0F] + HEX_CHARS[h0 & 0x0F] +
//              HEX_CHARS[(h1 >> 28) & 0x0F] + HEX_CHARS[(h1 >> 24) & 0x0F] +
//              HEX_CHARS[(h1 >> 20) & 0x0F] + HEX_CHARS[(h1 >> 16) & 0x0F] +
//              HEX_CHARS[(h1 >> 12) & 0x0F] + HEX_CHARS[(h1 >> 8) & 0x0F] +
//              HEX_CHARS[(h1 >> 4) & 0x0F] + HEX_CHARS[h1 & 0x0F] +
//              HEX_CHARS[(h2 >> 28) & 0x0F] + HEX_CHARS[(h2 >> 24) & 0x0F] +
//              HEX_CHARS[(h2 >> 20) & 0x0F] + HEX_CHARS[(h2 >> 16) & 0x0F] +
//              HEX_CHARS[(h2 >> 12) & 0x0F] + HEX_CHARS[(h2 >> 8) & 0x0F] +
//              HEX_CHARS[(h2 >> 4) & 0x0F] + HEX_CHARS[h2 & 0x0F] +
//              HEX_CHARS[(h3 >> 28) & 0x0F] + HEX_CHARS[(h3 >> 24) & 0x0F] +
//              HEX_CHARS[(h3 >> 20) & 0x0F] + HEX_CHARS[(h3 >> 16) & 0x0F] +
//              HEX_CHARS[(h3 >> 12) & 0x0F] + HEX_CHARS[(h3 >> 8) & 0x0F] +
//              HEX_CHARS[(h3 >> 4) & 0x0F] + HEX_CHARS[h3 & 0x0F] +
//              HEX_CHARS[(h4 >> 28) & 0x0F] + HEX_CHARS[(h4 >> 24) & 0x0F] +
//              HEX_CHARS[(h4 >> 20) & 0x0F] + HEX_CHARS[(h4 >> 16) & 0x0F] +
//              HEX_CHARS[(h4 >> 12) & 0x0F] + HEX_CHARS[(h4 >> 8) & 0x0F] +
//              HEX_CHARS[(h4 >> 4) & 0x0F] + HEX_CHARS[h4 & 0x0F] +
//              HEX_CHARS[(h5 >> 28) & 0x0F] + HEX_CHARS[(h5 >> 24) & 0x0F] +
//              HEX_CHARS[(h5 >> 20) & 0x0F] + HEX_CHARS[(h5 >> 16) & 0x0F] +
//              HEX_CHARS[(h5 >> 12) & 0x0F] + HEX_CHARS[(h5 >> 8) & 0x0F] +
//              HEX_CHARS[(h5 >> 4) & 0x0F] + HEX_CHARS[h5 & 0x0F] +
//              HEX_CHARS[(h6 >> 28) & 0x0F] + HEX_CHARS[(h6 >> 24) & 0x0F] +
//              HEX_CHARS[(h6 >> 20) & 0x0F] + HEX_CHARS[(h6 >> 16) & 0x0F] +
//              HEX_CHARS[(h6 >> 12) & 0x0F] + HEX_CHARS[(h6 >> 8) & 0x0F] +
//              HEX_CHARS[(h6 >> 4) & 0x0F] + HEX_CHARS[h6 & 0x0F];
//    if (!is224) {
//      hex += HEX_CHARS[(h7 >> 28) & 0x0F] + HEX_CHARS[(h7 >> 24) & 0x0F] +
//             HEX_CHARS[(h7 >> 20) & 0x0F] + HEX_CHARS[(h7 >> 16) & 0x0F] +
//             HEX_CHARS[(h7 >> 12) & 0x0F] + HEX_CHARS[(h7 >> 8) & 0x0F] +
//             HEX_CHARS[(h7 >> 4) & 0x0F] + HEX_CHARS[h7 & 0x0F];
//    }
//    return hex;
//  };
//  
//  if (COMMON_JS) {
//    sha256.sha256 = sha256;
//    sha256.sha224 = sha224;
//    module.exports = sha256;
//  } else if (root) {
//    root.sha256 = sha256;
//    root.sha224 = sha224;
//  }
//}(this));