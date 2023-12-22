fx_version 'cerulean'
game 'common'

author 'JoeSzymkowiczFiveM'
name 'fivem_pocketbase'
description 'PocketBase wrapper for FiveM'
version '1.0.0'

server_only 'yes'

server_scripts {
    "index.js",
}

convar_category 'fivem_pocketbase' {
	'Configuration',
	{
		{ 'Connection url', 'pocketbase_url', 'CV_STRING', 'mysql://user:password@localhost/database' },
        { 'Connection user email', 'pocketbase_useremail', 'CV_STRING', 'someone@gmail.com' },
        { 'Connection user password', 'pocketbase_password', 'CV_STRING', 'asdf1234hjkl' },
	}
}