local Await = Citizen.Await

PocketBase = {}

function PocketBase.getFullList(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:getFullList(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.update(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:update(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.create(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:create(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.delete(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:delete(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.getOne(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:getOne(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.getFirstListItem(params)
    local p = promise.new()
    local result = exports.fivem_pocketbase:getFirstListItem(params)
    p:resolve(result)
    return Await(p)
end

function PocketBase.ready(cb)
    CreateThread(function()
        while GetResourceState('fivem_pocketbase') ~= 'started' do Wait(100) end
        repeat
            Wait(3000)
        until exports.fivem_pocketbase:isConnected()
        cb()
    end)
end