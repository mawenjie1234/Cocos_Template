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
 *    SHA256.init();
 *    SHA256.write("abc");
 *    digest = SHA256.finalize();  
 *    digest_hex = array_to_hex_string(digest);
 * 
 * Get the same result by calling the shortcut function SHA256.hash:
 * 
 *    digest_hex = SHA256.hash("abc");
 * 
 * In the following example the calculation of the HMAC of the string "abc" 
 * using the key "secret key" is shown:
 * 
 *    HMAC_SHA256.init("secret key");
 *    HMAC_SHA256.write("abc");
 *    mac = HMAC_SHA256.finalize();
 *    mac_hex = array_to_hex_string(mac);
 *
 * Again, the same can be done more conveniently:
 * 
 *    mac_hex = HMAC_SHA256.MAC("secret key", "abc");
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


function SHA256() {

}

function HMAC_SHA256() {

}


SHA256.string_to_array = function(str) {
    var len = str.length;
    var res = new Array(len);
    for (var i = 0; i < len; i++)
        res[i] = str.charCodeAt(i);
    return res;
}

/* array_to_hex_string: convert a byte array to a hexadecimal string */

SHA256.array_to_hex_string = function(ary) {
    var res = "";
    for (var i = 0; i < ary.length; i++)
        res += SHA256.hexchars[ary[i] >> 4] + SHA256.hexchars[ary[i] & 0x0f];
    return res;
}

/******************************************************************************/

/* The following are the SHA256 routines */

/* 
   SHA256.init: initialize the internal state of the hash function. Call this
   function before calling the SHA256.write function.
*/

SHA256.init = function() {
    SHA256.H = new Array(0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19);
    SHA256.buf = new Array();
    SHA256.len = 0;
}

/*
   SHA256.write: add a message fragment to the hash function's internal state. 
   'msg' may be given as string or as byte array and may have arbitrary length.

*/

SHA256.write = function(msg) {
    if (typeof(msg) == "string")
        SHA256.buf = SHA256.buf.concat(SHA256.string_to_array(msg));
    else
        SHA256.buf = SHA256.buf.concat(msg);
    for (var i = 0; i + 64 <= SHA256.buf.length; i += 64)
        SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf.slice(i, i + 64));
    SHA256.buf = SHA256.buf.slice(i);
    SHA256.len += msg.length;
}

/*
   SHA256.finalize: finalize the hash value calculation. Call this function
   after the last call to SHA256.write. An array of 32 bytes (= 256 bits) 
   is returned.
*/

SHA256.finalize = function() {
    SHA256.buf[SHA256.buf.length] = 0x80;

    if (SHA256.buf.length > 64 - 8) {
        for (var i = SHA256.buf.length; i < 64; i++)
            SHA256.buf[i] = 0;
        SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf);
        SHA256.buf.length = 0;
    }

    for (var i = SHA256.buf.length; i < 64 - 5; i++)
        SHA256.buf[i] = 0;
    SHA256.buf[59] = (SHA256.len >>> 29) & 0xff;
    SHA256.buf[60] = (SHA256.len >>> 21) & 0xff;
    SHA256.buf[61] = (SHA256.len >>> 13) & 0xff;
    SHA256.buf[62] = (SHA256.len >>> 5) & 0xff;
    SHA256.buf[63] = (SHA256.len << 3) & 0xff;
    SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf);

    var res = new Array(32);
    for (var i = 0; i < 8; i++) {
        res[4 * i + 0] = SHA256.H[i] >>> 24;
        res[4 * i + 1] = (SHA256.H[i] >> 16) & 0xff;
        res[4 * i + 2] = (SHA256.H[i] >> 8) & 0xff;
        res[4 * i + 3] = SHA256.H[i] & 0xff;
    }

    delete SHA256.H;
    delete SHA256.buf;
    delete SHA256.len;
    return res;
}

/*
   SHA256.hash: calculate the hash value of the string or byte array 'msg' 
   and return it as hexadecimal string. This shortcut function may be more 
   convenient than calling SHA256.init, SHA256.write, SHA256.finalize 
   and array_to_hex_string explicitly.
*/

SHA256.hash = function(msg) {
    var res;
    SHA256.init();
    SHA256.write(msg);
    res = SHA256.finalize();
    return SHA256.array_to_hex_string(res);
}

/******************************************************************************/

/* The following are the HMAC-SHA256 routines */

/*
   HMAC_SHA256.init: initialize the MAC's internal state. The MAC key 'key'
   may be given as string or as byte array and may have arbitrary length.
*/

HMAC_SHA256.init = function(key) {
    if (typeof(key) == "string")
        HMAC_SHA256.key = SHA256.string_to_array(key);
    else
        HMAC_SHA256.key = new Array().concat(key);

    if (HMAC_SHA256.key.length > 64) {
        SHA256.init();
        SHA256.write(HMAC_SHA256.key);
        HMAC_SHA256.key = SHA256.finalize();
    }

    for (var i = HMAC_SHA256.key.length; i < 64; i++)
        HMAC_SHA256.key[i] = 0;
    for (var i = 0; i < 64; i++)
        HMAC_SHA256.key[i] ^= 0x36;
    SHA256.init();
    SHA256.write(HMAC_SHA256.key);
}

/*
   HMAC_SHA256.write: process a message fragment. 'msg' may be given as 
   string or as byte array and may have arbitrary length.
*/

HMAC_SHA256.write = function(msg) {
    SHA256.write(msg);
}

/*
   HMAC_SHA256.finalize: finalize the HMAC calculation. An array of 32 bytes
   (= 256 bits) is returned.
*/

HMAC_SHA256.finalize = function() {
    var md = SHA256.finalize();
    for (var i = 0; i < 64; i++)
        HMAC_SHA256.key[i] ^= 0x36 ^ 0x5c;
    SHA256.init();
    SHA256.write(HMAC_SHA256.key);
    SHA256.write(md);
    for (var i = 0; i < 64; i++)
        HMAC_SHA256.key[i] = 0;
    delete HMAC_SHA256.key;
    return SHA256.finalize();
}

/*
   HMAC_SHA256.MAC: calculate the HMAC value of message 'msg' under key 'key'
   (both may be of type string or byte array); return the MAC as hexadecimal 
   string. This shortcut function may be more convenient than calling 
   HMAC_SHA256.init, HMAC_SHA256.write, HMAC_SHA256.finalize and 
   array_to_hex_string explicitly.
*/

HMAC_SHA256.MAC = function(key, msg) {
    var res;
    HMAC_SHA256.init(key);
    HMAC_SHA256.write(msg);
    res = HMAC_SHA256.finalize();
    return SHA256.array_to_hex_string(res);
}

/******************************************************************************/

/* The following lookup tables and functions are for internal use only! */

SHA256.hexchars = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f');

SHA256.K = new Array(
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

SHA256.sigma0 = function(x) {
    return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}

SHA256.sigma1 = function(x) {
    return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}

SHA256.Sigma0 = function(x) {
    return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^
        ((x >>> 22) | (x << 10));
}

SHA256.Sigma1 = function(x) {
    return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^
        ((x >>> 25) | (x << 7));
}

SHA256.Ch = function(x, y, z) {
    return z ^ (x & (y ^ z));
}

SHA256.Maj = function(x, y, z) {
    return (x & y) ^ (z & (x ^ y));
}

SHA256.Hash_Word_Block = function(H, W) {
    for (var i = 16; i < 64; i++)
        W[i] = (SHA256.sigma1(W[i - 2]) + W[i - 7] +
            SHA256.sigma0(W[i - 15]) + W[i - 16]) & 0xffffffff;
    var state = new Array().concat(H);
    for (var i = 0; i < 64; i++) {
        var T1 = state[7] + SHA256.Sigma1(state[4]) +
            SHA256.Ch(state[4], state[5], state[6]) + SHA256.K[i] + W[i];
        var T2 = SHA256.Sigma0(state[0]) + SHA256.Maj(state[0], state[1], state[2]);
        state.pop();
        state.unshift((T1 + T2) & 0xffffffff);
        state[4] = (state[4] + T1) & 0xffffffff;
    }
    for (var i = 0; i < 8; i++)
        H[i] = (H[i] + state[i]) & 0xffffffff;
}

SHA256.Hash_Byte_Block = function(H, w) {
    var W = new Array(16);
    for (var i = 0; i < 16; i++)
        W[i] = w[4 * i + 0] << 24 | w[4 * i + 1] << 16 |
        w[4 * i + 2] << 8 | w[4 * i + 3];
    SHA256.Hash_Word_Block(H, W);
}

module.exports = {
    SHA256: SHA256,
    HMAC_SHA256: HMAC_SHA256
};