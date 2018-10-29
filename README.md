# jsdeflate
Compressor for big/huge javascript files.

Generates a javascript file containing the original file compressed and encoded in base64 with a light bootstrap code that decompresses and evals the original file.

## Why?
We needed to reduce javascript file size to fit into wechat miniprogram restrictions.

## Install
`npm install -g jsdeflate`

## Usage
```
Options:
--input, -i          Uncompressed input file.
--output, -o         Compressed output file.
--nobrowser, -n      Exclude browser bootstrap code.

Usage examples:
jsdeflate -i input_file -o output_file     #Input and output files can be the same. 
jsdeflate input_file > output_file         #Input and output files must not be the same.
jsdeflate -n -i input_file -o output_file  #Output file only works in nodeJS.
```

