const PocketBase = require('pocketbase/cjs')
const fetch = require('cross-fetch');

const url = GetConvar('pocketbase_url', '').replace(/'/g, "");
const email = GetConvar('pocketbase_useremail', '').replace(/'/g, "");
const password = GetConvar('pocketbase_password', '').replace(/'/g, "");

let pb = null;

if (url != '') {
    connectToDatabase();
} else {
    if (url == '') console.log(`[PocketBase][ERROR] Convar "pocketbase_url" not set (see README)`);
    if (email == '') console.log(`[PocketBase][ERROR] Convar "pocketbase_useremail" not set (see README)`);
    if (password == '') console.log(`[PocketBase][ERROR] Convar "pocketbase_password" not set (see README)`);
}

async function connectToDatabase() {
    pb = new PocketBase(url);
    try {
        await pb.admins.authWithPassword(email, password);
        console.log(`[PocketBase] Connected to PocketBase.`);
    } catch(err) {
        setTimeout(function() {
            console.log(`[PocketBase][ERROR] Failed to connect to ${url}. Retrying connection.`);
            connectToDatabase();
            return;
        }, 5000);
    }
}

function checkDatabaseReady() {
    if (pb) {
        return true;
    } else {
        console.log(`[PocketBase][ERROR] PocketBase is not connected.`);
        return false;
    }
}

function getParamsCollection(params) {
    if (!params.collection) return;
    return pb.collection(params.collection);
}

function safeObjectArgument(object) {
    if (!object) return {};
    if (Array.isArray(object)) {
        if (object.length === 0) return {};
        return object;
    }
    if (typeof object !== "object") return {};
};

async function dbGetFullList(params) {
    if (!checkDatabaseReady()) return;
    let collection = getParamsCollection(params);
    const query = safeObjectArgument(params.query);
    try {
        
        const result = await collection.getFullList(query);
        return result;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.getFullList: Error "${err.message}".`);
        return err.message;
    }
}

async function dbUpdate(params) {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const body = safeObjectArgument(params.body);
    const query = safeObjectArgument(params.query);
    try {
        const result = await collection.update(params.id, body, query);
        const arr = [];
        arr.push(result);
        return arr;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.update: Error "${err.message}".`);
        return err.message;
    }
}

async function dbCreate(params) {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const body = safeObjectArgument(params.body);
    const query = safeObjectArgument(params.query);
    try {
        const result = await collection.create(body, query);
        const arr = [];
        arr.push(result);
        return arr;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.create: Error "${err.message}".`);
        return err.message;
    }
}

async function dbDelete(params) {
    if (!checkDatabaseReady()) return;
    const collection = getParamsCollection(params);
    const query = safeObjectArgument(params.query);
    try {
        const result = await collection.delete(params.id, query);
        return result;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.delete: Error "${err.message}".`);
        return err.message;
    }
}

async function dbGetOne(params) {
    const collection = getParamsCollection(params);
    const query = safeObjectArgument(params.query);
    try {
        const result = await collection.getOne(params.id, query);
        const arr = [];
        arr.push(result);
        return arr;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.getOne: Error "${err.message}".`);
        return err.message;
    }
}

async function dbgetFirstListItem(params) {
    const collection = getParamsCollection(params);
    const query = safeObjectArgument(params.query);
    try {
        const result = await collection.getFirstListItem(params.filter, query);
        const arr = [];
        arr.push(result);
        return arr;
    } catch(err) {
        console.log(`[PocketBase][ERROR] exports.update: Error "${err.message}".`);
        return err.message;
    }
}

/* Exports definitions */
exports("isConnected", () => !!pb);
exports("getFullList", dbGetFullList);
exports("update", dbUpdate);
exports("create", dbCreate);
exports("delete", dbDelete);
exports("getOne", dbGetOne);
exports("getFirstListItem", dbgetFirstListItem);