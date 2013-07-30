package com.gifs.core

import com.gifs.secure.SecUser

class Tag {

	String title
	SecUser addedBy
	Date dateCreated
	Boolean enabled = true
	
	
    static constraints = {
    }
}
