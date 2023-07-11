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
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.getFullList({ collection = "players", query = {filter = 'created > "2022-08-01 10:00:00"'}})
if result[1] == nil then return end
for k, v in pairs(result) do -- result is a table of the key-values of the queried records
    print(k, tostring(v))
end
```

### PocketBase.getOne
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the queries collection
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.getOne({ collection = "players", id = 'pep4715du0k9dcl', query = {}})
if result[1] == nil then return end
for k, v in pairs(result[1]) do -- result is a table of the key-values of the queried record
    print(k, tostring(v))
end
```

### PocketBase.getFirstListItem
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param filter string, this is a record id from the queries collection
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.getFirstListItem({ collection = "vehicles", filter = 'model="elegyx"', query = {expand = 'playerid'}} )
if result[1] == nil then return end
for k, v in pairs(result[1]) do
    print(k, tostring(v))
    if k == 'expand' then
        for a, s in pairs(v.playerid) do
            print(k..'.'..a, tostring(s))
        end
    end
end
```

## ✏️ Insert functions
### PocketBase.create
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param body object, this contains the fields being updated, and the new values
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.create({ collection = "vehicles", body = {model = 'elegyx', plate = 'PLEE1233', type = 'automobile', state = 1, playerid = 'g78aknqxab695v1', fuel = 100, mods = {}, status = {}}, query = {}})
if result[1] == nil then return end
for k, v in pairs(result[1]) do
    print(k, tostring(v))
end
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
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.update({ collection = "players", id = 'g78aknqxab695v1', body = {metadata = metadata}, query = {}})
if result[1] == nil then return end
for k, v in pairs(result[1]) do -- result is a table of the key-values of the updated record
    print(k, tostring(v))
    if k == 'metadata' then
        for a, s in pairs(v) do
            print(k..'.'..a, tostring(s))
        end
    end
end
```

## 🗑️ Delete functions
### PocketBase.delete
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the
---@param query object, contains the query parameters for filtering your selection
local result = PocketBase.delete({ collection = "players", id = 'ciiuthvkabafupj', query = {}})
print(result) -- result is a bool
```


## ↔️ Expand functionality
### Expanding relations in Read functions
PocketBase collections allow you to expand record relation fields directly in the returned response without making additional requests by just using the expand `query` parameter. In the example below, `vehicles` has a relationship to `players` via the `playerid`, and will return the associated `players` record in the `expand.playerid` field. More information about PocketBase relations can be found [here](https://pocketbase.io/docs/expanding-relations).

```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the
local result = PocketBase.getFirstListItem({ collection = "vehicles", filter = 'model="elegyx"', query = {expand = 'playerid'}} )
if result[1] == nil then return end
for k, v in pairs(result[1]) do -- result contains the queried vehicle data, and the associated player data in the expand.playerid table
    print(k, tostring(v))
    if k == 'expand' then
        for a, s in pairs(v.playerid) do
            print(k..'.'..a, tostring(s))
        end
    end
end
```
