# fivem_pocketbase

A FiveM resource to communicate with a PocketBase database using [pocketbase](https://www.npmjs.com/package/pocketbase). Get started using PocketBase by downloading the database [here](https://pocketbase.io/docs/). It's an extremely fast, extremely lightweight database that uses SQLite, built with Go, and includes it's own admin web UI.


## ✨ Features

- Several CRUD methods for records-related tasks, with more planned in future releases.
- Simple storage and access of JSON data, without the need to encode/decode.
- Access to related tables via `expand` field, similar to MySQL JOINs.
- Added usage examples.


## 📚 Installation

- Clone this repository to `fivem_pocketbase` in your FiveM `resources` folder.
- Copy `fivem_pocketbase/database.cfg` to your server root directory.
- Add the following lines to your server config:
```
exec "database.cfg"
start fivem_pocketbase
```
- Change `pocketbase_url`, `pocketbase_useremail`, and `pocketbase_password` in `database.cfg`.
- Run `npm install` in `resources/fivem_pocketbase` directory.


## 👀 Usage

- Add the following line to the fxmanifest of the resource you want to use fivem_pocketbase in:
```
server_script '@fivem_pocketbase/lib/PocketBase.lua'
```
- [LUA Usage functions](https://github.com/JoeSzymkowiczFiveM/fivem_pocketbase/blob/main/EXAMPLES.md)
- I have included a couple collections that can be imported in your PocketBase instance, in the `sample_collections.json` file.
- Generate a UML diagram of your database using [PocketBaseUML](https://pocketbase-uml.github.io/).

## 👐 Credit

I enjoyed playing around with the PocketBase database, and wanted to try to create my own lib in FiveM. I used knowledge, code and patterns from the [fivem-mongodb](https://github.com/nbredikhin/fivem-mongodb) resource to develop this. Huge shoutout to the [Overextended](https://github.com/overextended) group for technical discussions and support.


# Discord

[Joe Szymkowicz FiveM Development](https://discord.gg/5vPGxyCB4z)
