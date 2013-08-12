package com.gifs.secure

class Supervisor {

	SecUser addedBy
	String email
	String about
	Date dateCreated
	Boolean enabled = true
	String inviteKey
	
    static constraints = {
		inviteKey nullable:true
    }
}
