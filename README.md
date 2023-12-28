# ChristianHain.com

This repo contains the source code for my 
[personal website](https://christianhain.com).

## Prerequisites
This repo uses `yarn` to and `gulp` to manage deployment.

## How to deploy

1. Download the source code
2. Install dependencies
    ```shell
   $ yarn
    ```
3. Build the files to be hosted
   ```shell
   $ yarn build
    ```
4. Copy the contents of `/public` to the server

## Development Notes
1. Any assets that should not be stored in Git are hosted at 
   `https://assets.christianhain.com`
2. CSS and JS files are manually cache-busted