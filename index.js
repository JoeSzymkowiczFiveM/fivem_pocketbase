const PocketBase = require('pocketbase/cjs');
const fetch = require('cross-fetch');

let isServerConnected = false;
const convars = {};
let missingConvars;

convars.url = GetConvar('pocketbase_url', '').replace(/'/g, "");
convars.email = GetConvar('pocketbase_useremail', '').replace(/'/g, "");
convars.password = GetConvar('pocketbase_password', '').replace(/'/g, "");

let pb = null;

async function connectToDatabase() {
    pb = new PocketBase(convars.url);
    try {
        await pb.admins.authWithPassword(convars.email, convars.password);
        console.log(`[^3PocketBase^7] Connected to database "${convars.url}".`);
        isServerConnected = true
    } catch(err) {
        setTimeout(function() {
            console.log(`[^3PocketBase^7][^1ERROR^7] Failed to connect to ${convars.url}. Retrying connection.`);
            connectToDatabase();
            return;
        }, 5000);
    }
};

function checkDatabaseReady() {
    if (isServerConnected) {
        return true;
    } else {
        console.log(`[^3PocketBase^7][^1ERROR^7] PocketBase is not connected.`);
        return false;
    };
};

function getParamsCollection(params) {
    if (!params.collection) return;
    return pb.collection(params.collection);
};

function safeObjectArgument(object) {
    if (!object) return {};
    if (Array.isArray(object)) {
        if (object.length === 0) return {};
        return object;
    };
    if (typeof object !== "object") return {};
    return object;
};

exports('getFullList', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const options = safeObjectArgument(params.options);
    try {
        
        const result = await collection.getFullList(options);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.getFullList: Error "${err.message}".`);
        return cb ? cb([]) : [];
    };
});

exports('create', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const body = safeObjectArgument(params.body);
    const options = safeObjectArgument(params.options);
    try {
        const result = await collection.create(body, options);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.create: Error "${err.message}".`);
        return cb ? cb(false) : false;
    };
});

exports('update', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const body = safeObjectArgument(params.body);
    const options = safeObjectArgument(params.options);
    const id = safeObjectArgument(params.id);
    try {
        const result = await collection.update(id, body, options);
        return result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.update: Error "${err.message}".`);
        return false;
    };
});

exports('delete', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const options = safeObjectArgument(params.options);
    try {
        const result = await collection.delete(params.id, options);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.delete: Error "${err.message}".`);
        return cb ? cb(false) : false;
    };
});

exports('getOne', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const options = safeObjectArgument(params.options);
    try {
        const result = await collection.getOne(params.id, options);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.getOne: Error "${err.message}".`);
        return cb ? cb(false) : false;
    };
});

exports('getFirstListItem', async (params, cb) => {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const options = safeObjectArgument(params.options);
    try {
        const result = await collection.getFirstListItem(params.filter, options);
        return cb ? cb(result) : result;
    } catch(err) {
        console.log(`[^3PocketBase^7][^1ERROR^7] exports.update: Error "${err.message}".`);
        return cb ? cb(false) : false;
    };
});

exports('isConnected', async () => {
    return !!isServerConnected;
});

for (const [key, value] of Object.entries(convars)) {
    if (value === '') {
        console.log(`[^3PocketBase^7][^1ERROR^7] Convar "pocketbase_${key}" not set (see README)`);
        missingConvars = true;
    };
};

if (!missingConvars) {
    connectToDatabase();
};