package com.gifs.core

import com.gifs.secure.SecUser

class Gif {

	String link
	Date dateCreated
	String title
	SecUser addedBy
	
	static hasMany = [popularityCounts: Popularity, tags: Tag]
	static belongsTo = SecUser
	static enabled = true
	
    static constraints = {
		link nullable:false, blank:false
		title nullable:false, blank:false
    }
	
	static mapping = {
		sort dateCreated:"desc"
	}
}
