## 📝 Usage Examples

Below are several examples of the function to use PocketBase.

## ✔️ Ready function
### PocketBase.ready
```lua
PocketBase.ready(function()
    -- put code here that will be executed after the database connects
end)
```

## 📕 Read functions
### PocketBase.getFullList
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.getFullList({ collection = "players", options = {filter = 'created > "2022-08-01 10:00:00"'}})
if result[1] == nil then return end
print(json.encode(result, {indent=true}))
```

### PocketBase.getOne
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the queries collection
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.getOne({ collection = "players", id = 'pep4715du0k9dcl', options = {}})
if result then return end
print(json.encode(result, {indent=true}))
```

### PocketBase.getFirstListItem
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param filter string, this is a record id from the queries collection
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.getFirstListItem({ collection = "vehicles", filter = 'model="elegyx"', options = {expand = 'playerid'}} )
if result then return end
print(json.encode(result, {indent=true}))
```

## ✏️ Insert functions
### PocketBase.create
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param body object, this contains the fields being updated, and the new values
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.create({ collection = "vehicles", body = {model = 'elegyx', plate = 'PLEE1233', type = 'automobile', state = 1, playerid = 'g78aknqxab695v1', fuel = 100, mods = {}, status = {}}, options = {}})
if result then return end
print(json.encode(result, {indent=true}))
```

## ✏️ Update functions
### PocketBase.update
```lua
local metadata = {
    injail = false,
    ishandcuffed = false,
    armor = 0,
    hunger = 30.0,
    stress = 0,
}
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the queries collection
---@param body object, this contains the fields being updated, and the new values
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.update({ collection = "players", id = 'g78aknqxab695v1', body = {metadata = metadata}, options = {}})
if result == nil then return end
print(json.encode(result, {indent=true}))
```

## 🗑️ Delete functions
### PocketBase.delete
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the
---@param options object, contains the options parameters for filtering your selection
local result = PocketBase.delete({ collection = "players", id = 'ciiuthvkabafupj', options = {}})
print(result) -- result is a bool
```


## ↔️ Expand functionality
### Expanding relations in Read functions
PocketBase collections allow you to expand record relation fields directly in the returned response without making additional requests by just using the expand `
` parameter. In the example below, `vehicles` has a relationship to `players` via the `playerid`, and will return the associated `players` record in the `expand.playerid` field. More information about PocketBase relations can be found [here](https://pocketbase.io/docs/expanding-relations).

```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the
local result = PocketBase.getFirstListItem({ collection = "vehicles", filter = 'model="elegyx"', options = {expand = 'playerid'}} )
if result then return end
print(json.encode(result, {indent=true}))
```
