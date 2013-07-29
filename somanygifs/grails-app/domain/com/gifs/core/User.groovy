package com.gifs.core

class User {

	String username
	String fbId
	Date dateCreated
	static hasMany = [addedGifs: Gif, addedTags: Tag, likedGifs: Gif]
	static enabled = true
    static constraints = {
		username nullable:true
    }
}

