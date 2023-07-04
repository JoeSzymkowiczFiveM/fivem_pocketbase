## 📝 Usage Examples

Below are several examples of the function to use PocketBase.

## ✔️ Ready function
```lua
PocketBase.ready(function()
    -- put code here that will be executed after the database connects
end)
```

## 📕 Read functions
### PocketBase.getFullList
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param query object, contains the 
local result = PocketBase.getFullList({ collection = "players", query = {filter = 'created > "2022-08-01 10:00:00"'}})
for i=1, #result do -- result is a numerically-ordered table of records from the queried collection, given the query selection criteria. With no query selection criteria, this will return the entire collection.
    print(i, result[i])
end
```

### PocketBase.getOne
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the queries collection
---@param query object, contains the 
local result = PocketBase.getOne({ collection = "players", id = 'pep4715du0k9dcl', query = {}})
for k, v in pairs(result) do -- result is a table of the key-values of the queried record
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
local result = PocketBase.update({ collection = "players", id = 'g78aknqxab695v1', body = {metadata = metadata}, query = {}})
for k, v in pairs(result) do -- result is a table of the key-values of the updated record
    print(k, tostring(v))
    if k == 'metadata' then
        for a, s in pairs(v) do
            print(a, tostring(s))
        end
    end
end
```

## 🗑️ Delete functions
### PocketBase.delete
```lua
---@param collection string, this is the collection name the record that is being updated, belongs to
---@param id string, this is a record id from the
local result = PocketBase.delete({ collection = "players", id = 'ciiuthvkabafupj', query = {}})
print(result) -- result is a bool
```
