# jsdeflate
Compressor for big/huge javascript files.

Generates a javascript file containing the original file compressed and encoded in base64 with a light bootstrap code that decompresses and evals the original file.

## Why?
We needed to reduce javascript file size to fit into wechat miniprogram restrictions.

## Install
`npm install -g jsdeflate`

## Usage
`jsdeflate -i input_file -o output_file`

