package com.gifs.core

import com.gifs.secure.SecUser

class Gif {

	String link
	Date dateCreated
	String title
	SecUser addedBy
	
	static hasMany = [tags: Tag, popularityCounts: PopularityCount, comments:Comment]
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
