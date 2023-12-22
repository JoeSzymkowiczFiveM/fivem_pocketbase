local PocketBase = {}
local pocketbase = exports.fivem_pocketbase

setmetatable(PocketBase, {
    __index = function(self, method)
        self[method] = setmetatable({}, {
            __call = function(...)
                return pocketbase[method](...)
            end,
            __index = function(_, key)
                if (method == "Async") then
                    return function(params, cb)
                        return pocketbase[key](pocketbase, params, cb)
                    end
                end
            end
        })
        return self[method]
    end
})

local function onReady(cb)
	while GetResourceState('fivem_pocketbase') ~= 'started' do
		Wait(50)
	end

	repeat
        Wait(5)
    until pocketbase:isConnected()
    cb()
end

PocketBase.ready = setmetatable({
	await = onReady
}, {
	__call = function(_, cb)
		Citizen.CreateThreadNow(function() onReady(cb) end)
	end,
})

_ENV.PocketBase = PocketBase