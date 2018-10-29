#!/usr/bin/env node

const fs = require('fs');
const zlib = require('zlib');
const commandLineArgs = require('command-line-args')


const base64Code = `KGZ1bmN0aW9uKHIpe2lmKHR5cGVvZiBleHBvcnRzPT09Im9iamVjdCImJnR5cGVvZiBtb2R1bGUh
PT0idW5kZWZpbmVkIil7bW9kdWxlLmV4cG9ydHM9cigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09
PSJmdW5jdGlvbiImJmRlZmluZS5hbWQpe2RlZmluZShbXSxyKX1lbHNle3ZhciBlO2lmKHR5cGVv
ZiB3aW5kb3chPT0idW5kZWZpbmVkIil7ZT13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09
InVuZGVmaW5lZCIpe2U9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT0idW5kZWZpbmVkIil7
ZT1zZWxmfWVsc2V7ZT10aGlzfWUuYmFzZTY0anM9cigpfX0pKGZ1bmN0aW9uKCl7dmFyIHIsZSxu
O3JldHVybiBmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oZixpKXtpZigh
bltmXSl7aWYoIWVbZl0pe3ZhciB1PSJmdW5jdGlvbiI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJl
O2lmKCFpJiZ1KXJldHVybiB1KGYsITApO2lmKGEpcmV0dXJuIGEoZiwhMCk7dmFyIHY9bmV3IEVy
cm9yKCJDYW5ub3QgZmluZCBtb2R1bGUgJyIrZisiJyIpO3Rocm93IHYuY29kZT0iTU9EVUxFX05P
VF9GT1VORCIsdn12YXIgZD1uW2ZdPXtleHBvcnRzOnt9fTtlW2ZdWzBdLmNhbGwoZC5leHBvcnRz
LGZ1bmN0aW9uKHIpe3ZhciBuPWVbZl1bMV1bcl07cmV0dXJuIG8obnx8cil9LGQsZC5leHBvcnRz
LHIsZSxuLHQpfXJldHVybiBuW2ZdLmV4cG9ydHN9Zm9yKHZhciBhPSJmdW5jdGlvbiI9PXR5cGVv
ZiByZXF1aXJlJiZyZXF1aXJlLGY9MDtmPHQubGVuZ3RoO2YrKylvKHRbZl0pO3JldHVybiBvfXJl
dHVybiByfSgpKHsiLyI6W2Z1bmN0aW9uKHIsZSxuKXsidXNlIHN0cmljdCI7bi5ieXRlTGVuZ3Ro
PWQ7bi50b0J5dGVBcnJheT1oO24uZnJvbUJ5dGVBcnJheT1wO3ZhciB0PVtdO3ZhciBvPVtdO3Zh
ciBhPXR5cGVvZiBVaW50OEFycmF5IT09InVuZGVmaW5lZCI/VWludDhBcnJheTpBcnJheTt2YXIg
Zj0iQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAx
MjM0NTY3ODkrLyI7Zm9yKHZhciBpPTAsdT1mLmxlbmd0aDtpPHU7KytpKXt0W2ldPWZbaV07b1tm
LmNoYXJDb2RlQXQoaSldPWl9b1siLSIuY2hhckNvZGVBdCgwKV09NjI7b1siXyIuY2hhckNvZGVB
dCgwKV09NjM7ZnVuY3Rpb24gdihyKXt2YXIgZT1yLmxlbmd0aDtpZihlJTQ+MCl7dGhyb3cgbmV3
IEVycm9yKCJJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Iil9
dmFyIG49ci5pbmRleE9mKCI9Iik7aWYobj09PS0xKW49ZTt2YXIgdD1uPT09ZT8wOjQtbiU0O3Jl
dHVybltuLHRdfWZ1bmN0aW9uIGQocil7dmFyIGU9dihyKTt2YXIgbj1lWzBdO3ZhciB0PWVbMV07
cmV0dXJuKG4rdCkqMy80LXR9ZnVuY3Rpb24gYyhyLGUsbil7cmV0dXJuKGUrbikqMy80LW59ZnVu
Y3Rpb24gaChyKXt2YXIgZTt2YXIgbj12KHIpO3ZhciB0PW5bMF07dmFyIGY9blsxXTt2YXIgaT1u
ZXcgYShjKHIsdCxmKSk7dmFyIHU9MDt2YXIgZD1mPjA/dC00OnQ7Zm9yKHZhciBoPTA7aDxkO2gr
PTQpe2U9b1tyLmNoYXJDb2RlQXQoaCldPDwxOHxvW3IuY2hhckNvZGVBdChoKzEpXTw8MTJ8b1ty
LmNoYXJDb2RlQXQoaCsyKV08PDZ8b1tyLmNoYXJDb2RlQXQoaCszKV07aVt1KytdPWU+PjE2JjI1
NTtpW3UrK109ZT4+OCYyNTU7aVt1KytdPWUmMjU1fWlmKGY9PT0yKXtlPW9bci5jaGFyQ29kZUF0
KGgpXTw8MnxvW3IuY2hhckNvZGVBdChoKzEpXT4+NDtpW3UrK109ZSYyNTV9aWYoZj09PTEpe2U9
b1tyLmNoYXJDb2RlQXQoaCldPDwxMHxvW3IuY2hhckNvZGVBdChoKzEpXTw8NHxvW3IuY2hhckNv
ZGVBdChoKzIpXT4+MjtpW3UrK109ZT4+OCYyNTU7aVt1KytdPWUmMjU1fXJldHVybiBpfWZ1bmN0
aW9uIHMocil7cmV0dXJuIHRbcj4+MTgmNjNdK3Rbcj4+MTImNjNdK3Rbcj4+NiY2M10rdFtyJjYz
XX1mdW5jdGlvbiBsKHIsZSxuKXt2YXIgdDt2YXIgbz1bXTtmb3IodmFyIGE9ZTthPG47YSs9Myl7
dD0oclthXTw8MTYmMTY3MTE2ODApKyhyW2ErMV08PDgmNjUyODApKyhyW2ErMl0mMjU1KTtvLnB1
c2gocyh0KSl9cmV0dXJuIG8uam9pbigiIil9ZnVuY3Rpb24gcChyKXt2YXIgZTt2YXIgbj1yLmxl
bmd0aDt2YXIgbz1uJTM7dmFyIGE9W107dmFyIGY9MTYzODM7Zm9yKHZhciBpPTAsdT1uLW87aTx1
O2krPWYpe2EucHVzaChsKHIsaSxpK2Y+dT91OmkrZikpfWlmKG89PT0xKXtlPXJbbi0xXTthLnB1
c2godFtlPj4yXSt0W2U8PDQmNjNdKyI9PSIpfWVsc2UgaWYobz09PTIpe2U9KHJbbi0yXTw8OCkr
cltuLTFdO2EucHVzaCh0W2U+PjEwXSt0W2U+PjQmNjNdK3RbZTw8MiY2M10rIj0iKX1yZXR1cm4g
YS5qb2luKCIiKX19LHt9XX0se30sW10pKCIvIil9KTsK`

const inflateCode = `LyoqIEBsaWNlbnNlIHpsaWIuanMgMjAxMiAtIGltYXlhIFsgaHR0cHM6Ly9naXRodWIuY29tL2lt
YXlhL3psaWIuanMgXSBUaGUgTUlUIExpY2Vuc2UgKi8oZnVuY3Rpb24oKSB7J3VzZSBzdHJpY3Qn
O3ZhciBrPXZvaWQgMCxhYT10aGlzO2Z1bmN0aW9uIHIoYyxkKXt2YXIgYT1jLnNwbGl0KCIuIiks
Yj1hYTshKGFbMF1pbiBiKSYmYi5leGVjU2NyaXB0JiZiLmV4ZWNTY3JpcHQoInZhciAiK2FbMF0p
O2Zvcih2YXIgZTthLmxlbmd0aCYmKGU9YS5zaGlmdCgpKTspIWEubGVuZ3RoJiZkIT09az9iW2Vd
PWQ6Yj1iW2VdP2JbZV06YltlXT17fX07dmFyIHQ9InVuZGVmaW5lZCIhPT10eXBlb2YgVWludDhB
cnJheSYmInVuZGVmaW5lZCIhPT10eXBlb2YgVWludDE2QXJyYXkmJiJ1bmRlZmluZWQiIT09dHlw
ZW9mIFVpbnQzMkFycmF5JiYidW5kZWZpbmVkIiE9PXR5cGVvZiBEYXRhVmlldztmdW5jdGlvbiB1
KGMpe3ZhciBkPWMubGVuZ3RoLGE9MCxiPU51bWJlci5QT1NJVElWRV9JTkZJTklUWSxlLGYsZyxo
LGwsbixtLHAscyx4O2ZvcihwPTA7cDxkOysrcCljW3BdPmEmJihhPWNbcF0pLGNbcF08YiYmKGI9
Y1twXSk7ZT0xPDxhO2Y9bmV3ICh0P1VpbnQzMkFycmF5OkFycmF5KShlKTtnPTE7aD0wO2Zvcihs
PTI7Zzw9YTspe2ZvcihwPTA7cDxkOysrcClpZihjW3BdPT09Zyl7bj0wO209aDtmb3Iocz0wO3M8
ZzsrK3Mpbj1uPDwxfG0mMSxtPj49MTt4PWc8PDE2fHA7Zm9yKHM9bjtzPGU7cys9bClmW3NdPXg7
KytofSsrZztoPDw9MTtsPDw9MX1yZXR1cm5bZixhLGJdfTtmdW5jdGlvbiB3KGMsZCl7dGhpcy5n
PVtdO3RoaXMuaD0zMjc2ODt0aGlzLmM9dGhpcy5mPXRoaXMuZD10aGlzLms9MDt0aGlzLmlucHV0
PXQ/bmV3IFVpbnQ4QXJyYXkoYyk6Yzt0aGlzLmw9ITE7dGhpcy5pPXk7dGhpcy5wPSExO2lmKGR8
fCEoZD17fSkpZC5pbmRleCYmKHRoaXMuZD1kLmluZGV4KSxkLmJ1ZmZlclNpemUmJih0aGlzLmg9
ZC5idWZmZXJTaXplKSxkLmJ1ZmZlclR5cGUmJih0aGlzLmk9ZC5idWZmZXJUeXBlKSxkLnJlc2l6
ZSYmKHRoaXMucD1kLnJlc2l6ZSk7c3dpdGNoKHRoaXMuaSl7Y2FzZSBBOnRoaXMuYT0zMjc2ODt0
aGlzLmI9bmV3ICh0P1VpbnQ4QXJyYXk6QXJyYXkpKDMyNzY4K3RoaXMuaCsyNTgpO2JyZWFrO2Nh
c2UgeTp0aGlzLmE9MDt0aGlzLmI9bmV3ICh0P1VpbnQ4QXJyYXk6QXJyYXkpKHRoaXMuaCk7dGhp
cy5lPXRoaXMudTt0aGlzLm09dGhpcy5yO3RoaXMuaj10aGlzLnM7YnJlYWs7ZGVmYXVsdDp0aHJv
dyBFcnJvcigiaW52YWxpZCBpbmZsYXRlIG1vZGUiKTsKfX12YXIgQT0wLHk9MTsKdy5wcm90b3R5
cGUudD1mdW5jdGlvbigpe2Zvcig7IXRoaXMubDspe3ZhciBjPUIodGhpcywzKTtjJjEmJih0aGlz
Lmw9ITApO2M+Pj49MTtzd2l0Y2goYyl7Y2FzZSAwOnZhciBkPXRoaXMuaW5wdXQsYT10aGlzLmQs
Yj10aGlzLmIsZT10aGlzLmEsZj1kLmxlbmd0aCxnPWssaD1rLGw9Yi5sZW5ndGgsbj1rO3RoaXMu
Yz10aGlzLmY9MDtpZihhKzE+PWYpdGhyb3cgRXJyb3IoImludmFsaWQgdW5jb21wcmVzc2VkIGJs
b2NrIGhlYWRlcjogTEVOIik7Zz1kW2ErK118ZFthKytdPDw4O2lmKGErMT49Zil0aHJvdyBFcnJv
cigiaW52YWxpZCB1bmNvbXByZXNzZWQgYmxvY2sgaGVhZGVyOiBOTEVOIik7aD1kW2ErK118ZFth
KytdPDw4O2lmKGc9PT1+aCl0aHJvdyBFcnJvcigiaW52YWxpZCB1bmNvbXByZXNzZWQgYmxvY2sg
aGVhZGVyOiBsZW5ndGggdmVyaWZ5Iik7aWYoYStnPmQubGVuZ3RoKXRocm93IEVycm9yKCJpbnB1
dCBidWZmZXIgaXMgYnJva2VuIik7c3dpdGNoKHRoaXMuaSl7Y2FzZSBBOmZvcig7ZStnPgpiLmxl
bmd0aDspe249bC1lO2ctPW47aWYodCliLnNldChkLnN1YmFycmF5KGEsYStuKSxlKSxlKz1uLGEr
PW47ZWxzZSBmb3IoO24tLTspYltlKytdPWRbYSsrXTt0aGlzLmE9ZTtiPXRoaXMuZSgpO2U9dGhp
cy5hfWJyZWFrO2Nhc2UgeTpmb3IoO2UrZz5iLmxlbmd0aDspYj10aGlzLmUoe286Mn0pO2JyZWFr
O2RlZmF1bHQ6dGhyb3cgRXJyb3IoImludmFsaWQgaW5mbGF0ZSBtb2RlIik7fWlmKHQpYi5zZXQo
ZC5zdWJhcnJheShhLGErZyksZSksZSs9ZyxhKz1nO2Vsc2UgZm9yKDtnLS07KWJbZSsrXT1kW2Er
K107dGhpcy5kPWE7dGhpcy5hPWU7dGhpcy5iPWI7YnJlYWs7Y2FzZSAxOnRoaXMuaihiYSxjYSk7
YnJlYWs7Y2FzZSAyOmZvcih2YXIgbT1CKHRoaXMsNSkrMjU3LHA9Qih0aGlzLDUpKzEscz1CKHRo
aXMsNCkrNCx4PW5ldyAodD9VaW50OEFycmF5OkFycmF5KShDLmxlbmd0aCksUT1rLFI9ayxTPWss
dj1rLE09ayxGPWssej1rLHE9ayxUPWsscT0wO3E8czsrK3EpeFtDW3FdXT0KQih0aGlzLDMpO2lm
KCF0KXtxPXM7Zm9yKHM9eC5sZW5ndGg7cTxzOysrcSl4W0NbcV1dPTB9UT11KHgpO3Y9bmV3ICh0
P1VpbnQ4QXJyYXk6QXJyYXkpKG0rcCk7cT0wO2ZvcihUPW0rcDtxPFQ7KXN3aXRjaChNPUQodGhp
cyxRKSxNKXtjYXNlIDE2OmZvcih6PTMrQih0aGlzLDIpO3otLTspdltxKytdPUY7YnJlYWs7Y2Fz
ZSAxNzpmb3Ioej0zK0IodGhpcywzKTt6LS07KXZbcSsrXT0wO0Y9MDticmVhaztjYXNlIDE4OmZv
cih6PTExK0IodGhpcyw3KTt6LS07KXZbcSsrXT0wO0Y9MDticmVhaztkZWZhdWx0OkY9dltxKytd
PU19Uj10P3Uodi5zdWJhcnJheSgwLG0pKTp1KHYuc2xpY2UoMCxtKSk7Uz10P3Uodi5zdWJhcnJh
eShtKSk6dSh2LnNsaWNlKG0pKTt0aGlzLmooUixTKTticmVhaztkZWZhdWx0OnRocm93IEVycm9y
KCJ1bmtub3duIEJUWVBFOiAiK2MpO319cmV0dXJuIHRoaXMubSgpfTsKdmFyIEU9WzE2LDE3LDE4
LDAsOCw3LDksNiwxMCw1LDExLDQsMTIsMywxMywyLDE0LDEsMTVdLEM9dD9uZXcgVWludDE2QXJy
YXkoRSk6RSxHPVszLDQsNSw2LDcsOCw5LDEwLDExLDEzLDE1LDE3LDE5LDIzLDI3LDMxLDM1LDQz
LDUxLDU5LDY3LDgzLDk5LDExNSwxMzEsMTYzLDE5NSwyMjcsMjU4LDI1OCwyNThdLEg9dD9uZXcg
VWludDE2QXJyYXkoRyk6RyxJPVswLDAsMCwwLDAsMCwwLDAsMSwxLDEsMSwyLDIsMiwyLDMsMywz
LDMsNCw0LDQsNCw1LDUsNSw1LDAsMCwwXSxKPXQ/bmV3IFVpbnQ4QXJyYXkoSSk6SSxLPVsxLDIs
Myw0LDUsNyw5LDEzLDE3LDI1LDMzLDQ5LDY1LDk3LDEyOSwxOTMsMjU3LDM4NSw1MTMsNzY5LDEw
MjUsMTUzNywyMDQ5LDMwNzMsNDA5Nyw2MTQ1LDgxOTMsMTIyODksMTYzODUsMjQ1NzddLEw9dD9u
ZXcgVWludDE2QXJyYXkoSyk6SyxOPVswLDAsMCwwLDEsMSwyLDIsMywzLDQsNCw1LDUsNiw2LDcs
Nyw4LDgsOSw5LDEwLDEwLDExLDExLDEyLDEyLDEzLAoxM10sTz10P25ldyBVaW50OEFycmF5KE4p
Ok4sUD1uZXcgKHQ/VWludDhBcnJheTpBcnJheSkoMjg4KSxVLGRhO1U9MDtmb3IoZGE9UC5sZW5n
dGg7VTxkYTsrK1UpUFtVXT0xNDM+PVU/ODoyNTU+PVU/OToyNzk+PVU/Nzo4O3ZhciBiYT11KFAp
LFY9bmV3ICh0P1VpbnQ4QXJyYXk6QXJyYXkpKDMwKSxXLGVhO1c9MDtmb3IoZWE9Vi5sZW5ndGg7
VzxlYTsrK1cpVltXXT01O3ZhciBjYT11KFYpO2Z1bmN0aW9uIEIoYyxkKXtmb3IodmFyIGE9Yy5m
LGI9Yy5jLGU9Yy5pbnB1dCxmPWMuZCxnPWUubGVuZ3RoLGg7YjxkOyl7aWYoZj49Zyl0aHJvdyBF
cnJvcigiaW5wdXQgYnVmZmVyIGlzIGJyb2tlbiIpO2F8PWVbZisrXTw8YjtiKz04fWg9YSYoMTw8
ZCktMTtjLmY9YT4+PmQ7Yy5jPWItZDtjLmQ9ZjtyZXR1cm4gaH0KZnVuY3Rpb24gRChjLGQpe2Zv
cih2YXIgYT1jLmYsYj1jLmMsZT1jLmlucHV0LGY9Yy5kLGc9ZS5sZW5ndGgsaD1kWzBdLGw9ZFsx
XSxuLG07YjxsJiYhKGY+PWcpOylhfD1lW2YrK108PGIsYis9ODtuPWhbYSYoMTw8bCktMV07bT1u
Pj4+MTY7aWYobT5iKXRocm93IEVycm9yKCJpbnZhbGlkIGNvZGUgbGVuZ3RoOiAiK20pO2MuZj1h
Pj5tO2MuYz1iLW07Yy5kPWY7cmV0dXJuIG4mNjU1MzV9CncucHJvdG90eXBlLmo9ZnVuY3Rpb24o
YyxkKXt2YXIgYT10aGlzLmIsYj10aGlzLmE7dGhpcy5uPWM7Zm9yKHZhciBlPWEubGVuZ3RoLTI1
OCxmLGcsaCxsOzI1NiE9PShmPUQodGhpcyxjKSk7KWlmKDI1Nj5mKWI+PWUmJih0aGlzLmE9Yixh
PXRoaXMuZSgpLGI9dGhpcy5hKSxhW2IrK109ZjtlbHNle2c9Zi0yNTc7bD1IW2ddOzA8SltnXSYm
KGwrPUIodGhpcyxKW2ddKSk7Zj1EKHRoaXMsZCk7aD1MW2ZdOzA8T1tmXSYmKGgrPUIodGhpcyxP
W2ZdKSk7Yj49ZSYmKHRoaXMuYT1iLGE9dGhpcy5lKCksYj10aGlzLmEpO2Zvcig7bC0tOylhW2Jd
PWFbYisrLWhdfWZvcig7ODw9dGhpcy5jOyl0aGlzLmMtPTgsdGhpcy5kLS07dGhpcy5hPWJ9Owp3
LnByb3RvdHlwZS5zPWZ1bmN0aW9uKGMsZCl7dmFyIGE9dGhpcy5iLGI9dGhpcy5hO3RoaXMubj1j
O2Zvcih2YXIgZT1hLmxlbmd0aCxmLGcsaCxsOzI1NiE9PShmPUQodGhpcyxjKSk7KWlmKDI1Nj5m
KWI+PWUmJihhPXRoaXMuZSgpLGU9YS5sZW5ndGgpLGFbYisrXT1mO2Vsc2V7Zz1mLTI1NztsPUhb
Z107MDxKW2ddJiYobCs9Qih0aGlzLEpbZ10pKTtmPUQodGhpcyxkKTtoPUxbZl07MDxPW2ZdJiYo
aCs9Qih0aGlzLE9bZl0pKTtiK2w+ZSYmKGE9dGhpcy5lKCksZT1hLmxlbmd0aCk7Zm9yKDtsLS07
KWFbYl09YVtiKystaF19Zm9yKDs4PD10aGlzLmM7KXRoaXMuYy09OCx0aGlzLmQtLTt0aGlzLmE9
Yn07CncucHJvdG90eXBlLmU9ZnVuY3Rpb24oKXt2YXIgYz1uZXcgKHQ/VWludDhBcnJheTpBcnJh
eSkodGhpcy5hLTMyNzY4KSxkPXRoaXMuYS0zMjc2OCxhLGIsZT10aGlzLmI7aWYodCljLnNldChl
LnN1YmFycmF5KDMyNzY4LGMubGVuZ3RoKSk7ZWxzZXthPTA7Zm9yKGI9Yy5sZW5ndGg7YTxiOysr
YSljW2FdPWVbYSszMjc2OF19dGhpcy5nLnB1c2goYyk7dGhpcy5rKz1jLmxlbmd0aDtpZih0KWUu
c2V0KGUuc3ViYXJyYXkoZCxkKzMyNzY4KSk7ZWxzZSBmb3IoYT0wOzMyNzY4PmE7KythKWVbYV09
ZVtkK2FdO3RoaXMuYT0zMjc2ODtyZXR1cm4gZX07CncucHJvdG90eXBlLnU9ZnVuY3Rpb24oYyl7
dmFyIGQsYT10aGlzLmlucHV0Lmxlbmd0aC90aGlzLmQrMXwwLGIsZSxmLGc9dGhpcy5pbnB1dCxo
PXRoaXMuYjtjJiYoIm51bWJlciI9PT10eXBlb2YgYy5vJiYoYT1jLm8pLCJudW1iZXIiPT09dHlw
ZW9mIGMucSYmKGErPWMucSkpOzI+YT8oYj0oZy5sZW5ndGgtdGhpcy5kKS90aGlzLm5bMl0sZj0y
NTgqKGIvMil8MCxlPWY8aC5sZW5ndGg/aC5sZW5ndGgrZjpoLmxlbmd0aDw8MSk6ZT1oLmxlbmd0
aCphO3Q/KGQ9bmV3IFVpbnQ4QXJyYXkoZSksZC5zZXQoaCkpOmQ9aDtyZXR1cm4gdGhpcy5iPWR9
Owp3LnByb3RvdHlwZS5tPWZ1bmN0aW9uKCl7dmFyIGM9MCxkPXRoaXMuYixhPXRoaXMuZyxiLGU9
bmV3ICh0P1VpbnQ4QXJyYXk6QXJyYXkpKHRoaXMuaysodGhpcy5hLTMyNzY4KSksZixnLGgsbDtp
ZigwPT09YS5sZW5ndGgpcmV0dXJuIHQ/dGhpcy5iLnN1YmFycmF5KDMyNzY4LHRoaXMuYSk6dGhp
cy5iLnNsaWNlKDMyNzY4LHRoaXMuYSk7Zj0wO2ZvcihnPWEubGVuZ3RoO2Y8ZzsrK2Ype2I9YVtm
XTtoPTA7Zm9yKGw9Yi5sZW5ndGg7aDxsOysraCllW2MrK109YltoXX1mPTMyNzY4O2ZvcihnPXRo
aXMuYTtmPGc7KytmKWVbYysrXT1kW2ZdO3RoaXMuZz1bXTtyZXR1cm4gdGhpcy5idWZmZXI9ZX07
CncucHJvdG90eXBlLnI9ZnVuY3Rpb24oKXt2YXIgYyxkPXRoaXMuYTt0P3RoaXMucD8oYz1uZXcg
VWludDhBcnJheShkKSxjLnNldCh0aGlzLmIuc3ViYXJyYXkoMCxkKSkpOmM9dGhpcy5iLnN1YmFy
cmF5KDAsZCk6KHRoaXMuYi5sZW5ndGg+ZCYmKHRoaXMuYi5sZW5ndGg9ZCksYz10aGlzLmIpO3Jl
dHVybiB0aGlzLmJ1ZmZlcj1jfTtyKCJabGliLlJhd0luZmxhdGUiLHcpO3IoIlpsaWIuUmF3SW5m
bGF0ZS5wcm90b3R5cGUuZGVjb21wcmVzcyIsdy5wcm90b3R5cGUudCk7dmFyIFg9e0FEQVBUSVZF
OnksQkxPQ0s6QX0sWSxaLCQsZmE7aWYoT2JqZWN0LmtleXMpWT1PYmplY3Qua2V5cyhYKTtlbHNl
IGZvcihaIGluIFk9W10sJD0wLFgpWVskKytdPVo7JD0wO2ZvcihmYT1ZLmxlbmd0aDskPGZhOysr
JClaPVlbJF0scigiWmxpYi5SYXdJbmZsYXRlLkJ1ZmZlclR5cGUuIitaLFhbWl0pO30pLmNhbGwo
dGhpcyk7Cg==`

const helpString = `
Options:
--input, -i          Uncompressed input file.
--output, -o         Compressed output file.
--nobrowser, -n      Exclude browser bootstrap code.

Usage examples:
jsdeflate -i input_file -o output_file     #Input and output files can be the same. 
jsdeflate input_file > output_file         #Input and output files must not be the same.
jsdeflate -n -i input_file -o output_file  #Output file only works in nodeJS.
`

const printHelp = ()=>{
    console.log(helpString);
}

const b64ToString = (b64Str)=>{
    return Buffer.from(b64Str, 'base64').toString('utf-8');
}

const main = ()=>{
    const optionDefinitions = [
        { name: 'input', alias: 'i', type: String, defaultOption: true },
        { name: 'output', alias: "o", type: String, defaultValue: "-"},
        { name: 'nobrowser', alias: "n", type: Boolean, defaultValue: false},
        { name: 'help', alias: "h", type: Boolean, defaultValue: false}
    ];
    try {
        let options = commandLineArgs(optionDefinitions)
        if (options.help){
            printHelp();
            process.exit(0);
        }
        if (options.input === undefined) {
            throw(new Error("Input file not specified"));
        }
        let sourceBuffer = fs.readFileSync(options.input);
        let sourceText = sourceBuffer.toString('utf-8');
        let sourcePrefix = '';
        if (sourceText.startsWith('#!')){
            let sourceLines = sourceText.split('\n');
            sourcePrefix = sourceLines[0]+'\n';
            sourceBuffer = Buffer.from(sourceLines.slice(1).join('\n'), 'utf-8');
            options.nobrowser = true; 
        }
        let sourceEncoded = Buffer.from(zlib.deflateRawSync(sourceBuffer, {level: zlib.constants.Z_BEST_COMPRESSION})).toString("base64");
        let output = 
`${sourcePrefix}/* Compressed with jsdeflate [https://github.com/jaracil/jsdeflate.git] */
${options.nobrowser ? "" : b64ToString(base64Code)+'\n'+b64ToString(inflateCode)}
jsSource = '${sourceEncoded}'
if ((typeof process !== 'undefined') && (process.release.name === 'node')){
    eval(Buffer.from((require('zlib').inflateRawSync(Buffer.from(jsSource, 'base64')))).toString('utf-8'));
} else {
    eval(new TextDecoder("utf-8").decode(new Zlib.RawInflate(base64js.toByteArray(jsSource)).decompress()));
}
delete jsSource;
`
        if (options.output === '-'){
            console.log(output);
        } else {
            fs.writeFileSync(options.output, output, {encoding:'utf8', flag:'w'});
        }
    } catch (err){
        console.error(err.message);
        printHelp();
        process.exit(1);
    }
} 

main();
